/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "profile-inner": "inset 0px 4px 11px 0px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        pretendard: ["Pretendard-Regular"], //기본 폰트
        jalnan: ["yg-jalnan", "sans-serif"], //포인트 폰트
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
