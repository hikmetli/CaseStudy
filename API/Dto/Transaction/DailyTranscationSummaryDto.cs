using System;

namespace API.Dto.Transaction;

public class DailyTransactionSummaryDto
{
    public DateTime Date { get; set; }
    public decimal TotalAmount { get; set; }
}