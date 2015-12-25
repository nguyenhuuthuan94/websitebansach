using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class HomeAPIController : ApiController
    {
        [HttpGet]
        [Route("api/home/all")]
        public IHttpActionResult GetAll()
        {
            using (QuanLyBanSachEntities ctx = new QuanLyBanSachEntities())
            {
                List<Sach> list = ctx.Saches.ToList();
                Mapper.CreateMap<Sach, SachModel>();
                List<SachModel> ret = Mapper.Map<List<Sach>, List<SachModel>>(list);
                return Ok(ret);
            }
        }

    }
}
