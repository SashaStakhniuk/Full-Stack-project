using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models
{
    public class SubscribeViewModel
    {
        public string SubscriberId { get; set; }
        public string SubscribeOnId { get; set; }
    }
}
