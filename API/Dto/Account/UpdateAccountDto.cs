using System;

namespace API.Dto.Account;

public class UpdateAccountDto
{
    public int Id { get; set; }
    public string? AccountName { get; set; }
    public decimal? Balance { get; set; }

}
