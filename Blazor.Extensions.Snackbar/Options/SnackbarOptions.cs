using System.Text.Json.Serialization;

namespace Blazor.Extensions.Snackbar.Options;

public class SnackbarOptions
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public SnackbarOptionsEvents? Events { get; set; }
}
