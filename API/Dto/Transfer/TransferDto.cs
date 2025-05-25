using System;

namespace API.Dto.Transfer;

public class TransferDto
{
    public int SenderAccountId { get; set; }
    public int RecipientAccountId { get; set; }
    public decimal Amount { get; set; }
    public DateTime? Date { get; set; }
    public string Description { get; set; }
}
