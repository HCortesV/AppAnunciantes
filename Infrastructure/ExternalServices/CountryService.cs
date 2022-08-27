using Application.Common.Interfaces;
using Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.ExternalServices
{
    public class CountryService : ICountryService
    {
        public CountryService() { 
            
        }
        public async Task<IList<Country>> SearchCountriesAsync()
        {
            List<Country> countries = new List<Country>();

            countries.Add(new Country { CountryCode = "cl", Name = "Chile" });
            countries.Add(new Country { CountryCode = "ar", Name = "Argentina" });
            countries.Add(new Country { CountryCode = "mx", Name = "Mexico" });
            countries.Add(new Country { CountryCode = "co", Name = "Colombia" });
            countries.Add(new Country { CountryCode = "pe", Name = "Perú" });

            return await Task.FromResult(countries);
        }
    }
}
