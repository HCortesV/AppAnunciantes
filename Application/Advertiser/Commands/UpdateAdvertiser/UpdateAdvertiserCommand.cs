using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Entities = Domain.Entities;

namespace Application.Advertiser.Commands.UpdateAdvertiser
{
    public class UpdateAdvertiserCommand : IRequest<int>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Rut { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
    }

    public class CreateAdvertiserCommandHanlder : IRequestHandler<UpdateAdvertiserCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateAdvertiserCommandHanlder(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(UpdateAdvertiserCommand request, CancellationToken cancellationToken)
        {

            var entity = await _context.Advertisers.FindAsync(request.Id);

            entity.Rut = request.Rut;
            entity.Name = request.Name;
            entity.Address = request.Address;
            entity.Description = request.Description;
            entity.Phone = request.Phone;
            entity.Country =new Domain.ValueObjects.Country { Name = request.Country };

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
