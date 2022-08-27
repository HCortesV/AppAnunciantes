using Application.Advertiser.Commands.CreateAdvertiser;
using Application.Advertiser.Commands.DeleteAdvertiser;
using Application.Advertiser.Commands.UpdateAdvertiser;
using Application.Advertiser.Queries.GetAdvertisers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebUI.Controllers
{
    public class AdvertiserController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<AdvertiserVm>> Get()
        {
            return await Mediator.Send(new GetAdvertisersQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdvertiserDto>> Get(int id)
        {
            return await Mediator.Send(new GetAnAdvertiserQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateAdvertiserCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<int>> Update(int id,[FromBody]UpdateAdvertiserCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return await Mediator.Send(new DeleteAdvertiserCommand
            {
                Id = id
            });
        }
    }
}
