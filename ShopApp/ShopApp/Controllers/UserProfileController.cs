﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShopApp.Models;

namespace ShopApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        //GET : /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.FirstName,
                user.LastName,
                user.Email,
                user.UserName,
                user.Id,
                user.City,
                user.ZipCode,
                user.StreetName,
                user.SteerNumber
            };
        }

        [HttpGet("/api/Orders/UserOrders")]
        public async Task<ActionResult<Order>> GetOrdersByUser()
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var userIDx = user.Id;

            var orders = (from a in _context.Orders
                          where a.UserID == userIDx

                          select new
                          {
                              a.OrderDate,
                              a.OrderID,
                              a.OrderStatus,
                          }).ToArray();


            return Ok(orders);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("ForAdmin")]
        public string GetForAdmin()
        {
            return "Web method for Admin";
        }

        [HttpGet]
        [Authorize(Roles = "Registered")]
        [Route("ForRegistered")]
        public string GetForRegistered()
        {
            return "Web method for Registered";
        }

        [HttpGet]
        [Authorize(Roles = "Customer")]
        [Route("ForCustomer")]
        public string GetForCustomer()
        {
            return "Web method for Customer";
        }

        [HttpGet]
        [Authorize(Roles = "Unregistered")]
        [Route("ForUnregisteredr")]
        public string GetForUnregistered()
        {
            return "Web method for Unregistered";
        }
    }
}