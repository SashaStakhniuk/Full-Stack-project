using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models
{
    public class Posts
    {
        public Posts()
        {
            LikesDislikes = new HashSet<LikeDislike>();
        }
        [Key]
        public int PostsId { get; set; }
        public string Theme { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string PostPhoto { get; set; }

        //public byte[] PostPhoto { get; set; }
        public string Article { get; set; }
        //public int Liked { get; set; }
        //public int Disliked { get; set; }
        public int Rating { get; set; }

        public string Id { get; set; }
        public virtual User User { get; set; }

        public ICollection<LikeDislike> LikesDislikes;

        //public int PersonId { get; set; }
        //public Person Person { get; set; }
    }
}
