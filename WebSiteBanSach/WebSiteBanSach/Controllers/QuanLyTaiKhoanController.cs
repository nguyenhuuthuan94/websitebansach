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
    public class QuanLyTaiKhoanController : Controller
    {
        //
        // GET: /QuanLySanPham/
        db1ce907233a3c4e8bb553a55200989dc5Entities db = new db1ce907233a3c4e8bb553a55200989dc5Entities();
        public ActionResult Index(int? page)
        {
            int pageNumber = (page ?? 1);
            int pageSize = 10;
            return View(db.KhachHangs.ToList().OrderBy(n => n.MaKH).ToPagedList(pageNumber, pageSize));
        }
        //Thêm mới 
        [HttpGet]
        public ActionResult ThemMoi()
        {
            return View();
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ThemMoi(KhachHang kh, HttpPostedFileBase fileUpload)
        {
            //Thêm vào cơ sở dữ liệu
            if (ModelState.IsValid)
            {
                db.KhachHangs.Add(kh);
                db.SaveChanges();
            }
            return View();
        }
        //Chỉnh sửa sản phẩm
        [HttpGet]
        public ActionResult ChinhSua(int MaKH)
        {
            //Lấy ra đối tượng sách theo mã 
            KhachHang kh = db.KhachHangs.SingleOrDefault(n => n.MaKH == MaKH);
            if (kh == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            return View(kh);
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ChinhSua(KhachHang kh, FormCollection f)
        {
            //Thêm vào cơ sở dữ liệu
            if (ModelState.IsValid)
            {
                //Thực hiện cập nhận trong model
                db.Entry(kh).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }
        //Hiển thị sản phẩm
        public ActionResult HienThi(int MaKH)
        {
            //Lấy ra đối tượng sách theo mã 
            KhachHang kh = db.KhachHangs.SingleOrDefault(n => n.MaKH == MaKH);
            if (kh == null)
            {
                Response.StatusCode = 404;
                return null;
            }

            return View(kh);
        }
        //Xóa sản phẩm
        [HttpGet]
        public ActionResult Xoa(int MaKH)
        {
            //Lấy ra đối tượng sách theo mã 
            KhachHang kh = db.KhachHangs.SingleOrDefault(n => n.MaKH == MaKH);
            if (kh == null)
            {
                Response.StatusCode = 404;
                return null;
            }

            return View(kh);
        }
        [HttpPost, ActionName("Xoa")]

        public ActionResult XacNhanXoa(int MaKH)
        {
            KhachHang kh = db.KhachHangs.SingleOrDefault(n => n.MaKH == MaKH);
            if (kh == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            kh.DiaChi = null;
            kh.DienThoai = null;
            kh.Email = null;
            kh.GioiTinh = null;
            kh.HoTen = null;
            kh.NgaySinh = null;
            kh.MatKhau = null;
            kh.TaiKhoan = null;
          
            db.Entry(kh).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("Index");

        }

        //Chỉnh sửa thông tin tài khoản
        public ActionResult AdminProfile()
        {
            //Lấy ra đối tượng sách theo mã 
            KhachHang kh = db.KhachHangs.SingleOrDefault(n => n.TaiKhoan == "admin");
            if (kh == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            return View(kh);

        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult AdminProfile(KhachHang kh, FormCollection f)
        {
            //Thêm vào cơ sở dữ liệu
            if (ModelState.IsValid)
            {
                //Thực hiện cập nhận trong model
                db.Entry(kh).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }


            return RedirectToAction("AdminProfile");
        }
    }
}