using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models
{
    public class DatasContext : DbContext
    {
        public DatasContext(DbContextOptions<DatasContext> options) : base(options)
        {
            //Database.EnsureDeleted();////////видалити
            Database.EnsureCreated();
        }
        //public DbSet<Person> Persons { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Posts> Posts { get; set; }
        public DbSet<Subscriber> Subscribers { get; set; }

    }
}
