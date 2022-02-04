using Microsoft.AspNetCore.Authentication.Cookies;
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
        private readonly DatasDbContext datasContext;

        public UserActionsController(DatasDbContext datasContext, IdentityContext identityContext, UserManager<User> userManager/*, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager,*/ )
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
        [HttpGet("{postsAmount}")]
        public ActionResult<IEnumerable<Posts>> GetSomePosts(string postsAmount)
        {
            if(!String.IsNullOrEmpty(postsAmount))
            {
                var post = Int32.Parse(postsAmount);
                //return datasContext.Posts.ToList().OrderByDescending(x=> x.Rating).Skip(post).Take(3).ToList();
                return  datasContext.Posts.Skip(post).Take(3).ToList();

            }
            return BadRequest(new { error = "Error with entered datas" });
        }
        [HttpGet("{postsAmount}")]
        public ActionResult<IEnumerable<Posts>> GetSomePostsByRating(string postsAmount)
        {
            if (!String.IsNullOrEmpty(postsAmount))
            {
                var post = Int32.Parse(postsAmount);
                return datasContext.Posts.ToList().OrderByDescending(x=> x.Rating).Skip(post).Take(3).ToList();
            }
            return BadRequest(new { error = "Error with entered datas" });
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetAllThemes()
        {
            var themes = await datasContext.Posts.Select(x => x.Theme).Distinct().ToListAsync();

            //var themes = await datasContext.Posts.Select(x => x.Theme).ToListAsync();
            //themes = themes.Distinct().ToList();
            return themes;
            // return await datasContext.Posts.Select(x=> x.Theme).ToListAsync();
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
        [HttpGet("{theme}/{postsAmount}")]
        public ActionResult<IEnumerable<Posts>> GetSomePostsByTheme(string theme,string postsAmount="")
        {
            if (!String.IsNullOrEmpty(postsAmount))
            {
                var post = Int32.Parse(postsAmount);
                //var posts = datasContext.Posts.Where(x => x.Theme.ToLower() == theme.ToLower()).Skip(post).Take(3).ToList();

                return datasContext.Posts.Where(x => x.Theme.ToLower() == theme.ToLower()).Skip(post).Take(3).ToList();

            }
            return BadRequest("Error with entered datas");
        }
        [HttpGet("{id}")]
        public ActionResult<Posts> GetPostById(int id)
        {

            //var posts = datasContext.Posts.Where(x => x.Theme.ToLower() == theme.ToLower()).Skip(post).Take(3).ToList();

            return datasContext.Posts.FirstOrDefault(x=> x.PostsId==id);// Where(x => x.Theme.ToLower() == theme.ToLower()).Skip(post).Take(3).ToList();

            
            //return BadRequest("Error with entered datas");
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
        public async Task<IActionResult> UnSubscribe(SubscribeViewModel model)
        {
            if (model.SubscribeOnId != null)
            {
                var user = await userManager.FindByIdAsync(model.SubscriberId);
                if (user != null)
                {
                    var subscriptionToDelete = datasContext.Subscribers.ToList().Where(x => x.UserId == model.SubscriberId).Where(x=> x.SubscribeToId==model.SubscribeOnId).FirstOrDefault();
                    datasContext.Subscribers.Remove(subscriptionToDelete);
                    datasContext.SaveChanges();

                    var myProfileToEdit = datasContext.Profiles.ToList().Find(x => x.UserId == model.SubscriberId);
                    myProfileToEdit.I_Follow -= 1;

                    datasContext.Profiles.Update(myProfileToEdit);

                    var subscriptionProfile = datasContext.Profiles.ToList().Find(x => x.UserId == model.SubscribeOnId);
                    subscriptionProfile.MyFollowers -= 1;
                    datasContext.Profiles.Update(subscriptionProfile);
                    datasContext.SaveChanges();


                    return Ok(model);
                }

            }
            return NotFound(model);
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //[Authorize(AuthenticationSchemes = CookieAuthenticationDefaults.AuthenticationScheme)]
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
                if (profileToEdit==null)
                {
                    datasContext.Profiles.Add(new Profile
                    {
                        User = user,
                        AboutProfile = model.AboutProfile,
                        ProfilePhoto = model.ProfilePhoto,
                        Name = user.UserName + " " + user.LastName,
                        NickName = "@" + user.Email.Substring(0, user.Email.IndexOf('@'))
                    });
                }else
                {
                    profileToEdit.AboutProfile = model.AboutProfile;
                    profileToEdit.ProfilePhoto = model.ProfilePhoto;
                    datasContext.Profiles.Update(profileToEdit);
                }


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
        [HttpGet("{id}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Profile>>> GetUserSubscriptions(string id)
        {
            if (id != null)
            {
                var subscriptionsIdList = datasContext.Subscribers.ToList().Where(x => x.UserId == id).Select(x => x.SubscribeToId);
                List<Profile> profiles = new List<Profile>();
                var profile = new Profile();
                foreach (var subscriptionId in subscriptionsIdList)
                {
                    profile = await datasContext.Profiles.FirstOrDefaultAsync(x => x.UserId == subscriptionId);

                    profiles.Add(profile);
                }
                return profiles;
            }
            return NotFound();
        }

        [HttpPost]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public ActionResult<bool> CheckUserSubscriptions(SubscribeViewModel model)
        {
            if (model != null)
            {
                //var checkSubscriptionsList = datasContext.Subscribers.ToList().Where(x=> x.UserId==model.SubscriberId).Select(x=> x.SubscribeToId);
                var isSubscribed = datasContext.Subscribers.ToList().Where(x => x.UserId == model.SubscriberId).Where(x=> x.SubscribeToId == model.SubscribeOnId).FirstOrDefault();
                if (isSubscribed != null)
                {
                    return true;
                }
                return false;
            }
            return NotFound();
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> LikePost(LikeDislikeViewModel model)
        {
            if(model.UserId!=null)
            {
                if (model.PostId > 0)
                {
                    var postToEdit = datasContext.Posts.ToList().FirstOrDefault(x => x.PostsId == model.PostId);
                    if (postToEdit != null)
                    {
                        var likeDislikeToEdit = await datasContext.LikesDislikes.FirstOrDefaultAsync(x=> x.UserId==model.UserId && x.PostId==model.PostId);
                        if (likeDislikeToEdit != null)
                        {
                            if (likeDislikeToEdit.Dislike)
                            {
                                postToEdit.Rating += 2;
                            }
                            else
                            {
                                postToEdit.Rating -= 1;
                                datasContext.Posts.Update(postToEdit);
                                datasContext.LikesDislikes.Remove(likeDislikeToEdit);
                                await datasContext.SaveChangesAsync();
                                return BadRequest(new
                                { success = "Like was deleted",
                                  likesCount = await GetPostLikesCount(postToEdit.PostsId),
                                  dislikesCount=await GetPostDislikesCount(postToEdit.PostsId)
                                });
                                
                                //return BadRequest(new { success = "Like was deleted"});
                            }
                            likeDislikeToEdit.Like = true;
                            likeDislikeToEdit.Dislike = false;
                        }
                        else
                        {
                            //postToEdit.Liked += 1;
                            postToEdit.Rating += 1;

                            likeDislikeToEdit = new LikeDislike
                            {
                                UserId = model.UserId,
                                PostId = model.PostId,
                                Like = true,
                                Dislike = false,
                                Posts = postToEdit,
                                //Profile = await datasContext.Profiles.FirstOrDefaultAsync(x => x.UserId == model.UserId)
                            };

                        }
                        datasContext.Posts.Update(postToEdit);
                        datasContext.LikesDislikes.Update(likeDislikeToEdit);
                        await datasContext.SaveChangesAsync();
                        int likesCount = await GetPostLikesCount(postToEdit.PostsId);
                        return Ok(new
                        {
                            success = "Post was liked",
                            likesCount = await GetPostLikesCount(postToEdit.PostsId),
                            dislikesCount = await GetPostDislikesCount(postToEdit.PostsId)
                        });
                        //return Ok(new { success = "Post was liked" });
                    }

                }
                return BadRequest(new { error = "No such post" });
            }
            else
            {
                return BadRequest(new { error = "No such user" });
            }

        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> DislikePost(LikeDislikeViewModel model)
        {
            if (model.UserId != null)
            {
                if (model.PostId > 0)
                {
                    var postToEdit = datasContext.Posts.ToList().FirstOrDefault(x => x.PostsId == model.PostId);
                    if (postToEdit != null)
                    {
                       

                        var likeDislikeToEdit = await datasContext.LikesDislikes.FirstOrDefaultAsync(x => x.UserId == model.UserId && x.PostId == model.PostId);
                        if (likeDislikeToEdit != null)
                        {
                            if (likeDislikeToEdit.Like)
                            {
                                postToEdit.Rating -= 2;
                            }
                            else
                            {
                                postToEdit.Rating += 1;
                                datasContext.Posts.Update(postToEdit);
                                datasContext.LikesDislikes.Remove(likeDislikeToEdit);
                                await datasContext.SaveChangesAsync();
                                //int dislikesCount = await GetPostDislikesCount(postToEdit.PostsId);
                                return BadRequest(new 
                                { success = "Dislike was deleted",
                                  dislikesCount = await GetPostDislikesCount(postToEdit.PostsId),
                                  likesCount = await GetPostLikesCount(postToEdit.PostsId)
                                });
                            }
                            likeDislikeToEdit.Like = false;
                            likeDislikeToEdit.Dislike = true;
                        }
                        else
                        {
                            //postToEdit.Disliked -= 1;
                            postToEdit.Rating -= 1;

                            likeDislikeToEdit = new LikeDislike
                            {
                                UserId = model.UserId,
                                PostId = model.PostId,
                                Like = false,
                                Dislike = true,
                                Posts = postToEdit,
                                //Profile = await datasContext.Profiles.FirstOrDefaultAsync(x => x.UserId == model.UserId)
                            };
                        }
                        datasContext.Posts.Update(postToEdit);
                        datasContext.LikesDislikes.Update(likeDislikeToEdit);
                        await datasContext.SaveChangesAsync();
                        return Ok(new
                        {
                            success = "Post was disliked",
                            dislikesCount = await GetPostDislikesCount(postToEdit.PostsId),
                            likesCount = await GetPostLikesCount(postToEdit.PostsId)
                        });

                        //return Ok(new { success = "Post was disliked" });

                    }
                }
                return BadRequest(new { error = "No such post" });
            }
            return BadRequest(new { error = "No such user" });
        }
       
        private async Task<int> GetPostLikesCount(int postId)
        {
            var likesCount = await datasContext.LikesDislikes.Where(x => x.PostId == postId && x.Like == true).ToListAsync();
            return likesCount!=null ? likesCount.Count() : 0;
        }
        private async Task<int> GetPostDislikesCount(int postId)
        {
            var disikesCount = await datasContext.LikesDislikes.Where(x => x.PostId == postId && x.Dislike == true).ToListAsync();
            return disikesCount != null ? disikesCount.Count() : 0;
        }

        [HttpPost]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> GetPostLikesAndDislikesCount(LikeDislikeViewModel model)
        {
            var likesCount = await datasContext.LikesDislikes.Where(x=> x.PostId==model.PostId && x.Like==true).ToListAsync();           
            var dislikesCount = await datasContext.LikesDislikes.Where(x=> x.PostId==model.PostId && x.Dislike==true).ToListAsync();
            return Ok(new { likesCount = likesCount.Count(), dislikesCount= dislikesCount.Count() });
        }
        //[HttpGet]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //public async Task<ActionResult<int>> GetPostDislikesCount(LikeDislikeViewModel model)
        //{
        //    var dislikesCount = await datasContext.LikesDislikes.Where(x => x.PostId == model.PostId && x.Dislike== true).ToListAsync();
        //    return dislikesCount.Count();
        //}
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<int>> GetPostRating(LikeDislikeViewModel model)
        {
            var rating = await datasContext.Posts.Where(x => x.PostsId == model.PostId).Select(x => x.Rating).FirstOrDefaultAsync();
            return rating;
        }
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> CheckingUserPostLiked(LikeDislikeViewModel model)
        {
            var liked = await datasContext.LikesDislikes.FirstOrDefaultAsync(x => x.PostId == model.PostId && x.UserId==model.UserId);
            if(liked!=null)
            {
                if (liked.Like == true)
                {
                    return Ok(new { message = "liked" });
                }
                else
                {
                    return Ok(new { message = "disliked" });
                }
            }
            return BadRequest( new { message = "Record doesn't exist"});
            //  var disliked = await datasContext.LikesDislikes.FirstOrDefaultAsync(x => x.PostId == model.PostId && x.UserId==model.UserId && x.Dislike==true);
        }
    }
}