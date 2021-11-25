using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models.ViewModels
{
    public class PersonViewModel
    {
        public List<Profile> Profiles { get; set; }
        public List<Posts> Posts { get; set; }
        public List<Person> Persons { get; set; }

    }
}
