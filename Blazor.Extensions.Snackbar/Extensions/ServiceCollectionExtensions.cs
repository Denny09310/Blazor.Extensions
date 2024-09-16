using Blazor.Extensions.Snackbar.Services;

namespace Microsoft.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddSnackbar(this IServiceCollection services)
    {
        return services.AddScoped<ISnackbarService, SnackbarService>();
    }
}
