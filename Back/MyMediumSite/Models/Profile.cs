using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models
{
    public class Profile
    {
        public string ProfileId { get; set; }
        public string AboutProfile { get; set; }
        public string ProfilePhoto { get; set; }

        //public byte[] ProfilePhoto { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        //public virtual User User { get; set; }

    }
}
