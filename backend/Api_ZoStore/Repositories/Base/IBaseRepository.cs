namespace Api_ZoStore.Repositories.Base
{
    public interface IBaseRepository<T, TKey>
    {
        public void Create(T entity);

        public bool Update(T entity);

        public T Get(TKey key);

        public bool Delete(TKey key);

        public bool DeleteComposite(T value);

        public List<T> GetAll();

    }
}
