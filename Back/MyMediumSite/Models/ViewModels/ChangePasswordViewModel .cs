using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyMediumSite.Models.ViewModels
{
    public class ChangePasswordViewModel
    {
        //public string Id { get; set; }
        public string Email { get; set; }
        //[Required(ErrorMessage = "Pasword is required")]
        //[DataType(DataType.Password)]
        //public string OldPassword { get; set; }
        //[Required(ErrorMessage = "Pasword is required")]
        //[DataType(DataType.Password)]
        public string NewPassword { get; set; }
        public string Token { get; set; }
    }
}
