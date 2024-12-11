/** @type {import('tailwindcss').Config} */
/** this config is not actually used
 * it served to use shadcn/ui which is not compatible with tailwindcss@4.0.0-beta.3
 */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            colors: {},
        },
    },
    plugins: [require('tailwindcss-animate')],
};
