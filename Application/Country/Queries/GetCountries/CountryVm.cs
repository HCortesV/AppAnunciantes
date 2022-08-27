using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Country.Queries.GetCountries
{
    public class CountryVm
    {
        public IList<CountryDto> Countries { get; set; }
    }
}
