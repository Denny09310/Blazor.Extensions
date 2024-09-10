using Microsoft.JSInterop;
using System.Text.Json.Serialization;

namespace Blazor.Extensions.Refresher.Options;

public class RefresherEventsOptions
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public DotNetCallbackReference? OnRefresh { get; set; }
}