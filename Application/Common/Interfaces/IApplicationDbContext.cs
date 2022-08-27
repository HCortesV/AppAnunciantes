using Entities = Domain.Entities;
using ValueObjects = Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Entities.Advertiser> Advertisers { get; set; }

        DbSet<ValueObjects.Country> Countries { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
