using API.DataAccess;
using API.Entity;
using API.Middlewares;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddCors();


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<Context>(
    options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

// builder.Services.sql


builder.Services.AddIdentityApiEndpoints<AppUser>(opt =>
{
    opt.User.RequireUniqueEmail = true;
}).AddRoles<IdentityRole<int>>()
  .AddEntityFrameworkStores<Context>();


builder.Services.AddTransient<ExceptionMiddleware>();
// builder.Services.AddScoped<IbanVerificationService>();
builder.Services.AddHttpClient<IbanVerificationService>();

// builder.Services.AddScoped<ISampleDal, EfSampleDal>();
// builder.Services.AddScoped<ISampleService, SampleManager>();

// // builder.Services.AddScoped<IAccountDal, EfAccountDal>();
// // builder.Services.AddScoped<IAccountService, AccountManager>();

// builder.Services.AddScoped<ITransactionDal, EfTransactionDal>();
// builder.Services.AddScoped<ITransactionService, TransactionManager>();

// builder.Services.AddScoped<ITransferDal, EfTransferDal>();
// builder.Services.AddScoped<ITransferService, TransferManager>();



var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseMiddleware<ExceptionMiddleware>();

app.UseCors(options => options
            .WithOrigins(["http://localhost:5173", "https://localhost:5173"])
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            );

app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<AppUser>(); // api/users şeklinde tüm user endpointleri oluşturur.

await DbInitializer.Initialize(app);

app.Run();
