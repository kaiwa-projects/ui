/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
    content: ["./src/**/*.{js,ts,mdx,svelte}", "./src/**/*.stories.svelte"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Noto Sans KR", ...defaultTheme.fontFamily.sans]
            }
        }
    },
    plugins: []
};
