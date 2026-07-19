using MongoDB.Driver;
using ShopSphere.API.Data;
using ShopSphere.API.Entities;

namespace ShopSphere.API.Repositories
{
    public class MongoProductRepository : IProductRepository
    {
        private readonly IMongoCollection<Product> _products;

        public MongoProductRepository(MongoDbContext context)
        {
            _products = context.Products;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            var products = await _products
                .Find(Builders<Product>.Filter.Empty)
                .ToListAsync();

            return products;
        }

        public async Task<Product?> GetByIdAsync(Guid id)
        {
            return await _products
                .Find(x => x.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<Product> AddAsync(Product product)
        {
            if (product.Id == Guid.Empty)
            {
                product.Id = Guid.NewGuid();
            }

            await _products.InsertOneAsync(product);
            return product;
        }

        public async Task<bool> UpdateAsync(Product product)
        {
            var result = await _products.ReplaceOneAsync(
                x => x.Id == product.Id,
                product);

            return result.MatchedCount > 0;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var result = await _products.DeleteOneAsync(x => x.Id == id);
            return result.DeletedCount > 0;
        }
    }
}