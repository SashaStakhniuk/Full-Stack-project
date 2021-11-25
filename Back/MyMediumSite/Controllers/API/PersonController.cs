//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using MyMediumSite.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace MyMediumSite.Controllers.API
//{
//    [ApiController]
//    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
//    [Route("api/[controller]")]
//    public class PersonController : Controller
//    {
//        private readonly PersonContext context;
//        public PersonController(PersonContext context)
//        {
//            this.context = context;
//        }

//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Person>>> Get()
//        {
//            return await context.Persons.ToListAsync();
//        }
//        [HttpGet("{id}")]
//        public async Task<ActionResult<Person>> Get(int id)
//        {
//            Person person = await context.Persons.FirstOrDefaultAsync(x => x.PersonId == id);
//            if (person == null)
//            {
//                return NotFound();
//            }
//            return Ok(person);
//        }
//        [HttpPost]
//        public async Task<ActionResult<Person>> Post(Person person)
//        {
//            //Bike bikeToAdd = new Bike();
//            //bikeToAdd.BikeId = bike.BikeId;
//            //bikeToAdd.BikeTitle = bike.BikeTitle;
//            //bikeToAdd.ManufacturyId = bike.ManufacturyId;
//            //bikeToAdd.TypeId = bike.TypeId;
//            //bikeToAdd.MaterialId = bike.MaterialId;
//            //bikeToAdd.SpeedCount = bike.SpeedCount;
//            //bikeToAdd.Size = bike.Size;
//            //bikeToAdd.WheelDiameter = bike.WheelDiameter;
//            //bikeToAdd.BreakTypeId = bike.BreakTypeId;
//            //bikeToAdd.PhotoPath = bike.PhotoPath;
//            //bikeToAdd.Price = bike.Price;// Decimal.Parse(bike.Price.ToString());
//            //if (!string.IsNullOrEmpty(bike.BikeTitle) && !string.IsNullOrEmpty(bike.PhotoPath) && bike.Size != 0 && bike.SpeedCount != 0 && bike.WheelDiameter!=0 && bike.Price>=0)
//            //{
//            //    context.Bikes.Add(bike);
//            //    await context.SaveChangesAsync();
//            //    return Ok(bike);
//            //}
//            //else
//            //{
//            //    ModelState.AddModelError("DatasModelError", "Please,enter all required datas correctly(all numbers must be >= 0)");
//            //    ModelState.AddModelError("TitleError", "Enter the title");
//            //    return BadRequest(ModelState);
//            //}

//            //if (string.IsNullOrEmpty(bike.BikeTitle))
//            //{
//            //    ModelState.AddModelError("TitleError", "Enter the title");

//            //}
//            //if (string.IsNullOrEmpty(bike.PhotoPath))
//            //{
//            //    ModelState.AddModelError("PhotoPathError", "Enter the photoPath");
//            //}
//            //if (bike.Size <= 0)
//            //{
//            //    ModelState.AddModelError("BikeSizeError", "Size must be bigger than 0");
//            //}
//            //if (bike.SpeedCount <= 0)
//            //{
//            //    ModelState.AddModelError("SpeedCountError", "Count of speeds must be bigger than 0");
//            //}
//            //if (bike.WheelDiameter <= 0)
//            //{
//            //    ModelState.AddModelError("WheelDiameterError", "Wheels diameter must be bigger than 0");
//            //}
//            //if (bike.Price <= 0)
//            //{
//            //    ModelState.AddModelError("PriceError", "Price must be bigger than 0");
//            //}
//            if (!ModelState.IsValid)
//            {
//                //ModelState.AddModelError("DatasModelError", "Please,enter all required datas correctly(all numbers must be >= 0)");
//                return BadRequest(ModelState);
//            }
//            else
//            {

//                context.Persons.Add(person);
//                await context.SaveChangesAsync();
//                return Ok(person);
//            }
//            //return View(bike);
//        }
//        //public ActionResult<Bike> Post(Bike bike)
//        //{
//        //    //Bike bikeToAdd = new Bike();
//        //    //bikeToAdd.BikeId = bike.BikeId;
//        //    //bikeToAdd.BikeTitle = bike.BikeTitle;
//        //    //bikeToAdd.ManufacturyId = 1;//bike.ManufacturyId;
//        //    //bikeToAdd.TypeId = 1;//bike.TypeId;
//        //    //bikeToAdd.MaterialId = 1;// bike.MaterialId;
//        //    //bikeToAdd.SpeedCount = bike.SpeedCount;
//        //    //bikeToAdd.Size = bike.Size;
//        //    //bikeToAdd.WheelDiameter = bike.WheelDiameter;
//        //    //bikeToAdd.BreakTypeId = 1;// bike.BreakTypeId;
//        //    //bikeToAdd.PhotoPath = bike.PhotoPath;
//        //    //bikeToAdd.Price = bike.Price;// Decimal.Parse(bike.Price.ToString());

//        //    context.Bikes.Add(bike);
//        //    context.SaveChanges();
//        //    return Ok(bike);
//        //}
//        [HttpPut]
//        public async Task<ActionResult<Person>> Put(Person person)
//        {
//            //if (string.IsNullOrEmpty(bike.BikeTitle))
//            //{
//            //    ModelState.AddModelError("TitleError", "Enter the title");

//            //}
//            //if (string.IsNullOrEmpty(bike.PhotoPath))
//            //{
//            //    ModelState.AddModelError("PhotoPathError", "Enter the photoPath");
//            //}
//            //if (bike.Size <= 0)
//            //{
//            //    ModelState.AddModelError("BikeSizeError", "Size must be bigger than 0");
//            //}
//            //if (bike.SpeedCount <= 0)
//            //{
//            //    ModelState.AddModelError("SpeedCountError", "Count of speeds must be bigger than 0");
//            //}
//            //if (bike.WheelDiameter <= 0)
//            //{
//            //    ModelState.AddModelError("WheelDiameterError", "Wheels diameter must be bigger than 0");
//            //}
//            //if (bike.Price <= 0)
//            //{
//            //    ModelState.AddModelError("PriceError", "Price must be bigger than 0");
//            //}
//            if (!ModelState.IsValid)
//            {
//                //ModelState.AddModelError("DatasModelError", "Please,enter all required datas correctly(all numbers must be >= 0)");
//                return BadRequest(ModelState);
//            }
//            else
//            {

//                context.Update(person);
//                await context.SaveChangesAsync();
//                return Ok(person);
//            }

//        }
//        [HttpDelete("{id}")]
//        public async Task<ActionResult<Person>> Delete(int id)
//        {
//            Person person = await context.Persons.FirstOrDefaultAsync(x => x.PersonId == id);
//            if (person == null)
//            {
//                return NotFound();
//            }
//            context.Persons.Remove(person);
//            await context.SaveChangesAsync();
//            return Ok(person);
//        }
//    }
//}
