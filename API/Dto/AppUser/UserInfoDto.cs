using System;

namespace API.Dto.AppUser;

public class UserInfoDto
{
    public required string UserName { get; set; }
    public required string Email { get; set; }
    public required string[] Roles { get; set; } = [];
}
