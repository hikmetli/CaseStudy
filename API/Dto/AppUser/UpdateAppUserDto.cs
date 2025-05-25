using System;

namespace API.Dto.AppUser;

public class UpdateAppUserDto
{
    public string? Email { get; set; }
    public string? Password { get; set; }
    public required string CurrentPassword { get; set; }

}