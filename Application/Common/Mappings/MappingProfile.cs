using Application.Advertiser.Queries.GetAdvertisers;
using Application.Country.Queries.GetCountries;
using AutoMapper;
using Entities = Domain.Entities;

namespace Application.Common.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMapAdvertiser();
        }

        private void CreateMapAdvertiser()
        {
            CreateMap<Entities.Advertiser, AdvertiserDto>()
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Rut, opt => opt.MapFrom(s => s.Rut))
                .ForMember(d => d.Description, opt => opt.MapFrom(d => d.Description))
                .ForMember(d=>d.Address, opt => opt.MapFrom(d => d.Address))
                .ForMember(d=>d.Country, opt => opt.MapFrom(d => d.Country.Name))
                ;

            CreateMap<Domain.ValueObjects.Country, CountryDto>();
        }
    }
}