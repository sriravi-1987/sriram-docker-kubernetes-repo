using ShopSphere.API.Entities;

namespace ShopSphere.API.Repositories
{
    public class InMemoryProductRepository : IProductRepository
    {
        private readonly List<Product> _products = new()
        {
            new Product
            {
                Id = Guid.NewGuid(),
                Name = "Wireless Mouse",
                Description = "Ergonomic wireless mouse",
                Price = 799.00m,
                Category = "Accessories",
                StockQuantity = 25
            },
            new Product
            {
                Id = Guid.NewGuid(),
                Name = "Mechanical Keyboard",
                Description = "RGB backlit mechanical keyboard",
                Price = 2499.00m,
                Category = "Accessories",
                StockQuantity = 15
            },
            new Product
            {
                Id = Guid.NewGuid(),
                Name = "27 Inch Monitor",
                Description = "Full HD IPS monitor",
                Price = 12999.00m,
                Category = "Monitors",
                StockQuantity = 8
            }
        };

        public Task<IEnumerable<Product>> GetAllAsync()
        {
            return Task.FromResult(_products.AsEnumerable());
        }

        public Task<Product?> GetByIdAsync(Guid id)
        {
            var product = _products.FirstOrDefault(x => x.Id == id);
            return Task.FromResult(product);
        }

        public Task<Product> AddAsync(Product product)
        {
            _products.Add(product);
            return Task.FromResult(product);
        }

        public Task<bool> UpdateAsync(Product product)
        {
            var existingProduct = _products.FirstOrDefault(x => x.Id == product.Id);
            if (existingProduct is null)
            {
                return Task.FromResult(false);
            }

            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.Category = product.Category;
            existingProduct.StockQuantity = product.StockQuantity;

            return Task.FromResult(true);
        }

        public Task<bool> DeleteAsync(Guid id)
        {
            var product = _products.FirstOrDefault(x => x.Id == id);
            if (product is null)
            {
                return Task.FromResult(false);
            }

            _products.Remove(product);
            return Task.FromResult(true);
        }
    }
}