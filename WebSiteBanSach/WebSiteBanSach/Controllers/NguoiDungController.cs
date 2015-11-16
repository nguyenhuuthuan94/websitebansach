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
        db1ce907233a3c4e8bb553a55200989dc5Entities db = new db1ce907233a3c4e8bb553a55200989dc5Entities();
 
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
        //[ValidateInput(false)]
        public ActionResult DangKy(KhachHang kh, FormCollection f)
        {
            
            string sHoTen = f["txtHoTen"].ToString();
            string sNgaySinh = f["txtNgaySinh"].ToString();
            string sGioiTinh = f["txtGioiTinh"].ToString();
            string sDienThoai = f["txtDienThoai"].ToString();
            string sEmail = f["txtEmail"].ToString();
            string sDiaChi = f["txtDiaChi"].ToString();
            string sTaiKhoan = f["txtTaiKhoan"].ToString();
            string sMatKhau1 = f.Get("txtMatKhau1").ToString();
            string sMatKhau2 = f.Get("txtMatKhau2").ToString();

            ViewBag.ThongBao = "";

            if (sHoTen == "")
            {
                ViewBag.ThongBao = "Họ tên không được để trống!";
                return View();
            }
            if (sNgaySinh == "")
            {
                ViewBag.ThongBao = "Ngày sinh không được để trống!";
                return View();
            }
            if (sGioiTinh == "")
            {
                ViewBag.ThongBao = "Giới tính không được để trống!";
                return View();
            }
            if (sDienThoai == "")
            {
                ViewBag.ThongBao = "Điện thoại không được để trống!";
                return View();
            }
            if (sEmail == "")
            {
                ViewBag.ThongBao = "Email không được để trống!";
                return View();
            }
            if (sDiaChi == "")
            {
                ViewBag.ThongBao = "Địa chỉ không được để trống!";
                return View();
            }
            if (sTaiKhoan == "")
            {
                ViewBag.ThongBao = "Tài khoản không được để trống!";
                return View();
            }
            else
            {
                KhachHang temp = null;
                temp = db.KhachHangs.FirstOrDefault(n => n.TaiKhoan == sTaiKhoan);
                if (temp != null)
                    ViewBag.ThongBao = "Tài khoản đã có người đăng ký";
            }
            if (sMatKhau1 == "" || sMatKhau2 == "")
            {
                ViewBag.ThongBao = "Mật khẩu không được để trống!";
                return View();
            }
            if (sMatKhau1 != sMatKhau2)
            {
                ViewBag.ThongBao = "Mật khẩu không trùng khớp!";
                return View();
            }

            

            if (ViewBag.ThongBao == "")
            {
                ViewBag.ThongBao = "Đăng ký thành công!";
                //KhachHang kh = new KhachHang();
                kh.HoTen = sHoTen;
                kh.GioiTinh = sGioiTinh;
                kh.MatKhau = sMatKhau1;
                kh.NgaySinh = Convert.ToDateTime(sNgaySinh);
                kh.TaiKhoan = sTaiKhoan;
                kh.DienThoai = sDienThoai;
                kh.DiaChi = sDiaChi;
                kh.Email = sEmail;

                if (ModelState.IsValid)
                {
                    db.KhachHangs.Add(kh);
                    db.SaveChanges();
                }
                return View();
            }
            return View();
            
            /*
            ViewBag.ThongBao = "";

            if (kh.HoTen == "")
            {
                ViewBag.ThongBao = "Họ tên không được để trống!";
                return View();
            }

            string sNgaySinh = f["txtNgaySinh"].ToString();

            if (sNgaySinh == "")
            {
                ViewBag.ThongBao = "Ngày sinh không được để trống!";
                return View();
            }
            else
                kh.NgaySinh = Convert.ToDateTime(sNgaySinh);

            if (kh.GioiTinh == "")
            {
                ViewBag.ThongBao = "Giới tính không được để trống!";
                return View();
            }
            if (kh.DienThoai == "")
            {
                ViewBag.ThongBao = "Điện thoại không được để trống!";
                return View();
            }
            if (kh.Email == "")
            {
                ViewBag.ThongBao = "Email không được để trống!";
                return View();
            }
            if (kh.DiaChi == "")
            {
                ViewBag.ThongBao = "Địa chỉ không được để trống!";
                return View();
            }
            if (kh.TaiKhoan == "")
            {
                ViewBag.ThongBao = "Tài khoản không được để trống!";
                return View();
            }
            else
            {
                KhachHang temp = null;
                temp = db.KhachHangs.FirstOrDefault(n => n.TaiKhoan == kh.TaiKhoan);
                if (temp != null)
                    ViewBag.ThongBao = "Tài khoản đã có người đăng ký";
            }
            string sMatKhau2 = f.Get("txtMatKhau2").ToString();

            if (kh.MatKhau == "" || sMatKhau2 == "")
            {
                ViewBag.ThongBao = "Mật khẩu không được để trống!";
                return View();
            }
            if (kh.MatKhau != sMatKhau2)
            {
                ViewBag.ThongBao = "Mật khẩu không trùng khớp!";
                return View();
            }

            repository.Insert(kh);
            repository.Save();
            return View();*/
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

        //tạo partial đăng nhập
        public ActionResult DangKyPartial()
        {
            if (kh == null)
                ViewBag.TenTaiKhoan = "Đăng Ký";

            return PartialView();
        }

        public ActionResult Logout()
        {
            if (kh == null)
            {
                Response.StatusCode = 404;
                return null;
            }

            kh = null;
            Session.Clear();

            return RedirectToAction("Index", "Home");

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
        //Chỉnh sửa sản phẩm
        [HttpGet]
        public ActionResult ChinhSua(int MaDonHang)
        {
            //Lấy ra đối tượng sách theo mã 
            DonHang dh = db.DonHangs.SingleOrDefault(n => n.MaDonHang == MaDonHang);
            List<ChiTietDonHang> ctdh = db.ChiTietDonHangs.Where(n => n.MaDonHang == MaDonHang).ToList();
            if (dh == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            return View(ctdh);
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ChinhSua(List<ChiTietDonHang> ctdh, FormCollection f)
        {
            //Thêm vào cơ sở dữ liệu
            if (ModelState.IsValid)
            {
                //foreach (var item in ctdh)
                //{
                //    //Thực hiện cập nhận trong model
                //    db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                //    db.SaveChanges();
                //}
            }
            return RedirectToAction("LichSuMuaHang");

        }
        //Hiển thị sản phẩm
        public ActionResult ThanhToan(int MaDonHang)
        {

            //Lấy ra đối tượng sách theo mã 
            db.DonHangs.SingleOrDefault(n => n.MaDonHang == MaDonHang).DaThanhToan = "Xong";
            db.DonHangs.SingleOrDefault(n => n.MaDonHang == MaDonHang).TinhTrangGiaoHang = 1;
            db.SaveChanges();
            DonHang dh = db.DonHangs.SingleOrDefault(n => n.MaDonHang == MaDonHang);
            if (dh == null)
            {
                Response.StatusCode = 404;
                return null;
            }

            return RedirectToAction("LichSuMuaHang");

        }
        //Xóa sản phẩm
        [HttpGet]
        public ActionResult Xoa(int MaDonHang)
        {
            //Lấy ra đối tượng sách theo mã 
            DonHang dh = db.DonHangs.SingleOrDefault(n => n.MaDonHang == MaDonHang);
            if (dh == null)
            {
                Response.StatusCode = 404;
                return null;
            }

            return View(dh);
        }
        [HttpPost, ActionName("Xoa")]

        public ActionResult XacNhanXoa(int MaDonHang)
        {
            DonHang dh = db.DonHangs.SingleOrDefault(n => n.MaDonHang == MaDonHang);
            if (dh == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            List<ChiTietDonHang> lstctdh = db.ChiTietDonHangs.Where(n => n.MaDonHang == MaDonHang).ToList();
            foreach (var item in lstctdh)
            {
                db.ChiTietDonHangs.Remove(item);
            }
            db.DonHangs.Remove(dh);
            db.SaveChanges();
            return RedirectToAction("LichSuMuaHang");

        }
    }
}