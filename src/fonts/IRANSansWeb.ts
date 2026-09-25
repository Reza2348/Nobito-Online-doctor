import LocalFont from "next/font/local";

export const IRANSansWebLocal = LocalFont({
  src: [
    {
      path: "./IRANSansWeb_Light.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./IRANSansWeb_Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./IRANSansWeb_Bold.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});
