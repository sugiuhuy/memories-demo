/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  future: { hoverOnlyWhenSupported: true },
  theme: {
    screens: { sm: "375px", md: "700px", lg: "858px" },
    extend: {
      width: {
        xs: "270px",
        sm: "320px",
        md: "472px",
        lg: "632px",
        xl: "720px",
        "2xl": "1024px",
      },
      maxWidth: {
        xs: "270px",
        sm: "320px",
        md: "472px",
        lg: "632px",
        xl: "720px",
        "2xl": "1024px",
      },
      height: {
        xs: "270px",
        sm: "320px",
        md: "472px",
        lg: "572px",
        xl: "632px",
        "2xl": "720px",
        "3xl": "1024px",
      },
      maxHeight: {
        xs: "270px",
        sm: "320px",
        md: "472px",
        lg: "532px",
        xl: "632px",
        "2xl": "720px",
        "3xl": "1024px",
      },
      boxShadow: {
        ex: "0px 10px 10px -10px rgba(0, 0, 0, 0.75)",
      },
      colors: {},
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      aspectRatio: { landscape: "16 / 9", potrait: "9 / 16" },
      rotate: { 225: "225deg", 270: "270deg" },
      keyframes: {
        "image-animated": {
          from: { transform: "translate3d(0px, 0, 0)" },
          to: { transform: "translate3d(-100%, 0, 0)" },
        },
        "spinner-rotate-animated": {
          "100%": { transform: "rotate(360deg)" },
        },
        "spinner-dash-animated": {
          "0%": { "stroke-dasharray": "1, 200", "stroke-dashoffset": "0" },
          "50%": { "stroke-dasharray": "89, 200", "stroke-dashoffset": "-35px" },
          "100%": { "stroke-dasharray": "89, 200", "stroke-dashoffset": "-124px" },
        },
        "toas-show": {
          "0%": { transform: "translateX(100%)" },
          "40%": { transform: "translateX(-5%)" },
          "80%": { transform: "translateX(1rem)" },
          "100%": { transform: "translateX(0)" },
        },
        "toast-hide": {
          "0%": { transform: "translateX(0)" },
          "40%": { transform: "translateX(-5%)" },
          "80%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(105%)" },
        },
        "element-appear-from-top": {
          "0%": { opacity: 0, transform: "translateY(-105%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "element-appear-from-bottom": {
          "0%": { opacity: 0, transform: "translateY(105%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "element-appear-zoom-out": {
          "0%": { opacity: 0, transform: "scale(1.1)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "element-appear-zoom-in": {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "video-playing": {
          "0%": { opacity: 1, scale: "1" },
          "100%": { opacity: 0, scale: "2" },
        },
        "video-paused": {
          "0%": { opacity: 0, scale: "2" },
          "100%": { opacity: 1, scale: "1" },
        },
        "full-rotate": {
          "0%": { transform: "rotate(0)" },
          "100%": { transform: "rotate(360deg)" },
        },
        tilt: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(15deg)" },
          "75%": { transform: "rotate(-5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        sprite: "image-animated var(--sprite-speed) steps(var(--sprite-frames)) infinite",
        reaction: "image-animated var(--reaction-speed) steps(var(--reaction-frames)) infinite",
        "spinner-rotate": "spinner-rotate-animated 2s linear infinite",
        "spinner-dash": "spinner-dash-animated 1.5s ease-in-out infinite",
        "toas-show": "toas-show 0.3s ease forwards",
        "toast-hide": "toast-hide 0.3s ease forwards",
        "from-top": "element-appear-from-top 0.3s ease forwards",
        "from-bottom": "element-appear-from-bottom 0.3s ease forwards",
        "zoom-out": "element-appear-zoom-out 0.3s ease forwards",
        "zoom-in": "element-appear-zoom-in 0.3s ease forwards",
        "video-playing": "video-playing 0.3s ease forwards",
        "video-paused": "video-paused 0.3s ease forwards",
        "theme-full-rotate": "full-rotate 15s linear infinite",
        "theme-tilt": "tilt 5s linear infinite",
      },
    },
  },
  plugins: [],
};
