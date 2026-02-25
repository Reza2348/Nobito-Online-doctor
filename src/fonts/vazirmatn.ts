import LocalFont from "next/font/local";

export const vazirmatnLocal = LocalFont({
  src: [
    {
      path: "./IRANSansWeb_Light.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./IRANSansWeb_Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./IRANSansWeb_Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});
