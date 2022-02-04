using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyMediumSite.Config;
using MyMediumSite.Models;
using MyMediumSite.Models.ViewModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MyMediumSite.Controllers.API
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountActionsController : Controller
    {
        private readonly RoleManager<IdentityRole> roleManager;

        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IdentityContext identityContext;
        private readonly DatasDbContext datasContext;

        public AccountActionsController(DatasDbContext datasContext, UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager, IdentityContext identityContext)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            this.identityContext = identityContext;
            this.datasContext = datasContext;

        }

        [HttpGet]
        public IActionResult Register()
        {
            return View(new RegisterViewModel());
        }
        [HttpPost]
        //[AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {

                if (await userManager.FindByEmailAsync(model.Email) != null)
                {
                    return BadRequest(new { error = "Email already registered" });
                }
                User user = new User { Email = model.Email, UserName = model.UserName, LastName = model.LastName };
                var result = await userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    List<string> role = new List<string>();
                    var roles = await roleManager.Roles.ToListAsync();
                    if (roles.Count() == 0)
                    {
                        await roleManager.CreateAsync(new IdentityRole("MainAdmin"));
                        await roleManager.CreateAsync(new IdentityRole("Admin"));
                        await roleManager.CreateAsync(new IdentityRole("User"));
                        //identityContext.SaveChanges();
                    }
                    if (user.Email == "MainAdmin@gmail.com" && user.UserName == "Main" && user.LastName == "Admin")
                    {
                        role.Add("MainAdmin");
                    }
                    else
                    {
                        role.Add("User");
                    }
                    await userManager.AddToRolesAsync(user, role);
                    await signInManager.SignInAsync(user, false);


                    if (user != null)
                    {
                        datasContext.Profiles.Add(new Profile
                        {
                            User = user,
                            //AboutProfile = model.AboutProfile,
                            //ProfilePhoto = model.ProfilePhoto,
                            Name = user.UserName + " " + user.LastName,
                            NickName = "@" + user.Email.Substring(0, user.Email.IndexOf('@'))
                        });
                        datasContext.SaveChanges();

                        var identity = await GetIdentity(user.Email, model.Password);
                        if (identity == null)
                        {
                            return BadRequest(new { error = "Invalid login or password" });
                        }
                        var jwt = new JwtSecurityToken(
                            issuer: AuthOptions.ISSUER,
                            audience: AuthOptions.AUDIENCE,
                            claims: identity.Claims,
                            expires: DateTime.Now.AddMinutes(AuthOptions.LIFETIME),
                            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                            );
                        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                        return Json(new
                        {
                            access_token = encodedJwt,
                            userId = user.Id
                        });
                    }
                 
                    else
                    {
                        return BadRequest(result.Errors);                     
                    }
                }

            }
            return BadRequest(new { error = "There are some error with datas, maybe such user is already exist" });
        }
        private async Task<ClaimsIdentity> GetIdentity(string email, string password)
        {
            var user = await userManager.FindByEmailAsync(email);
            var result = await signInManager.PasswordSignInAsync(user.UserName, password, false, false);
            if (result.Succeeded)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType,user.Email),
                    new Claim(ClaimsIdentity.DefaultNameClaimType, password)
                };
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }
            else
            {
                ModelState.AddModelError("", "Invalid login or password");
            }
            return null;
        }

        /*_________________________________________________Google authentication_____________________________________________________*/
        [HttpPost]
        [AllowAnonymous]
        //[Route("account/external-login")]
        public IActionResult ExternalLogin(string provider, string returnUrl)
        {
            //var redirectUrl = $"https://localhost:44361/api/accountactions/ExternalLoginCallback?returnUrl={returnUrl}";
            var redirectUrl = Url.Action("ExternalLoginCallback", "accountactions", new { ReturnUrl = returnUrl });
            var properties = signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            //properties.AllowRefresh = true;
            return Challenge(properties, provider);
        }
        [AllowAnonymous]
        [Route("/[action]")]

        public async Task<IActionResult> ExternalLoginCallback(/*string returnUrl=null,string remoteError=null*/)
        {
            ExternalLoginInfo info = await signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                //ModelState.AddModelError("","External login information loading failed");
                return BadRequest(new { error = "External login information loading failed" });

            }
            var signInResult = await signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey,
                                                                            isPersistent: false);
            if (signInResult.Succeeded)
            {
                return Redirect($"http://localhost:3000/");
            }
            else
            {
                var email = info.Principal.FindFirstValue(ClaimTypes.Email);
                if (email != null)
                {
                    //var accessToken = await HttpContext.GetTokenAsync("access_token");
                    //var information = await signInManager.GetExternalLoginInfoAsync();

                    //var accessToken = information.ex.Claims.FirstOrDefault(c => c.Type.Equals("urn:tokens:google:accesstoken")).ToString();

                    var user = await userManager.FindByEmailAsync(email);
                    if (user == null)
                    {
                        user = new User
                        {
                            Email = info.Principal.FindFirstValue(ClaimTypes.Email),
                            UserName = info.Principal.FindFirstValue(ClaimTypes.GivenName),
                            LastName = info.Principal.FindFirstValue(ClaimTypes.Surname)
                        };
                        var result = await userManager.CreateAsync(user);

                        if (result.Succeeded)
                        {
                            List<string> role = new List<string>();

                            if (user.Email == "MainAdmin@gmail.com" && user.UserName == "Main" && user.LastName == "Admin")
                            {
                                role.Add("MainAdmin");
                            }
                            else
                            {
                                role.Add("User");
                            }
                            await userManager.AddToRolesAsync(user, role);
                            datasContext.Profiles.Add(new Profile
                            {
                                User = user,
                                //AboutProfile = model.AboutProfile,
                                //ProfilePhoto = model.ProfilePhoto,
                                Name = user.UserName + " " + user.LastName,
                                NickName = "@" + user.Email.Substring(0, user.Email.IndexOf('@'))
                            });
                            datasContext.SaveChanges();
                            //await signInManager.SignInAsync(user, false);
                        }
                    }

                    var jwt = new JwtSecurityToken(
                            issuer: AuthOptions.ISSUER,
                            audience: AuthOptions.AUDIENCE,
                            claims: info.Principal.Claims,
                            expires: DateTime.Now.AddMinutes(AuthOptions.LIFETIME),
                            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                            );
                    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                    return Redirect($"http://localhost:3000/authentication/{user.Id}/{encodedJwt}");
                }
                return Redirect($"http://localhost:3000/");
            }
        }
        /*_______________________________________________________________________________________________________________________*/
        /*___________________________________________________________Change Password____________________________________________________*/

        [HttpPost]
        public async Task<IActionResult> CheckUserByEmailAsync(ChangePasswordViewModel model) //for unregistered person
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                var confirmationLink = Url.Action("ResetPassword", "AccountActions", new { token, email = user.Email}, Request.Scheme);
                EmailTwoFactor emailHelper = new EmailTwoFactor();
                bool emailResponse = emailHelper.SendEmailTwoFactorCode(user.Email, confirmationLink, "Confirm password changing", "Click on link to confirm password changing");
                if (emailResponse)
                {
                    return Ok(new { message = "We sent an email on this address, check your messages and click on link to reset your password" });
                }
                else
                {
                    return BadRequest(new { error = "Some error" });
                }
            }
            return BadRequest(new { error = "Such user doesn't exist" });
        }
        public IActionResult ResetPassword(string token = null, string email = null)

        {
            if (!string.IsNullOrEmpty(token) && !string.IsNullOrEmpty(email))
            {
                return Redirect($"http://localhost:3000/passwordreset?email={email}&token={token}");               
            }
            return Redirect($"http://localhost:3000/passwordreset/");
        }
        [HttpPost]
        public async Task<IActionResult> ResetPassword(ChangePasswordViewModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                var result = await userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
                if (result.Succeeded)
                    return Ok(new { message = "Password changed successfully" });
                else
                {
                    return BadRequest(new { error = "Invalid token" });
                }
            }
            return BadRequest(new { error = "Password wasn't changed"});       
        }


        [HttpPost/*("{userId?}/{newPassword?}")*/]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> ChangeUserPassword(ChangePasswordViewModel model) //for registered person
        {
            var user = await userManager.FindByEmailAsync(model.Email);

            if (user!=null)
            {
                //if (!String.IsNullOrEmpty(model.NewPassword) /*&& !String.IsNullOrEmpty(model.OldPassword)*/)
                //{
                    //var newPasswordHash = userManager.PasswordHasher.HashPassword(model.OldPassword);

                    //var token = await userManager.GeneratePasswordResetTokenAsync(user);
                    //var confirmationLink = Url.Action("ConfirmPasswordChanging", "AccountActions", new { token, email = user.Email, /*oldPassword = model.OldPassword,*/ newPassword = model.NewPassword }, Request.Scheme);
                    //EmailTwoFactor emailHelper = new EmailTwoFactor();
                    //bool emailResponse = emailHelper.SendEmailTwoFactorCode(user.Email, confirmationLink, "Confirm password changing", "Click on link to confirm password changing");
                    //if (emailResponse)
                    //{
                    //    return Ok(new { message = "Check your email to change password." });
                    //}
                    //else
                    //{
                    //    return BadRequest(new { error = "Some error" });
                    //}
                   
                //}
                //else
                //{
                    return BadRequest(new { error = "Password can't be null or empty" });
                //}
            }
            else
            {
                return BadRequest(new { error = "Can't find such user" });
            }
        }

        //[HttpPost]
        public async Task<IActionResult> ConfirmPasswordChanging(string token, string email, string oldPassword, string newPassword)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
                return BadRequest(new {error="Error"});
            var result = await userManager.ResetPasswordAsync(user, token, oldPassword);
            if (result.Succeeded)
            {
                var passwordChangeResult = await userManager.ChangePasswordAsync(user, oldPassword, newPassword);
                if (passwordChangeResult.Succeeded)
                {
                    //return Ok(new { message = "Password was changed" });
                    return Redirect($"http://localhost:3000/userdatassettings/success");

                }
                else
                {
                    //return BadRequest(new { error = passwordChangeResult.Errors });
                    var error = passwordChangeResult.Errors.ToList().FirstOrDefault().Description;
                    return Redirect($"http://localhost:3000/userdatassettings/{error}");
                }
                   

            }
            else
            {
                //return BadRequest(new { error = "Password wasn't changed" });
                return Redirect($"http://localhost:3000/userdatassettings/failure");

            }
            //return Redirect("http://localhost:3000/");
        }
        /*_______________________________________________________________________________________________________________________*/



    }
}
