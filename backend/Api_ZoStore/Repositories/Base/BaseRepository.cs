using Api_ZoStore.Models.DataBase;
using Microsoft.EntityFrameworkCore;

namespace Api_ZoStore.Repositories.Base
{
    public class BaseRepository<T, TKey> where T : class
    {
        private readonly DataBaseContext db;

        public BaseRepository(DataBaseContext _db)
        {
            db = _db;
        }

        public virtual DbSet<T> GetTable()
        {
            return db.Set<T>();
        }

        public void Create(T entity)
        {
            GetTable().Add(entity);
            db.SaveChanges();
        }

        public bool Update(T entity)
        {
            try
            {
                GetTable().Update(entity);
                db.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public T Get(TKey key)
        {
            try
            {
                return GetTable().Find(key);
            }
            catch
            {
                return null;
            }
        }

        public bool Delete(TKey key)
        {
            try
            {
                var keyDelete = GetTable().Find(key);
                GetTable().Remove(keyDelete);
                db.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public List<T> GetAll()
        {
            return GetTable().ToList();
        }

    }
}

