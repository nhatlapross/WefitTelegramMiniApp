const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    './app/**/*.{html,js,tsx}',
    './components/**/*.{html,js,tsx}',
  ],
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            surface: "#010B14",
            primary: "#FF4800",
            secondary: "#FFF0EB",
            white: "#FFFFFF",
            primaryContainer: "#521400",
            primaryText: "#140500",
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            default: "#18181b",
            surface: "#010B14",
            primary: "#FF4800",
            secondary: "#FFF0EB",
            white: "#FFFFFF",
            primaryContainer: "#521400",
            primaryText: "#140500",
           
          },
        },
      },
    }),
  ],
};