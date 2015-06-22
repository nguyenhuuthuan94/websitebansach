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
    public class NguoiDungController : Controller
    {
        static public KhachHang kh = null;
        private ICustomerRepository repository = null;
        QuanLyBanSachEntities db = new QuanLyBanSachEntities();
 
          public NguoiDungController() 
          { 
            this.repository = new CustomerRepository(); 
          }

          public NguoiDungController(ICustomerRepository repository) 
          { 
            this.repository = repository;
          } 
         
          public ActionResult Index() 
          { 
            //List model = (List)repository.SelectAll(); 
            return View(); 
          } 
         
          public ActionResult New() 
          { 
            return View(); 
          } 
         
          public ActionResult Insert(KhachHang obj) 
          { 
            repository.Insert(obj); 
            repository.Save(); 
            return View(); 
          } 
         
          public ActionResult Edit(string id) 
          { 
            KhachHang existing = repository.SelectByID(id); 
            return View(existing); 
          } 
         
          public ActionResult Update(KhachHang obj) 
          { 
            repository.Update(obj); 
            repository.Save(); 
            return View(); 
          } 
         
          public ActionResult ConfirmDelete(string id) 
          { 
            KhachHang existing = repository.SelectByID(id); 
            return View(existing); 
          } 
         
          public ActionResult Delete(string id) 
          { 
            repository.Delete(id); 
            repository.Save(); 
            return View(); 
          }


        //QuanLyBanSachEntities db = new QuanLyBanSachEntities();


        //// GET: /NguoiDung/
        //public ActionResult Index()
        //{
        //    return View();
        //}
        [HttpGet]
        public ActionResult DangKy()
        {

            return View();
        }
        [HttpPost]
        // [ValidateAntiForgeryToken]
        public ActionResult DangKy(KhachHang kh)
        {
            //if (ModelState.IsValid)
            //{
            //    //Chèn dữ liệu vào bảng khách hàng
            //    db.KhachHangs.Add(kh);
            //    //Lưu vào csdl 
            //    db.SaveChanges();
            //}
            //return View();

            repository.Insert(kh);
            repository.Save();
            return View();
        }
        [HttpGet]
        public ActionResult DangNhap()
        {

            return View();
        }
        [HttpPost]
        public ActionResult DangNhap(FormCollection f)
        {
            string sTaiKhoan = f["txtTaiKhoan"].ToString();
            string sMatKhau = f.Get("txtMatKhau").ToString();
            List<KhachHang> listkh = (List<KhachHang>)repository.SelectAll();
            
            foreach (var item in listkh)
            {
                if (sTaiKhoan == item.TaiKhoan && sMatKhau == item.MatKhau)
                    kh = item;
            }

            if (kh != null)
            {
                ViewBag.ThongBao = "Chúc mừng bạn đăng nhập thành công !";
                Session["TaiKhoan"] = kh;
                if(kh.TaiKhoan == "admin")
                {
                    return RedirectToAction("Index","QuanLySanPham");
                }
                return RedirectToAction("Index", "Home");
            }
            ViewBag.ThongBao = "Tên tài khoản hoặc mật khẩu không đúng!";
            return View();
        }
        //tạo partial đăng nhập
        public ActionResult DangNhapPartial()
        {
            if(kh == null)
                ViewBag.TenTaiKhoan = "Đăng Nhập";
            else
                ViewBag.TenTaiKhoan = kh.TaiKhoan;
            return PartialView();
        }

        //Chỉnh sửa thông tin tài khoản
        public ActionResult ThongTinKhachHang()
        {
            if (kh == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            //tải lại thông tin khách hàng
            List<KhachHang> listkh = (List<KhachHang>)repository.SelectAll();
            KhachHang temp = kh;
            foreach (var item in listkh)
            {
                if (kh.MaKH == item.MaKH)
                    temp = item;
            }
            return View(temp);
            
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ThongTinKhachHang(KhachHang kh, FormCollection f)
        {
            //Thêm vào cơ sở dữ liệu
            if (ModelState.IsValid)
            {
                //Thực hiện cập nhận trong model
                db.Entry(kh).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }

            
            return RedirectToAction("ThongTinKhachHang");
        }
        public ActionResult LichSuMuaHang()
        {
            List<DonHang> ldh = new List<DonHang>();
            if (kh != null)
            {
                foreach (var item in db.DonHangs.ToList())
                {
                    if (item.MaKH == kh.MaKH)
                        ldh.Add(item);
                }
            }
            return View(ldh);
        }
    }
}