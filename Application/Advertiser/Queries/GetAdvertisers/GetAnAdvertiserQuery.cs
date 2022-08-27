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
    public class GetAnAdvertiserQuery: IRequest<AdvertiserDto>
    {
        public int Id { get; set; }
    }

    public class AnAdvertiserQueryHandler : IRequestHandler<GetAnAdvertiserQuery, AdvertiserDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        public AnAdvertiserQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }
        public async Task<AdvertiserDto> Handle(GetAnAdvertiserQuery request, CancellationToken cancellationToken)
        {
            var advertiser = await _context.Advertisers
                         .ProjectTo<AdvertiserDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(f => f.Id == request.Id, cancellationToken);

            return advertiser;
        }
    }
}
