using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models
{
    public class Profile
    {
        [Key]
        public int ProfileId { get; set; }
        public string AboutProfile { get; set; }
        public string ProfilePhoto { get; set; }
        public string Name { get; set; }
        public string NickName { get; set; }
        public string LinkOnProfile { get; set; }
        public int MyFollowers { get; set; }
        public int I_Follow { get; set; }
        //public byte[] ProfilePhoto { get; set; }
        [ForeignKey("UserId")]
        public string UserId { get; set; }
        public User User { get; set; }
        //public virtual User User { get; set; }

    }
}
