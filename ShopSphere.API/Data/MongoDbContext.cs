using Microsoft.Extensions.Options;
using MongoDB.Driver;
using ShopSphere.API.Entities;
using ShopSphere.API.Settings;

namespace ShopSphere.API.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;
        private readonly MongoDbSettings _settings;

        public MongoDbContext(IOptions<MongoDbSettings> options)
        {
            _settings = options.Value;

            var client = new MongoClient(_settings.ConnectionString);
            _database = client.GetDatabase(_settings.DatabaseName);
        }

        public IMongoCollection<Product> Products =>
            _database.GetCollection<Product>(_settings.ProductsCollectionName);
    }
}