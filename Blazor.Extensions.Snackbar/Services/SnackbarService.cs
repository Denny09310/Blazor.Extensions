using Blazor.Extensions.Snackbar.Options;

namespace Blazor.Extensions.Snackbar.Services;

public class SnackbarService : ISnackbarService
{
    public event Action? HideRequested;

    public event Action<string, SnackbarOptions?>? ShowRequested;

    public void HideSnackbar()
    {
        HideRequested?.Invoke();
    }

    public void ShowSnackbar(string message, SnackbarOptions? options = null)
    {
        ShowRequested?.Invoke(message, options);
    }
}

public interface ISnackbarService
{
    event Action HideRequested;

    event Action<string, SnackbarOptions?> ShowRequested;

    void HideSnackbar();

    void ShowSnackbar(string message, SnackbarOptions? options = null);
}