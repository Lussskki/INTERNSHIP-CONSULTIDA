module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      "11rem": "11rem",
      "6rem": "6rem",
    },
    fontFamily: {
      Ingiri: ["Ingiri"],
      Mtavruli: ["Mtavruli"],
      Roboto: ["Roboto"],
      Rosario: ["Rosario"],
      BPGExcelsior: ["BPGExcelsior"],
      BPGArialCaps: ["BPGArialCaps"],
      BPGArial: ["BPGArial"],
    },
    extend: {
      width: {
        "slider-36": "36%",
        "75%": "70%",
        "50%": "50%",
        "50rem": "50rem",
        "90%": "90%",
        "96%": "96%",
        "80%": "80%",
      },
      height: {
        header: "88px",
        slideHeight: "500px",
        slideHeightMd: "300px",
      },
      colors: {
        textColor: "#374251",
        gray: "#333333",
        graySecondary: "#5F5F5F",
        silver: "#B0B0B0",
        grayTilt: "#F3F6FA",
        menuItem: "#373F41",
        loginHover: "#8A7CB6",
        footerBg: "#373F41",
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
        "lg-max": { max: "1024px" },
        "sm-max": { max: "768px" },
        "xl-max": { max: "1172px" },
      },
    },
  },
  variants: {
    extend: {
      lineClamp: ["hover"],
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#8789BF",
          "primary-focus": "#008DD0",
          "primary-hover": "#8789BF",
          "primary-content": "#ffffff",

          neutral: "#3d4451" /* Neutral color */,
          "neutral-focus": "#2a2e37" /* Neutral color - focused */,
          "neutral-content":
            "#ffffff" /* Foreground content color to use on neutral color */,

          "base-100":
            "#ffffff" /* Base color of page, used for blank backgrounds */,
          "base-200": "#f9fafb" /* Base color, a little darker */,
          "base-300": "#d1d5db" /* Base color, even more darker */,
          "base-content": "#1f2937",

          info: "#2094f3" /* Info */,
          success: "#009485" /* Success */,
          warning: "#ff9900" /* Warning */,
          error: "#ff5724",
        },
      },
    ],
  },
};
