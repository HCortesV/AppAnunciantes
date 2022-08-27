using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Entities = Domain.Entities;

namespace Application.Advertiser.Commands.CreateAdvertiser
{
    public class CreateAdvertiserCommand : IRequest<int>
    {

        public string Name { get; set; }
        public string Rut { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
    }

    public class CreateAdvertiserCommandHanlder : IRequestHandler<CreateAdvertiserCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateAdvertiserCommandHanlder(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateAdvertiserCommand request, CancellationToken cancellationToken)
        {

            var entity = new Entities.Advertiser
            {
                Rut = request.Rut,
                Name = request.Name,
                Description = request.Description,
                Address = request.Address,
                Phone = request.Phone,
                Country = new Domain.ValueObjects.Country() { Name = request.Country}
            };

            _context.Advertisers.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
