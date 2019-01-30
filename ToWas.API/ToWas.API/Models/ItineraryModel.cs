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
    }
}
