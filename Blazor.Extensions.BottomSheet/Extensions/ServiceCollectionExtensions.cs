using Blazor.Extensions.BottomSheet.Services;

namespace Microsoft.Extensions.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddBottomSheet(this IServiceCollection services)
    {
        return services.AddScoped<IBottomSheetService, BottomSheetService>();
    }
}
