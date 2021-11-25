using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models
{
    public class PostsViewModel
    {
        //public int PostsId { get; set; }
        public string Theme { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string PostPhoto { get; set; }

        //public byte[] PostPhoto { get; set; }
        public string Article { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; }
    }
}
