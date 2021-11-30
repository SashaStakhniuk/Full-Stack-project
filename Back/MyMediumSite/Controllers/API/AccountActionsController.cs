using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyMediumSite.Config;
using MyMediumSite.Models;
using MyMediumSite.Models.ViewModels;
using Newtonsoft.Json;
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
    public class AccountActionsController:Controller
    {
        private readonly RoleManager<IdentityRole> roleManager;

        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IdentityContext identityContext;
        private readonly DatasContext datasContext;

        public AccountActionsController(DatasContext datasContext, UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager, IdentityContext identityContext)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
            this.identityContext = identityContext;
            this.datasContext = datasContext;

        }

        [HttpGet]
        public IActionResult Login(string returnUrl = null)
        {
            //LoginViewModel model=new LoginViewModel();
            return View(new LoginViewModel { ReturnUrl = returnUrl });
            //return View(model);
        }

        [HttpPost]
        [AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await userManager.FindByEmailAsync(model.Email);
                var result = await signInManager.PasswordSignInAsync(user.UserName, model.Password, model.RememberMe, false);
                if (result.Succeeded)
                {
                    if (!string.IsNullOrEmpty(model.ReturnUrl) && Url.IsLocalUrl(model.ReturnUrl))
                    {
                        return Redirect(model.ReturnUrl);
                    }
                    else
                    {
                        return RedirectToAction("Index", "Home");
                    }
                }
                else
                {
                    ModelState.AddModelError("", "Invalid login or password");
                }
            }
            return View(model);
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
                //var userExist = await userManager.FindByEmailAsync(model.Email);
                //if(userExist!=null)
                //{
                //    //return Problem(detail:, statusCode: 400, title: "User is already exist");
                //    ModelState.AddModelError("RegistrationError", "User is already exist");
                //    return BadRequest(ModelState);
                //}
                //else
               // {
                    User user = new User { Email = model.Email, UserName = model.UserName, LastName = model.LastName};
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

                    //    string id = await userManager.GetUserIdAsync(user);
                        //Person personToAdd = new Person
                        //{
                        //    PersonId = id,
                        //    NickName = "@" + user.Email.Substring(0, user.Email.IndexOf('@'))
                        //};
                        //personContext.Persons.Add(personToAdd);
                        //personContext.SaveChanges();

                    //var result = await signInManager.PasswordSignInAsync(user.UserName, model.Password, false, false);
                    if (user != null)
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
                            userId=user.Id
                        });
                    }
                    return Ok();
                    }
                    else
                    {
                        //return ModelState.AddModelError("", error.Description);
                        return BadRequest(result.Errors);
                        //foreach (var error in result.Errors)
                        //{
                        //    ModelState.AddModelError("", error.Description);
                        //}
                    }
                //}
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
    }
}
