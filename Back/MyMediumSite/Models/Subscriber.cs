using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models
{
    public class Subscriber
    {
        [Key]
        public int Id { get; set; }
        public string SubscribeToId { get; set; }

        //public string SubscriberId { get; set; }
        public string UserId { get; set; }

        public virtual User User { get; set; }



    }
}
