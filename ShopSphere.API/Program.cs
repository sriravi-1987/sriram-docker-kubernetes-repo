using ShopSphere.API.Data;
using ShopSphere.API.Repositories;
using ShopSphere.API.Settings;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Read configuration flag
var useInMemory = builder.Configuration.GetValue<bool>("UseInMemory");

// MongoDB configuration
builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection(MongoDbSettings.SectionName));

builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<MongoDbInitializer>();

// Repository registration based on config
if (useInMemory)
{
    builder.Services.AddSingleton<IProductRepository, InMemoryProductRepository>();
}
else
{
    builder.Services.AddScoped<IProductRepository, MongoProductRepository>();
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// MongoDB initialization + seed data only when MongoDB is used
if (!useInMemory)
{
    using var scope = app.Services.CreateScope();
    var initializer = scope.ServiceProvider.GetRequiredService<MongoDbInitializer>();
    await initializer.InitializeAsync();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngularClient");

// app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();
app.Run();