/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        ease: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
      },
      transitionDuration: {
        ".25": "0.25s",
        ".2": "0.2s",
      },

      colors: {
        "primary-yellow": "#f6c90e",
        "bg-item": "#E1E7ED",
        "bg-bt": "#eee",
        "des-color": "#777",
        "primary-black":"#303841"
      },
      dropShadow: {
        filter: "0 30px 20px rgba(0,0,0,.2)",
      },
      zIndex: {
        temp: "-1",
      },
      skew: {
        8: "8deg",
      },
      borderRadius: {
        perfect: "100%",
      },
      width: {
        maxx: "300%",
      },
      animation: {
        "up-down": "up_down 8s ease-in-out infinite alternate",
      },
      keyframes: {
        up_down: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      boxShadow: {
        primary:
          "0 3.2px 2.2px rgba(0,0,0,.02), 0 7px 5.4px rgba(0,0,0,.028), 0 12.1px 10.1px rgba(0,0,0,.035), 0 19.8px 18.1px rgba(0,0,0,.042), 0 34.7px 33.8px rgba(0,0,0,.05), 0 81px 81px rgba(0,0,0,.07)",
      },
    },
    fontFamily: {
      rubik: ["Rubik", "sans-serif"],
    },
  },
  plugins: [],
};
