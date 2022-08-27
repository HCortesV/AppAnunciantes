using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Advertiser.Queries.GetAdvertisers
{
    public class GetAdvertisersQuery: IRequest<AdvertiserVm>
    {
    }

    public class AdvertiserQueryHandler : IRequestHandler<GetAdvertisersQuery, AdvertiserVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        public AdvertiserQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }
        public async Task<AdvertiserVm> Handle(GetAdvertisersQuery request, CancellationToken cancellationToken)
        {
            var advertisers = await _context.Advertisers
                       .AsNoTracking()
                       .ProjectTo<AdvertiserDto>(_mapper.ConfigurationProvider)
                       .OrderBy(t => t.Name)
                       .ToListAsync(cancellationToken);
            return new AdvertiserVm
            {
               Advertisers=advertisers
            };
        }
    }
}
