/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "custom-gray": "#f0f0f0",
        "dark-gray": "#333",
        "info-gray": "#666",
        "border-gray": "#ddd",
      },
      borderRadius: {
        sm: "5px",
        xl: "10px",
      },
      borderWidth: {
        DEFAULT: "1px",
      },
      spacing: {
        2: "8px",
        2.5: "10px",
      },
    },
  },
  plugins: [],
};
