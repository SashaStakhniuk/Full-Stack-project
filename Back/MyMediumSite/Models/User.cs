using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models
{
    public class User: IdentityUser
    {
        public User()
        {
            Posts = new HashSet<Posts>();
        }
        public string LastName { get; set; }

        public string NickName { get; set; }
        public string LinkOnProfile { get; set; }
        public int MyFollowers { get; set; }
        public string I_Follow { get; set; }
        public virtual Profile Profile { get; set; }

        public ICollection<Posts> Posts;
    }
}
