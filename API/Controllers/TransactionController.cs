using API.DataAccess;
using API.Dto.Transaction;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController(Context context, SignInManager<AppUser> signInManager) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<TransactionDto>>?> GetTransactionList()
        {
            var user = await GetTransactionsUser();
            if (user == null)
            {
                return Unauthorized();
            }

            var transactions = await context.Transactions.Where(a => a.UserId == user.Id).TransactionToDto().ToListAsync();
            if (transactions == null)
            {
                return NotFound();
            }

            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDto>> GetTransactionDetails(int id)
        {
            var transaction = await context.Transactions.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (transaction == null) return NotFound();

            var user = await GetTransactionsUser();
            if (user == null || user.Id != transaction.UserId) return Unauthorized();

            return Ok(transaction.ToDto());

        }

        [HttpPost]
        public async Task<ActionResult<TransactionDto>> CreateTransaction(CreateTransactionDto transactionDto)
        {
            if (!await IsAvailableTransactionsCategory(transactionDto.CategoryId)) return BadRequest("Category is not available");

            var user = await GetTransactionsUser();
            if (user == null)
            {
                return Unauthorized();
            }


            var transaction = new Transaction
            {
                UserId = user.Id,
                Description = transactionDto.Description,
                Amount = transactionDto.Amount,
                Date = transactionDto.Date ?? DateTime.Now,
                CategoryId = transactionDto.CategoryId
            };

            context.Transactions.Add(transaction);
            var result = context.SaveChanges() > 0;
            if (!result) return BadRequest();

            return Ok(transaction.ToDto());

        }

        [HttpPut]
        public async Task<ActionResult<TransactionDto>> UpdateTransaction(UpdateTransactionDto updateTransactionDto)
        {
            if (!await IsAvailableTransactionsCategory(updateTransactionDto.CategoryId)) return BadRequest("Category is not available");

            var transaction = await context.Transactions.FindAsync(updateTransactionDto.Id);
            if (transaction == null) return NotFound();


            var user = await GetTransactionsUser();
            if (user == null || user.Id != transaction.UserId) return Unauthorized();

            // var newTransaction = new Transaction
            // {
            //     I
            // }

            transaction.Amount = updateTransactionDto.Amount;
            transaction.CategoryId = updateTransactionDto.CategoryId;
            transaction.Date = updateTransactionDto.Date;
            transaction.Description = updateTransactionDto.Description;


            context.Transactions.Update(transaction);
            var result = context.SaveChanges() > 0;
            if (!result) return BadRequest();

            return Ok(transaction.ToDto());

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TransactionDto>> DeleteTransaction(int id)
        {
            var transaction = await context.Transactions.FindAsync(id);
            if (transaction == null) return NotFound();

            var user = await GetTransactionsUser();
            if (user == null || user.Id != transaction.UserId) return Unauthorized();

            context.Transactions.Remove(transaction);
            var result = context.SaveChanges() > 0;
            if (!result) return BadRequest();


            return Ok(transaction.ToDto());

        }

        private async Task<AppUser?> GetTransactionsUser()
        {
            var user = await signInManager.UserManager.Users.Where(x => x.UserName == User.Identity!.Name).FirstOrDefaultAsync();
            if (user == null)
            {
                return null;
            }
            return user;
        }

        private async Task<bool> IsAvailableTransactionsCategory(int id)
        {
            var category = await context.Category.FindAsync(id);
            if (category == null)
            {
                return false;
            }
            return true;
        }

    }
}

