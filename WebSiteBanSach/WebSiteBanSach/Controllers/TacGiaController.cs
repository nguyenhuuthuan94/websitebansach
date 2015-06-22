using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebSiteBanSach.Models;

namespace WebSiteBanSach.Controllers
{
    public class TacGiaController : Controller
    {
        //
        // GET: /NhaXuatBanPartial/
        QuanLyBanSachEntities db = new QuanLyBanSachEntities();
        public PartialViewResult TacGiaPartial()
        {
            return PartialView(db.TacGias.Take(10).OrderBy(x => x.TenTacGia).ToList());
        }
        //Hiển thị sách theo tác giả 
        public ViewResult SachTheoTacGia(int MaTacGia = 0)
        {
            //Kiểm tra chủ đề tồn tại hay không
            TacGia tacgia = db.TacGias.SingleOrDefault(n => n.MaTacGia == MaTacGia);
            if (tacgia == null)
            {
                Response.StatusCode = 404;
                return null;
            }
            //Truy xuất danh sách các quyển sách theo tác giả
            List<ThamGia> lMaSach = db.ThamGias.Where(n => n.MaTacGia == MaTacGia).ToList();

            List<Sach> lstSach = new List<Sach>();
            foreach(var item in lMaSach)
            {
                List<Sach> temp = db.Saches.Where(n => n.MaSach == item.MaSach).ToList();
                lstSach.AddRange(temp);
            }

           

            if (lstSach.Count == 0)
            {
                ViewBag.Sach = "Không có sách nào thuộc chủ đề này";
            }
            //Tạo viewbag danh sách tác giả 
            ViewBag.lstTacGia = db.TacGias.ToList();
            return View(lstSach);
        }
        //Hiển thị các tác giả 
        public ViewResult DanhMucTacGia()
        {
            return View(db.TacGias.ToList());

        }
    }
}