using System;

namespace WebAPI.Models
{
    public class SachModel
    {
        public int MaSach { get; set; }
        public string TenSach { get; set; }
        public Nullable<decimal> GiaBan { get; set; }
        public string MoTa { get; set; }
        public Nullable<System.DateTime> NgayCapNhat { get; set; }
        public string AnhBia { get; set; }
        public Nullable<int> SoLuongTon { get; set; }
        public Nullable<int> MaChuDe { get; set; }
        public Nullable<int> MaNXB { get; set; }
        public Nullable<int> Moi { get; set; }
    }
}