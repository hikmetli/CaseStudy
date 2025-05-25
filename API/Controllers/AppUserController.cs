using System.Threading.Tasks;
using API.Dto.AppUser;
using API.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AppUserController(SignInManager<AppUser> signInManager) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await signInManager.UserManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var err in result.Errors)
                {
                    ModelState.AddModelError(err.Code, err.Description);
                }
                return ValidationProblem(ModelState);
            }

            await signInManager.UserManager.AddToRoleAsync(user, "Member");
            return Ok(user);
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return Ok();
        }


        [HttpGet("user-info")]
        public async Task<ActionResult> GetUserInfo()
        {
            // cookieste gelen token ile kontrol ediyoruz
            if (User.Identity?.IsAuthenticated == false) return NoContent();

            var user = await signInManager.UserManager.GetUserAsync(User);
            if (user == null) return Unauthorized();

            var roles = await signInManager.UserManager.GetRolesAsync(user);

            var userInfo = new UserInfoDto
            {
                UserName = user.UserName!,
                Email = user.Email!,
                Roles = [.. roles]
            };

            return Ok(userInfo);
        }

        [HttpPut("updateUser")]
        public async Task<ActionResult<AppUser>> UpdateAppUser(UpdateAppUserDto updateAppUserDto)
        {
            // Get the currently logged-in user
            var user = await signInManager.UserManager.Users
                .Where(x => x.UserName == User.Identity!.Name)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            // Check if the current password is provided and valid
            if (!string.IsNullOrEmpty(updateAppUserDto.CurrentPassword))
            {
                var isPasswordValid = await signInManager.UserManager.CheckPasswordAsync(user, updateAppUserDto.CurrentPassword);
                if (!isPasswordValid)
                {
                    return BadRequest("Current password is incorrect.");
                }
            }
            else
            {
                return BadRequest("Current password is required.");
            }

            // Update email if provided
            if (!string.IsNullOrEmpty(updateAppUserDto.Email))
            {
                user.Email = updateAppUserDto.Email;
                user.UserName = updateAppUserDto.Email; // Update username if it's tied to email
            }

            // Update password if provided
            if (!string.IsNullOrEmpty(updateAppUserDto.Password))
            {
                var token = await signInManager.UserManager.GeneratePasswordResetTokenAsync(user);
                var result = await signInManager.UserManager.ResetPasswordAsync(user, token, updateAppUserDto.Password);

                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }
            }

            // Save changes to the user
            var updateResult = await signInManager.UserManager.UpdateAsync(user);
            if (!updateResult.Succeeded)
            {
                return BadRequest(updateResult.Errors);
            }

            return Ok(user);
        }

    }
}
