using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess;


public class DbInitializer
{
    public static async Task Initialize(WebApplication app)
    {
        // Uygulama başlatıldığında veritabanını oluştur ve örnek veriler ekle
        using var scope = app.Services.CreateScope();
        // Database erişimi için 
        var context = scope.ServiceProvider.GetRequiredService<Context>() ?? throw new InvalidOperationException("Database context not found");

        // UserManager erişimi için
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>() ?? throw new InvalidOperationException("UserManager not found");

        await SeedData(context, userManager);

    }

    private static async Task SeedData(Context context, UserManager<AppUser> userManager)
    {
        // Veritabanı var mı kontrol et yoksa oluştur
        context.Database.Migrate();

        if (!userManager.Users.Any())
        {
            var user = new AppUser
            {
                UserName = "member@test.com",
                Email = "member@test.com"
            };
            await userManager.CreateAsync(user, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user, "Member");

            var admin = new AppUser
            {
                UserName = "admin@test.com",
                Email = "admin@test.com"
            };
            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, ["Admin", "Member"]);
        }

        if (!context.Category.Any())
        {
            var loan = new Category
            {
                Name = "Loan"
            };
            await context.Category.AddAsync(loan);

            var food = new Category
            {
                Name = "Food & Groceries"
            };
            await context.Category.AddAsync(food);


            var transport = new Category
            {
                Name = "Transportation"
            };
            await context.Category.AddAsync(transport);

            var health = new Category
            {
                Name = "Health"
            };
            await context.Category.AddAsync(health);

            var education = new Category
            {
                Name = "Education"
            };
            await context.Category.AddAsync(education);

            var other = new Category
            {
                Name = "Other"
            };
            await context.Category.AddAsync(other);

        }


        // Veritabanına değişiklikleri kaydet
        try
        {
            context.SaveChanges();
        }
        catch (Exception ex)
        {
            throw new Exception("Error seeding data: " + ex.Message);
        }

    }
}
