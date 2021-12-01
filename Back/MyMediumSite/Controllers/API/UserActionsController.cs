using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
    public class UserActionsController : Controller
    {
        //private readonly RoleManager<IdentityRole> roleManager;

        private readonly UserManager<User> userManager;
        //private readonly SignInManager<User> signInManager;
        private readonly IdentityContext identityContext;
        private readonly DatasContext datasContext;

        public UserActionsController(DatasContext datasContext, IdentityContext identityContext, UserManager<User> userManager/*, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager,*/ )
        {
            this.userManager = userManager;
            //    this.roleManager = roleManager;
            //    this.signInManager = signInManager;
            this.identityContext = identityContext;
            this.datasContext = datasContext;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Posts>>> GetAllPosts()
        {
            return await datasContext.Posts.ToListAsync();
        }
        // [HttpGet]
        //public async Task<ActionResult<IEnumerable<Posts>>> GetAllPosts()
        //{
        //    List<Posts> post = datasContext.Posts.ToList().Reverse();   
        //    return await datasContext.Posts.ToList().Reverse();
        //}
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profile>>> GetProfiles()
        {
            return await datasContext.Profiles.ToListAsync();
        }
        [HttpGet("{theme}")]
        public async Task< ActionResult<IEnumerable<Posts>>> GetPostsByTheme(string theme)
        {
            return await datasContext.Posts.Where(x=> x.Theme.ToLower()==theme.ToLower()).ToListAsync();
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Subscribe(SubscribeViewModel model)
        {
            if (model.SubscribeOnId != null)
            {
                var user = await userManager.FindByIdAsync(model.SubscriberId);
                if (user != null)
                {
                    datasContext.Subscribers.Add(new Subscriber {UserId= model.SubscriberId, SubscribeToId = model.SubscribeOnId });
                    datasContext.SaveChanges();

                    var myProfileToEdit = datasContext.Profiles.ToList().Find(x=> x.UserId == model.SubscriberId);
                    myProfileToEdit.I_Follow += 1;

                    datasContext.Profiles.Update(myProfileToEdit);

                    var subscriptionProfile= datasContext.Profiles.ToList().Find(x => x.UserId == model.SubscribeOnId);
                    subscriptionProfile.MyFollowers +=1;
                    datasContext.Profiles.Update(subscriptionProfile);
                    datasContext.SaveChanges();


                    return Ok(model);
                }
               
            }
            return NotFound(model);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult AddNewStory(PostsViewModel model)
        {
            //if (ModelState.IsValid)
            //{
            //var userId = identityContext.Users.ToList().Where(x => x.Email == model.Email).Select(x => x.Id).FirstOrDefault();

            if (model.UserId != null)
            {
                datasContext.Posts.Add(new Posts { Id = model.UserId, Theme = model.Theme, Header = model.Header, Description = model.Description, PostPhoto = model.PostPhoto, Article = model.Article });
                datasContext.SaveChanges();
                return Ok(model);
            }
            else
            {
                ModelState.AddModelError("", "Wrong datas");
                return BadRequest(ModelState);
            }
            //}
           // return BadRequest(model);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddUserDatas(ProfileViewModel model)
        {
            //if (ModelState.IsValid)
            //{
            //var userId = identityContext.Users.ToList().Where(x => x.Email == model.Email).Select(x => x.Id).FirstOrDefault();
            var user = await userManager.FindByIdAsync(model.UserId);
            if (user != null)
            {
                //datasContext.Profiles.Add(new Profile { User = user,
                //                                        AboutProfile=model.AboutProfile,ProfilePhoto=model.ProfilePhoto,
                //                                        Name=user.UserName+" "+user.LastName,
                //                                        NickName = "@" + user.Email.Substring(0, user.Email.IndexOf('@'))
                //});
                var profileToEdit = datasContext.Profiles.ToList().Find(x=> x.UserId==model.UserId);
                profileToEdit.AboutProfile = model.AboutProfile;
                profileToEdit.ProfilePhoto = model.ProfilePhoto;
                
                datasContext.Profiles.Update(profileToEdit);
                datasContext.SaveChanges();
                return Ok(model);
            }
            else
            {
                ModelState.AddModelError("", "Wrong datas");
                return BadRequest(ModelState);
            }
            //}
            // return BadRequest(model);
        }


    }
}