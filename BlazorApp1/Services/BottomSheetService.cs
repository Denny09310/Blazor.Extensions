using BlazorApp1.Options;
using Microsoft.AspNetCore.Components;

namespace BlazorApp1.Services;

public class BottomSheetService : IBottomSheetService
{
    public event Action? HideRequested;

    public event Action<string, RenderFragment, BottomSheetOptions?>? ShowRequested;

    public void HideBottomSheet()
    {
        HideRequested?.Invoke();
    }

    public void ShowBottomSheet<T>(string title, Dictionary<string, object>? parameters = null, BottomSheetOptions? options = null) where T : IComponent
    {
        var i = 0;
        var content = new RenderFragment(builder =>
        {
            builder.OpenComponent<T>(i++);
            foreach (var (key, value) in parameters ?? [])
            {
                builder.AddComponentParameter(i++, key, value);
            }
            builder.CloseComponent();
        });

        ShowRequested?.Invoke(title, content, options);
    }
}

public interface IBottomSheetService
{
    event Action HideRequested;

    event Action<string, RenderFragment, BottomSheetOptions?> ShowRequested;

    void HideBottomSheet();

    void ShowBottomSheet<T>(string title, Dictionary<string, object>? parameters = null, BottomSheetOptions? options = null) where T : IComponent;
}