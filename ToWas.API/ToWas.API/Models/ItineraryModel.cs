using ToWas.Rdf.Dtos;

namespace ToWas.API.Models
{
    public class ItineraryModel
    {
        public string Description { get; set; }
        public string DescriptionUrl { get; set; }
        public string AttractionType { get; set; }
        public string AttractionTypeUrl { get; set; }
        public string Country { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }

        public static ItineraryModel From(PinDto pinDto)
        {
            return new ItineraryModel
            {
                Description = pinDto.Description,
                DescriptionUrl = pinDto.DescriptionUrl,
                Country = pinDto.Country,
                Longitude = pinDto.Longitude,
                Latitude = pinDto.Latitude,
                AttractionTypeUrl = pinDto.AttractionTypeUrl,
                AttractionType = pinDto.AttractionType
            };
        }
    }
}
