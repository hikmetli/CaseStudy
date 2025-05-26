using API.DataAccess;
using API.Dto.Account;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using API.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(Context context, SignInManager<AppUser> signInManager, IbanVerificationService ibanService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Account>>?> GetAccountList()
        {
            var user = await GetAccountsUser();
            if (user == null)
            {
                return Unauthorized();
            }

            var accounts = await context.Accounts.Where(a => a.UserId == user.Id).AccountToDto().ToListAsync();
            if (accounts == null)
            {
                return NotFound();
            }

            return Ok(accounts);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccountDetails(int id)
        {
            var account = await context.Accounts.AccountToDto().Where(x => x.Id == id).FirstOrDefaultAsync();
            if (account == null) return NotFound();

            await ibanService.GetIbanAsync(1);

            var user = await GetAccountsUser();
            if (user == null || user.Id != account.UserId) return Unauthorized();

            return Ok(account);

        }


        [HttpPost]
        public async Task<ActionResult<AccountDto>> CreateAccount(CreateAccountDto accountDto)
        {
            var user = await GetAccountsUser();
            if (user == null)
            {
                return Unauthorized();
            }

            var acc = new Account
            {
                UserId = user.Id,
                CreatedAt = DateTime.Now,
                Balance = accountDto.Balance ?? 0,
                AccountName = accountDto.AccountName,
            };

            context.Accounts.Add(acc);
            var result = context.SaveChanges() > 0;
            if (!result) return BadRequest();

            var iban = await ibanService.CreateIbanAsync(acc.Id);
            if (iban == null)
            {
                return BadRequest("Failed to create IBAN.");
            }
            acc.Iban = iban.IbanNumber;
            context.Accounts.Update(acc);
            var updateResult = context.SaveChanges() > 0;
            if (!updateResult) return BadRequest();

            return Ok(acc.ToDto());
        }

        [HttpPut]
        public async Task<ActionResult<AccountDto>> UpdateAccount(UpdateAccountDto updateAccountDto)
        {

            var account = await context.Accounts.FindAsync(updateAccountDto.Id);
            if (account == null) return NotFound();


            var user = await GetAccountsUser();
            if (user == null || user.Id != account.UserId) return Unauthorized();


            account.AccountName = updateAccountDto.AccountName ?? account.AccountName;
            account.Balance = updateAccountDto.Balance ?? account.Balance;

            context.Accounts.Update(account);
            var result = context.SaveChanges() > 0;
            if (!result) return BadRequest();

            return Ok(account.ToDto());

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<AccountDto>> DeleteAccount(int id)
        {
            var account = await context.Accounts.FindAsync(id);
            if (account == null) return NotFound();

            var user = await GetAccountsUser();
            if (user == null || user.Id != account.UserId) return Unauthorized();

            context.Accounts.Remove(account);
            var result = context.SaveChanges() > 0;
            if (!result) return BadRequest();


            return Ok(AccountExtensions.ToDto(account));

        }


        private async Task<AppUser?> GetAccountsUser()
        {
            var user = await signInManager.UserManager.Users.Where(x => x.UserName == User.Identity!.Name).FirstOrDefaultAsync();
            if (user == null)
            {
                return null;
            }
            return user;
        }
    }
}
