using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebService.Models;

namespace WebService.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class HomeAPIController : ApiController
    {
        #region Helper
        public HttpResponseMessage CreateResponse<T>(HttpStatusCode statusCode, T data)
        {
            return Request.CreateResponse(statusCode, data);
        }
        public HttpResponseMessage CreateResponse(HttpStatusCode statusCode)
        {
            return Request.CreateResponse(statusCode);


        }

        #endregion

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
