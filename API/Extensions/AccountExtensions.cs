using System;
using API.Dto.Account;
using API.Entity;

namespace API.Extensions;

public static class AccountExtensions
{

    public static IQueryable<AccountDto> AccountToDto(this IQueryable<Account> query)
    {
        return query.Select(acc => new AccountDto
        {
            Id = acc.Id,
            UserId = acc.UserId,
            AccountName = acc.AccountName,
            CreatedAt = acc.CreatedAt,
            Balance = acc.Balance
        });
    }

    public static AccountDto ToDto(this Account acc)
    {
        return new AccountDto
        {
            Id = acc.Id,
            UserId = acc.UserId,
            AccountName = acc.AccountName,
            CreatedAt = acc.CreatedAt,
            Balance = acc.Balance
        };
    }

}
