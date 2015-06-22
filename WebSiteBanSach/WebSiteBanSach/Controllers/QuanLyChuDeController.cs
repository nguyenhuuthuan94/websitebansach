using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebSiteBanSach.Models;
using PagedList;
using PagedList.Mvc;
using System.IO;

namespace WebSiteBanSach.Controllers
{
    public class QuanLyChuDeController : Controller
    {
        //
        // GET: /QuanLyChuDe/
        QuanLyBanSachEntities db = new QuanLyBanSachEntities();
        public ActionResult Index(int? page)
        {
            int pageNumber = (page ?? 1);
            int pageSize = 10;
            return View(db.ChuDes.ToList().OrderBy(n => n.MaChuDe).ToPagedList(pageNumber, pageSize));
        }
        //Thêm mới 
        [HttpGet]
        public ActionResult ThemMoi()
        {
            return View();
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ThemMoi(ChuDe cd, HttpPostedFileBase fileUpload)
        {
            //Thêm vào cơ sở dữ liệu
            if (ModelState.IsValid)
            {
                db.ChuDes.Add(cd);
                db.SaveChanges();
            }
            return View();
        }
        //Chỉnh sửa sản phẩm
        [HttpGet]
        public ActionResult ChinhSua(int MaChuDe)
        {
            //Lấy ra đối tượng sách theo mã 
            ChuDe cd = db.ChuDes.SingleOrDefault(n => n.MaChuDe == MaChuDe);
            if (cd == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            return View(cd);
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ChinhSua(ChuDe cd, FormCollection f)
        {
            //Thêm vào cơ sở dữ liệu
            if (ModelState.IsValid)
            {
                //Thực hiện cập nhận trong model
                db.Entry(cd).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
            return RedirectToAction("Index");

        }
        //Hiển thị sản phẩm
        public ActionResult HienThi(int MaChuDe)
        {

            //Lấy ra đối tượng sách theo mã 
            ChuDe cd = db.ChuDes.SingleOrDefault(n => n.MaChuDe == MaChuDe);
            if (cd == null)
            {
                Response.StatusCode = 404;
                return null;
            }

            return View(cd);

        }
        //Xóa sản phẩm
        [HttpGet]
        public ActionResult Xoa(int MaChuDe)
        {
            //Lấy ra đối tượng sách theo mã 
            ChuDe cd = db.ChuDes.SingleOrDefault(n => n.MaChuDe == MaChuDe);
            if (cd == null)
            {
                Response.StatusCode = 404;
                return null;
            }

            return View(cd);
        }
        [HttpPost, ActionName("Xoa")]

        public ActionResult XacNhanXoa(int MaChuDe)
        {
            ChuDe cd = db.ChuDes.SingleOrDefault(n => n.MaChuDe == MaChuDe);
            if (cd == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            db.ChuDes.Remove(cd);
            try
            {
                db.SaveChanges();
            }
            catch (System.Data.Entity.Infrastructure.DbUpdateException ex)
            {
                Response.Status = ex.InnerException.Message;
                return null;
            }
            return RedirectToAction("Index");

        }
	}
}