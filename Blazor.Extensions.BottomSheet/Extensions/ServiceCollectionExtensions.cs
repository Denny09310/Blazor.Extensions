using Blazor.Extensions.BottomSheet.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Blazor.Extensions.BottomSheet;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddBottomSheet(this IServiceCollection services)
    {
        return services.AddScoped<IBottomSheetService, BottomSheetService>();
    }
}
