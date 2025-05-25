using System;

namespace API.Entity;

public class Account
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public AppUser? User { get; set; }
    public required string AccountName { get; set; }
    public decimal Balance { get; set; }
    public DateTime CreatedAt { get; set; }
}
