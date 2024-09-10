using System.Text.Json.Serialization;

namespace Blazor.Extensions.BottomSheet.Options;

public class BottomSheetOptions
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double[]? Breakpoints { get; set; }

    [JsonIgnore]
    public BottomSheetClassesOptions Classes { get; set; } = new();

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public BottomSheetEventsOptions? Events { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double? InitialBreakpoint { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? LightDismiss { get; set; }
}