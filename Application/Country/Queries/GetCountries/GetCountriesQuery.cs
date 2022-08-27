using Application.Common.Interfaces;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Country.Queries.GetCountries
{
    public class GetCountriesQuery:IRequest<CountryVm>
    {
    }

    public class CountriesQueryHandler : IRequestHandler<GetCountriesQuery, CountryVm>
    {
        private readonly ICountryService _service;
        private readonly IMapper _mapper;
        public CountriesQueryHandler(ICountryService context, IMapper mapper)
        {
            this._service = context;
            this._mapper = mapper;
        }
        public async Task<CountryVm> Handle(GetCountriesQuery request, CancellationToken cancellationToken)
        {
            var countries = await _service.SearchCountriesAsync();
            List<CountryDto> listCountries = _mapper.Map<IList<Domain.ValueObjects.Country>, List<CountryDto>>(countries);
            return new CountryVm
            {
                Countries = listCountries
            };
        }
    }
}
