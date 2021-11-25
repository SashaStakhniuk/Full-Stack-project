﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
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

        //private readonly UserManager<User> userManager;
        //private readonly SignInManager<User> signInManager;
        private readonly IdentityContext identityContext;
        private readonly DatasContext datasContext;

        public UserActionsController(DatasContext datasContext, IdentityContext identityContext /*UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager,*/ )
        {
        //    this.userManager = userManager;
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

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult AddNewStory(PostsViewModel model)
        {
            //if (ModelState.IsValid)
            //{
            var userId = identityContext.Users.ToList().Where(x => x.Email == model.Email).Select(x => x.Id).FirstOrDefault();

            if (userId != null)
            {
                datasContext.Posts.Add(new Posts { Id = userId, Theme = model.Theme, Header = model.Header, Description = model.Description, PostPhoto = model.PostPhoto, Article = model.Article });
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