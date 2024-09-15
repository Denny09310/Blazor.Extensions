using System.Text.Json.Serialization;

namespace Blazor.Extensions.Refresher.Options;

public class RefresherOptions
{
    public string ContainerSelector { get; set; } = default!;
    public double RefreshThreshold { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public RefresherEventsOptions? Events { get; set; }
}
