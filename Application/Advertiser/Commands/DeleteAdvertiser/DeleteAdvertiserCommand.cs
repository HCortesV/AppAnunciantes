using Application.Common.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Entities = Domain.Entities;

namespace Application.Advertiser.Commands.DeleteAdvertiser
{
    public class DeleteAdvertiserCommand : IRequest<bool>
    {
        public int Id { get; set; }
    }

    public class DeleteAdvertiserCommandHanlder : IRequestHandler<DeleteAdvertiserCommand, bool>
    {
        private readonly IApplicationDbContext _context;

        public DeleteAdvertiserCommandHanlder(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(DeleteAdvertiserCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Advertisers.FindAsync(request.Id);

            if (entity is null)
                return false;

            _context.Advertisers.Remove(entity);

            var result = await _context.SaveChangesAsync(cancellationToken);

            return result > 0;
        }
    }
}
