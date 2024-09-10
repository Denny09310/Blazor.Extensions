using System.Text.Json.Serialization;

namespace Blazor.Extensions.Refresher.Options;

public class RefresherOptions
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public RefresherEventsOptions? Events { get; set; }
}
