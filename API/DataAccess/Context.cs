using System;
using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess;

public class Context(DbContextOptions options) : IdentityDbContext<AppUser, IdentityRole<int>, int>(options)
{
    public DbSet<Sample> Samples { get; set; }

    public DbSet<Account> Accounts { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Transfer> Transfers { get; set; }
    public DbSet<Category> Category { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<IdentityRole<int>>()
            .HasData
            (
                new IdentityRole<int>
                {
                    Id = 1,
                    Name = "Member",
                    NormalizedName = "MEMBER"
                },
                new IdentityRole<int>
                {
                    Id = 2,
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                }
            );
    }
}
