using System;

namespace API.Entity;

public class Transaction
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public AppUser? User { get; set; }
    public required string Description { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public Category? Category { get; set; }
    public int CategoryId { get; set; }

}
