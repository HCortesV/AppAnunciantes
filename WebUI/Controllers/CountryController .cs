using Application.Advertiser.Commands.CreateAdvertiser;
using Application.Advertiser.Commands.DeleteAdvertiser;
using Application.Advertiser.Commands.UpdateAdvertiser;
using Application.Advertiser.Queries.GetAdvertisers;
using Application.Country.Queries.GetCountries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Controllers
{
    public class CountryController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<CountryVm>> Get()
        {
            return await Mediator.Send(new GetCountriesQuery());
        }
    }
}
