using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models
{
    public class DatasDbContext : DbContext
    {
        public DatasDbContext(DbContextOptions<DatasDbContext> options) : base(options)
        {
            //Database.EnsureDeleted();////////видалити бд зі старою схемою
            Database.EnsureCreated();///////додати бд з новою схемою
        }
        //public DbSet<Person> Persons { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Posts> Posts { get; set; }
        public DbSet<Subscriber> Subscribers { get; set; }
        public DbSet<LikeDislike> LikesDislikes { get; set; }

    }
}
