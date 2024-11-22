// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      bai_jamjuree: ["Bai Jamjuree", "sans-serif"],
      sf_pro_display: ["SF Pro Display", "sans-serif"],
      sf_pro_text: ["SF Pro Text", "sans-serif"],
    },
    extend: {
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semi_bold: "600",
        bold: "700",
        extra_bold: "800",
        black: "900",
      },
      colors: {
        primary: "#172554",
        secondary: "#EDF3FF",
        orange: "#F4A120"
      },
    },
  },
  plugins: [],
};
