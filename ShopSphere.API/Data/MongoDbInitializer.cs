using MongoDB.Driver;
using ShopSphere.API.Entities;

namespace ShopSphere.API.Data
{
    public class MongoDbInitializer
    {
        private readonly MongoDbContext _context;
        private readonly ILogger<MongoDbInitializer> _logger;

        public MongoDbInitializer(
            MongoDbContext context,
            ILogger<MongoDbInitializer> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task InitializeAsync()
        {
            await CreateIndexesAsync();
            await SeedProductsAsync();
        }

        private async Task CreateIndexesAsync()
        {
            var products = _context.Products;

            var categoryIndex = new CreateIndexModel<Product>(
                Builders<Product>.IndexKeys.Ascending(x => x.Category));

            var nameIndex = new CreateIndexModel<Product>(
                Builders<Product>.IndexKeys.Ascending(x => x.Name));

            await products.Indexes.CreateManyAsync(new[]
            {
                categoryIndex,
                nameIndex
            });

            _logger.LogInformation("MongoDB indexes ensured successfully.");
        }

        private async Task SeedProductsAsync()
        {
            var products = _context.Products;

            var count = await products.CountDocumentsAsync(Builders<Product>.Filter.Empty);
            if (count > 0)
            {
                _logger.LogInformation("MongoDB seed skipped because products already exist.");
                return;
            }

            var seedProducts = new List<Product>
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

            await products.InsertManyAsync(seedProducts);

            _logger.LogInformation("MongoDB seed data inserted successfully.");
        }
    }
}