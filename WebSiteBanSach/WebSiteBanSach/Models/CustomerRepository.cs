using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace WebSiteBanSach.Models
{
    public class CustomerRepository:ICustomerRepository
    {
        private QuanLyBanSachEntities db = null;

        public CustomerRepository()
        {
            this.db = new QuanLyBanSachEntities();
        }

        public CustomerRepository(QuanLyBanSachEntities db)
        {
            this.db = db;
        }

        public IEnumerable SelectAll()
        {
            return db.KhachHangs.ToList();
        }

        public KhachHang SelectByID(string id)
        {
            return db.KhachHangs.Find(id);
        }

        public void Insert(KhachHang obj)
        {
            db.KhachHangs.Add(obj);
        }

        public void Update(KhachHang obj)
        {
            db.Entry(obj).State = EntityState.Modified;
        }

        public void Delete(string id)
        {
            KhachHang existing = db.KhachHangs.Find(id);
            db.KhachHangs.Remove(existing);
        }

        public void Save()
        {
            db.SaveChanges();
        } 
    }
}