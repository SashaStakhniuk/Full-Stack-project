using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models
{
    public class Person
    {
        //public Person()
        //{
        //    this.Posts = new HashSet<Posts>();
        //}
        public string PersonId { get; set; }
       public string NickName { get; set; }
       public string LinkOnProfile { get; set; }
       public int MyFollowers { get; set; }
       public string I_Follow { get; set; }
      // public int ProfileId { get; set; }
       //public int PostsId { get; set; }

        //public virtual Profile Profile { get; set; }
        //public ICollection<Posts> Posts { get; set; }

        //public virtual ICollection<User> User { get; set; }

    }
}
