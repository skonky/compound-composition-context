// import animate from "tailwindcss-animate";
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [animate],
// };
// import animate from "tailwindcss-animate";
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [animate],
// };
import config from "@adhese/ui/tailwind";

// create a config and add the content you want tailwind to scan,
// the function performs a deepmerge so you can customize the config
const tailwindConfig = config({
  content: [
    "./node_modules/@adhese/ui/dist/**/*.{cjs,js,ts,jsx,tsx,mdx}",
    "./src/**/*.{cjs,js,ts,jsx,tsx,mdx}",
  ],
});

export default tailwindConfig;
