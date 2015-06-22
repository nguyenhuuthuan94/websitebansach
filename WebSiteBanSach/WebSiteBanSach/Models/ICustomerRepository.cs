using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebSiteBanSach.Models
{
    public interface ICustomerRepository
    {
        IEnumerable SelectAll(); //Trả về tất cả các dòng trong Customer kiểu Enumerable
        KhachHang SelectByID(string id); //Trả về Customer theo id nhận vào.
        void Insert(KhachHang obj); //Có đối số là một object và Insert vào Customers DbSet.
        void Update(KhachHang obj);//Có đối số là một object và thực hiện Edit vào Customers DbSet
        void Delete(string id);//Xóa Customer theo id.
        void Save(); //Lưu lại các thay đổi trong cơ sở dữ liệu
    }
}