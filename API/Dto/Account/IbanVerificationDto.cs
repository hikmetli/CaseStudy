using System;

namespace API.Dto.Account;

public class IbanVerificationDto
{
    public bool Result { get; set; }
    public int AccountId { get; set; }
}

