using Microsoft.JSInterop;
using System.Text.Json.Serialization;

namespace BlazorApp1.Options;

public class BottomSheetOptions
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public double[]? Breakpoints { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public BottomSheetEventsOptions? Events { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public bool? LightDismiss { get; set; }
}

public class BottomSheetEventsOptions
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public DotNetCallbackReference? OnDidDismiss { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public DotNetCallbackReference? OnDidShow { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public DotNetCallbackReference? OnWillDismiss { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public DotNetCallbackReference? OnWillShow { get; set; }
}