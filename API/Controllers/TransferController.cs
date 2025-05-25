using System.Threading.Tasks;
using API.DataAccess;
using API.Dto.Transfer;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransferController(Context context, SignInManager<AppUser> signInManager) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<Transfer>>?> GetTransferList()
        {
            var user = await signInManager.UserManager.Users.Where(x => x.UserName == User.Identity!.Name).FirstOrDefaultAsync();
            if (user == null)
            {
                return null;
            }

            var acc_list = await context.Accounts.Where(acc => acc.UserId == user.Id).Select(acc => acc.Id).ToListAsync();

            if (acc_list == null) return NoContent();


            var transfers = await context.Transfers.Where(a => acc_list.Contains(a.SenderAccountId) || acc_list.Contains(a.RecipientAccountId)).ToListAsync();
            if (transfers == null)
            {
                return NotFound();
            }

            return Ok(transfers);
        }


        [HttpGet("from/{id}")]
        public async Task<ActionResult<List<Transfer>>?> GetFromTransferList(int id)
        {

            var transfers = await context.Transfers.Where(a => a.SenderAccountId == id).ToListAsync();
            if (transfers == null)
            {
                return NotFound();
            }

            return Ok(transfers);
        }

        [HttpGet("to/{id}")]
        public async Task<ActionResult<List<Transfer>>?> GetToTransferList(int id)
        {

            var transfers = await context.Transfers.Where(a => a.RecipientAccountId == id).ToListAsync();
            if (transfers == null)
            {
                return NotFound();
            }

            return Ok(transfers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Transfer>> GetTransferDetails(int id)
        {
            var transfer = await context.Transfers.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (transfer == null) return NotFound();

            return Ok(transfer);

        }

        [HttpPost]
        public async Task<ActionResult<Transfer>> CreateTransfer(TransferDto transferDto)
        {
            var returnTuple = await GetPair(transferDto.SenderAccountId, transferDto.RecipientAccountId);

            var sender = returnTuple.Item1;
            var reciever = returnTuple.Item2;

            var t_err = IsAvailableTransferPair(sender, reciever, transferDto.Amount);

            if (!t_err.Item1) return BadRequest(t_err.Item2);

            if (!await IsSenderAuthorized(transferDto.SenderAccountId)) return Unauthorized();



            var transfer = new Transfer
            {
                SenderAccountId = transferDto.SenderAccountId,
                RecipientAccountId = transferDto.RecipientAccountId,
                Amount = transferDto.Amount,
                Date = transferDto.Date ?? DateTime.Now,
                Description = transferDto.Description
            };

            sender.Balance -= transferDto.Amount;
            reciever.Balance += transferDto.Amount;


            context.Transfers.Add(transfer);
            context.Accounts.Update(sender);
            context.Accounts.Update(reciever);

            var result = context.SaveChanges() > 0;
            if (!result) return BadRequest();

            return Ok(transfer);

        }

        [HttpPut]
        public async Task<ActionResult<Transfer>> UpdateTransfer(Transfer updateTransfer)
        {
            var old_amount = await context.Transfers.Where(tr => tr.Id == updateTransfer.Id).Select(t => t.Amount).FirstOrDefaultAsync();
            // there is no such a transfer
            if (old_amount == 0) return BadRequest();

            var diff = updateTransfer.Amount - old_amount;


            var t_acc = await GetPair(updateTransfer.SenderAccountId, updateTransfer.RecipientAccountId);
            var sender = t_acc.Item1;
            var receiver = t_acc.Item2;

            // null olup olmama kontrolü burada yapılıyor.
            var t_err = IsAvailableTransferPair(sender, receiver, diff);
            if (!t_err.Item1) return BadRequest(t_err.Item2);


            //Todo: Buraya Istek oluştur. Istek şu şekilde olmalı;
            // Talep için ayrı bir entity aç, içerik ; (talepEdenHesap,edilenhesap,talep miktarı,durum,Oluşturulma tarihi)
            // güncelleme talebi yapılır (iki taraflı da olabilir). Daha sonra kabul fonksiyonu ile kabul edilen 
            // güncelleme işlenir.
            var t = await MakeUpdate(sender, receiver, diff);

            if (!t.Item1) return BadRequest(t.Item2);

            context.Transfers.Update(updateTransfer);
            var result = await context.SaveChangesAsync() > 0;
            if (!result) return BadRequest();

            return Ok(updateTransfer);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Transfer>> DeleteTransfer(int id)
        {
            var transfer = await context.Transfers.FindAsync(id);
            if (transfer == null) return NotFound();

            context.Transfers.Remove(transfer);
            var result = context.SaveChanges() > 0;
            if (!result) return BadRequest();


            return Ok(transfer);

        }


        private async Task<Tuple<Account?, Account?>> GetPair(int senderId, int receiverId)
        {
            var sender = await context.Accounts.FindAsync(senderId);
            var receiver = await context.Accounts.FindAsync(receiverId);
            return new Tuple<Account?, Account?>(sender, receiver);
        }

        private Tuple<bool, string> IsAvailableTransferPair(Account? sender, Account? receiver, decimal amount)
        {

            if (sender == null || receiver == null)
            {
                return new Tuple<bool, string>(false, "Both accounts need to be availabe");
            }
            // amount 0'dan büyükse sender ödeme yapacak, küçükse reciever
            if ((amount <= 0 && receiver.Balance < amount) || (amount >= 0 && sender.Balance < amount))
            {
                return new Tuple<bool, string>(false, "Sender or Reciever balance is not enough");
            }

            return new Tuple<bool, string>(true, "");
        }

        private async Task<Tuple<bool, string>> MakeUpdate(Account sender, Account receiver, decimal amount)
        {

            // amount 0'dan büyükse sender ödeme yapacak, küçükse reciever
            if ((amount <= 0 && receiver.Balance < amount) || (amount >= 0 && sender.Balance < amount))
            {
                return new Tuple<bool, string>(false, "Sender or Reciever balance is not enough");
            }

            // update işlemi
            sender.Balance -= amount;
            receiver.Balance += amount;

            context.Accounts.Update(sender);
            context.Accounts.Update(receiver);

            var res = context.SaveChanges() > 1;
            if (!res) return new Tuple<bool, string>(false, "Couldn't save the changes");

            return new Tuple<bool, string>(true, "");
        }


        private async Task<bool> IsSenderAuthorized(int senderId)
        {
            var user = await signInManager.UserManager.Users.Where(x => x.UserName == User.Identity!.Name).FirstOrDefaultAsync();
            var sender = await context.Accounts.FindAsync(senderId);
            if (user == null || sender == null) return false;

            if (sender.UserId != user.Id) return false;
            return true;

        }

    }
}
