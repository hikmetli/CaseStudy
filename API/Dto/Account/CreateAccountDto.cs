using System;

namespace API.Dto.Account;

public class CreateAccountDto
{
    public required string AccountName { get; set; }
    public decimal? Balance { get; set; }

}
