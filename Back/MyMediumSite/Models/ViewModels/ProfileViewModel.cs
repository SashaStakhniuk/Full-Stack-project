using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models
{
    public class ProfileViewModel
    {
        public string AboutProfile { get; set; }
        public string ProfilePhoto { get; set; }
        public string Email { get; set; }

        public string Id { get; set; }

    }
}
