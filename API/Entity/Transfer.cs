using System;

namespace API.Entity;

public class Transfer
{
    public int Id { get; set; }
    public int SenderAccountId { get; set; }
    public int RecipientAccountId { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
}
