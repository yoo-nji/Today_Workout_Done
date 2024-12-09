/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "profile-inner": "inset 0px 4px 11px 0px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        jua: ["Jua", "sans-serif"],
        dohyeon: ["Do Hyeon", "sans-serif"],
        jalnan: ["yg-jalnan", "sans-serif"],
        gowun: ["Gowun Dodum", "sans-serif"],
        ibm: ["IBM Plex Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
