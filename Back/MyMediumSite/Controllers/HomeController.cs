using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyMediumSite.Models;
using MyMediumSite.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Controllers
{
    public class HomeController : Controller
    {
        //readonly PersonContext db;
        //public HomeController(PersonContext db)
        //{
        //    this.db = db;
        //}
        public IActionResult Index()
        {
            return View(/*new PersonViewModel { Persons=db.Persons.ToList(),Profiles=db.Profiles.ToList() }*/);
        }
    }
}
