using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models
{
    public class LikeDislike
    {
        [Key]
        public int Id { get; set; }
        public string UserId { get; set; }
        public int PostId { get; set; }
        public bool Like { get; set; }
        public bool Dislike { get; set; }
        public virtual Posts Posts { get; set; }
        //public virtual Profile Profile { get; set; }
    }
}
