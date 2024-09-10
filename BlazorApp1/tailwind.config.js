/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./**/*.{razor,html,cshtml,scss}",
        "../Blazor.Extensions.BottomSheet/**/*.{razor,html,cshtml,scss}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwind-scrollbar-hide')
    ],
}

