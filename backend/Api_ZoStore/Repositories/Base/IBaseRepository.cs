namespace Api_ZoStore.Repositories.Base
{
    public interface IBaseRepository<T, TKey>
    {
        public void Create(T entity);

        public bool Update(T entity);

        public T Get(TKey key);

        public bool Delete(TKey key);

        public List<T> GetAll();

    }
}
