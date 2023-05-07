
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        150: "150px",
        190: "190px",
        225: "225px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        375: "375px",
        460: "460px",
        656: "656px",
        880: "880px",
        508: "508px",
        "90%":"90%",
        "80%":"80%",
        "70%":"70%",
      },
      height: {
        80: "80px",
        150: "150px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        650: "650px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      minWidth: {
        210: "210px",
        350: "350px",
        620: "620px",
      },
      screens: {
        xsm:"300px",
        sm: "390px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        headingColor: "#2e2e2e",
        textColor: "#515151",
        cartNumBg: "#e80013",
        primary: "#f5f3f3",
        cardOverlay: "rgba(256,256,256,0.4)",
        lighttextGray: "#9ca0ab",
        card: "rgba(256,256,256,0.8)",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
        transOut:"#D3D3D3",
        transBody:"#E5E4E2",
        unselectButton:"#E5E4E2",
        layoutHeading:"#f6d751",
        layoutBg:"#2a2c39",
        fooxtBlack:"#2a2c39",
        fooxtYellow:"#f6d751",
        fooxtGreen:"#20ae2f"
      },
      fontSize: {
      
        sm: '0.8rem',
        base: '1rem',
        baselg:'1.1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        '6xl':'4rem',
        'title':'6rem',
      },
      backgroundImage: {
        'mobile': "url('./img/mobile-frame-transparent.png')",
        'gear1':"url('./img/gear-1.jpg')"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
]
};
