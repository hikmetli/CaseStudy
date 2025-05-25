using System;

namespace API.Dto.Transaction;

public class TransactionDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public required string Description { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public int CategoryId { get; set; }
}
