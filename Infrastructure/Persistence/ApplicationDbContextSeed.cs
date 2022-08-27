using Domain.Entities;
using Domain.ValueObjects;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        
        public static async Task SeedSampleDataAsync(ApplicationDbContext context)
        {
            if (!context.Advertisers.Any())
            {
                context.Advertisers.Add(new Advertiser
                {
                    Id=1,
                    Rut="17-1",
                    Name = "Adver1",
                    Phone="56-2232322",
                    Address="Stgo Chile Vitacura",
                    Description = "Description adver1",
                    Country =new Country()
                    {
                        Name="Chile"
                    }
                });
                context.Advertisers.Add(new Advertiser
                {
                    Id=2,
                    Rut = "23-2",
                    Name = "Adver2",
                    Phone = "56-2232322",
                    Address = "Stgo Chile Vitacura",
                    Description = "Description adver2",
                    Country = new Country()
                    {
                        Name = "Chile"
                    }

                });
                context.Advertisers.Add(new Advertiser
                {
                    Id=3,
                    Rut = "123455-7",
                    Name = "Adver3",
                    Phone = "56-2232322",
                    Address = "Stgo Chile Vitacura",
                    Description = "Description adver3",
                    Country = new Country()
                    {
                        Name = "Chile"
                    }

                });
                await context.SaveChangesAsync();
            }
        }
    }
}
