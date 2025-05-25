using System;

namespace API.Dto.Account;

public class AccountDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public required string AccountName { get; set; }
    public decimal Balance { get; set; }
    public DateTime CreatedAt { get; set; }
}
