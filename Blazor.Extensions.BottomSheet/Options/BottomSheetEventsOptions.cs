using Microsoft.JSInterop;
using System.Text.Json.Serialization;

namespace Blazor.Extensions.BottomSheet.Options;

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