// the photos shown on the digicam's screen, in order (files live in /public).
// they're imported rather than referenced by path so each one's URL carries a
// hash of the file: replace a photo (same name, new picture) and the site
// picks it up right away instead of serving a cached copy of the old one.
// to add a photo: drop it in /public, import it below, and add a line.
import type { StaticImageData } from "next/image";

import img1 from "../../public/1.jpg";
import img2 from "../../public/2.jpg";
import img3 from "../../public/3.jpg";
import img4 from "../../public/4.jpg";
import img5 from "../../public/5.jpg";
import img6 from "../../public/6.jpg";
import img7 from "../../public/7.jpg";
import img8 from "../../public/8.jpg";
import img9 from "../../public/9.jpg";
import img10 from "../../public/10.jpg";
import img11 from "../../public/11.jpg";
import img12 from "../../public/12.jpg";

// caption: one short line, or "" for none.
// color: any CSS color for that caption ("#e8a0bf", "hotpink", "rgb(...)"),
// or "" to use the default text color.
//
// optional, for the /gallery grid (leave out to let it pick from the photo):
// span: "big" | "wide" | "tall" | "standard" (card size)
// layout: "overlay" (caption on the photo) | "split" (caption block below)
// tag: small label shown with the caption, e.g. "nov 2026" or "friends"
export type Photo = {
  src: StaticImageData;
  caption: string;
  color?: string;
  span?: "big" | "wide" | "tall" | "standard";
  layout?: "overlay" | "split";
  tag?: string;
};

export const PHOTOS: Photo[] = [
  { src: img1, caption: "matcha & photobooth", color: "#729c79" },
  { src: img2, caption: "1st time in san fran!", color: "#b0704c" },
  { src: img3, caption: "22nd bday dinner", color: "#b8a170" },
  { src: img4, caption: "node buds family @ the beach", color: "#f57a07" },
  { src: img5, caption: "mammoth w/ the bestie", color: "#556f9e" },
  { src: img6, caption: "tabling for doordash <3", color: "#bd2424" },
  { src: img7, caption: "post panchiko concert", color: "#242491" },
  { src: img8, caption: "digicam selfie :)", color: "#c76574" },
  { src: img9, caption: "my game dev team :D", color: "#633b31" },
  { src: img10, caption: "more photobooth pics", color: "#6b2024" },
  { src: img11, caption: "halloween party 2026", color: "#6b8fe3" },
  { src: img12, caption: "i love vgdc!", color: "#3c4aa3" },
];
