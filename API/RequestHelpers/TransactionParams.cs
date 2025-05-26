using System;

namespace API.RequestHelpers;

public class TransactionParams
{
    public string? OrderBy { get; set; }
    public string? SearchTerm { get; set; }
    public string? Categories { get; set; }
    public DateTime? DateFrom { get; set; }
    public DateTime? DateTo { get; set; }

}
