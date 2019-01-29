namespace ToWas.API.Models
{
    public class ItineraryModel
    {
        public int Order { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
    }
}
