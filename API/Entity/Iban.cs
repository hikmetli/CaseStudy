using System;

namespace API.Entity;

public class Iban
{
    public int Id { get; set; }
    public required string IbanNumber { get; set; }
    public int AccountId { get; set; }
}
