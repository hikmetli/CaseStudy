using System;

namespace API.Dto.Transaction;

public class CreateTransactionDto
{
    public required string Description { get; set; }
    public decimal Amount { get; set; }
    public DateTime? Date { get; set; }
    public int CategoryId { get; set; }
}
