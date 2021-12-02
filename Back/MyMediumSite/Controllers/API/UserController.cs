using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMediumSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Controllers.API
{
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IdentityContext context;
        private readonly UserManager<User> userManager;
        private readonly DatasContext datasContext;
        public UserController(IdentityContext context, UserManager<User> userManager, DatasContext datasContext)
        {
            this.context = context;
            this.userManager = userManager;
            this.datasContext = datasContext;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            return await context.Users.ToListAsync();
        }

        [HttpGet("{id}")]
        public ActionResult<Profile> Get(string id)
        {
            if (id != null)
            {
                var profile = datasContext.Profiles.ToList().Find(x => x.UserId == id);
                return Ok(profile);
            }
            return NotFound();
        }
        //[HttpGet("{id}")]
        //public async Task<ActionResult<IEnumerable<Profile>>> GetUserSubscriptions(string id)
        //{
        //    if (id != null)
        //    {
        //        var subscriptionsIdList = datasContext.Subscribers.ToList().Where(x => x.UserId == id).Select(x=> x.SubscribeToId);
        //        //var subscriptions = datasContext.Profiles.ToList().Find(x => x.UserId == id);
        //        //var profile = datasContext.Posts.ToList().FirstOrDefault();
        //        List<Profile> profiles = new List<Profile>();
        //        var profile = new Profile();
        //        foreach(var subscriptionId in subscriptionsIdList)
        //        {
        //            //profile = datasContext.Profiles.ToList().Find(x => x.UserId == subscriptionId);
        //            profile = await datasContext.Profiles.FirstOrDefaultAsync(x => x.UserId == subscriptionId);

        //            profiles.Add(profile);
        //        }
        //        return profiles;
        //    }
        //    return NotFound();
        //}
        [HttpPost]
        public async Task<ActionResult<User>> Post(User user)
        {
            
            if (string.IsNullOrEmpty(user.UserName))
            {
                ModelState.AddModelError("UserNameError", "Enter the UserName");
            }
            if (string.IsNullOrEmpty(user.LastName))
            {
                ModelState.AddModelError("LastNameError", "Enter the LastName");
            }
            if (string.IsNullOrEmpty(user.Email))
            {
                ModelState.AddModelError("EmailError", "Enter the Email");
            }
            if (!ModelState.IsValid)
            {
                //ModelState.AddModelError("DatasModelError", "Please,enter all required datas correctly(all numbers must be >= 0)");
                return BadRequest(ModelState);
            }
            else
            {
                //user.NickName="@"+user.Email.Substring(0, user.Email.IndexOf('@'));
                context.Users.Add(user);
                await context.SaveChangesAsync();
                return Ok(user);
            }
        }
        [HttpPut]
        public async Task<ActionResult<User>> Put(User user)
        {
            //if (string.IsNullOrEmpty(bike.BikeTitle))
            //{
            //    ModelState.AddModelError("TitleError", "Enter the title");

            //}
            //if (string.IsNullOrEmpty(bike.PhotoPath))
            //{
            //    ModelState.AddModelError("PhotoPathError", "Enter the photoPath");
            //}
            //if (bike.Size <= 0)
            //{
            //    ModelState.AddModelError("BikeSizeError", "Size must be bigger than 0");
            //}
            //if (bike.SpeedCount <= 0)
            //{
            //    ModelState.AddModelError("SpeedCountError", "Count of speeds must be bigger than 0");
            //}
            //if (bike.WheelDiameter <= 0)
            //{
            //    ModelState.AddModelError("WheelDiameterError", "Wheels diameter must be bigger than 0");
            //}
            //if (bike.Price <= 0)
            //{
            //    ModelState.AddModelError("PriceError", "Price must be bigger than 0");
            //}
            if (!ModelState.IsValid)
            {
                //ModelState.AddModelError("DatasModelError", "Please,enter all required datas correctly(all numbers must be >= 0)");
                return BadRequest(ModelState);
            }
            else
            {

                context.Update(user);
                await context.SaveChangesAsync();
                return Ok(user);
            }

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> Delete(string id)
        {
            User user = await context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            context.Users.Remove(user);
            await context.SaveChangesAsync();
            return Ok(user);
        }
    }
}
