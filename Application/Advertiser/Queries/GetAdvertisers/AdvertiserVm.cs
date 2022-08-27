using System;
using System.Collections.Generic;
using Entities = Domain.Entities;

namespace Application.Advertiser.Queries.GetAdvertisers
{
    public class AdvertiserVm
    {
        public IList<AdvertiserDto> Advertisers { get; set; }
    }
}
