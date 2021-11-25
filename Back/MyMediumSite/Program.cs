
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MyMediumSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            //using (var scope = host.Services.CreateScope())
            //{
            //    var servises = scope.ServiceProvider;
            //    try
            //    {
            //        var personContext = servises.GetRequiredService<PersonContext>();
            //        //var identityContext = servises.GetRequiredService<IdentityContext>();
            //        //DatasToDb.Initialize(personContext/*, identityContext*/);

            //        DatasToDb.Initialize(personContext);

            //    }
            //    catch (Exception ex)
            //    {
            //        var loger = servises.GetRequiredService<ILogger<Program>>();
            //        loger.LogDebug(ex, "Db seting error");
            //    }
            //}

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}













//using Microsoft.AspNetCore.Hosting;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;
//using Microsoft.Extensions.Logging;
//using MyMediumSite.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace MyMediumSite
//{
//    public class Program
//    {
//        public static void Main(string[] args)
//        {
//            var host = CreateHostBuilder(args).Build();

//            using (var scope = host.Services.CreateScope())
//            {
//                var servises = scope.ServiceProvider;
//                try
//                {
//                    var personContext = servises.GetRequiredService<PersonContext>();
//                    var IdentityContext = servises.GetRequiredService<IdentityContext>();
//                    DatasToDb.Initialize(personContext, IdentityContext);
//                    DatasToDb.SetUser();
//                }
//                catch (Exception ex)
//                {
//                    var loger = servises.GetRequiredService<ILogger<Program>>();
//                    loger.LogDebug(ex, "Db seting error");
//                }
//            }

//            host.Run();
//        }

//        public static IHostBuilder CreateHostBuilder(string[] args) =>
//            Host.CreateDefaultBuilder(args)
//                .ConfigureWebHostDefaults(webBuilder =>
//                {
//                    webBuilder.UseStartup<Startup>();
//                });
//    }
//}





