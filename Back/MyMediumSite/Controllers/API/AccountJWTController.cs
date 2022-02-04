using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.IdentityModel.Tokens;
using MyMediumSite.Config;
using MyMediumSite.Models;
using MyMediumSite.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MyMediumSite.Controllers.API
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountJWTController : Controller
    {
        //private LoginViewModel temporaryLoginViewModel;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        public AccountJWTController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            //temporaryLoginViewModel = new LoginViewModel();
        }
        [HttpPost]

        public async Task<IActionResult> Token(LoginViewModel model)
        {
            //temporaryLoginViewModel = model;
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var result = await signInManager.PasswordSignInAsync(user.UserName, model.Password, false, false);
                    if (result.Succeeded)
                    {
                        if (!(await userManager.IsEmailConfirmedAsync(user)))
                        {
                            return RedirectToAction("LoginTwoStep", new { model.Email, model.ReturnUrl });
                        }
                        else/* if(result.Succeeded)*/
                        {
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
                                //userEmail = model.Email
                            });
                        }
                    }
                    else
                    {
                        return BadRequest(new { error = "Invalid login or password" });
                    }
                }
                else
                {
                    return BadRequest(new { error = "No such user" });
                }
            }
            return View(model);
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
        private async Task<ClaimsIdentity> GetIdentityWithoutPassword(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user!=null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType,user.Email),
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
        [AllowAnonymous]
        public async Task<IActionResult> LoginTwoStep(string email, string returnUrl)
        {
            var user = await userManager.FindByEmailAsync(email);

            var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            var confirmationLink = Url.Action("ConfirmEmail", "AccountJWT", new { token, email = user.Email }, Request.Scheme);
            EmailTwoFactor emailHelper = new EmailTwoFactor();
            bool emailResponse = emailHelper.SendEmailTwoFactorCode(user.Email, confirmationLink, "Confirm your email", "Click on link to confirm your email");

            if (emailResponse)
            {
                return BadRequest(new { error = "Confirm your email (check your email messages)" });
            }
            else
            {
                return BadRequest(new { error = "Something goes wrong" });
            }
            //return Redirect($"http://localhost:3000/authenticate");

            //return Redirect($"http://localhost:3000/emailConfirmation");
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> LoginTwoStep(TwoFactor twoFactor, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(twoFactor.TwoFactorCode);
            }

            var result = await signInManager.TwoFactorSignInAsync("Email", twoFactor.TwoFactorCode, false, false);
            if (result.Succeeded)
            {
                return Redirect(returnUrl ?? "/");
            }
            else
            {
                ModelState.AddModelError("", "Invalid Login Attempt");
                return View();
            }
        }
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
                return View("Error");

            if(!user.EmailConfirmed)
            {
                var result = await userManager.ConfirmEmailAsync(user, token);
                if (result.Succeeded)
                {
                    var identity = await GetIdentityWithoutPassword(user.Email);
                    if (identity == null)
                    {
                        return BadRequest(new { error = "Invalid email" });
                    }
                    else
                    {
                        var jwt = new JwtSecurityToken(
                       issuer: AuthOptions.ISSUER,
                       audience: AuthOptions.AUDIENCE,
                       claims: identity.Claims,
                       expires: DateTime.Now.AddMinutes(AuthOptions.LIFETIME),
                       signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                       );
                        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                        //return Json(new
                        //{
                        //    access_token = encodedJwt,
                        //    userId = user.Id
                        //    //userEmail = model.Email
                        //});
                        return Redirect($"http://localhost:3000/authentication/{user.Id}/{encodedJwt}");
                    }                  
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
