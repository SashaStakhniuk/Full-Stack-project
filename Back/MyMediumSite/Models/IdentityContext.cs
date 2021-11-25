using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MyMediumSite.Models
{

    //public class IdentityContext : IdentityDbContext
    //{
    //    public DbSet<Person> Persons { get; set; }
    //    public IdentityContext(DbContextOptions<IdentityContext> options)
    //        : base(options)
    //    {
    //    }
    //}

    public class IdentityContext : IdentityDbContext<User>
    {
        public IdentityContext(DbContextOptions<IdentityContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
