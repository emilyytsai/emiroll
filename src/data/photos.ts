// the photos shown on the digicam's screen, in order (files live in /public).
// caption: one short line, or "" for none.
// color: any CSS color for that caption ("#e8a0bf", "hotpink", "rgb(...)"),
// or "" to use the default text color.
export type Photo = { src: string; caption: string; color?: string };

export const PHOTOS: Photo[] = [
  { src: "/1.jpg", caption: "matcha & photobooth", color: "#729c79" },
  { src: "/2.jpg", caption: "1st time in san fran!", color: "#b0704c" },
  { src: "/3.jpg", caption: "22nd bday dinner", color: "#b8a170" },
  { src: "/4.jpg", caption: "node buds family @ the beach", color: "#f57a07" },
  { src: "/5.jpg", caption: "mammoth w/ the bestie", color: "#556f9e" },
  { src: "/6.jpg", caption: "digicam selfie :)", color: "#c76574" },
  { src: "/7.jpg", caption: "my game dev team :D", color: "#633b31" },
  { src: "/8.jpg", caption: "tabling for doordash <3", color: "#bd2424" },
  { src: "/9.jpg", caption: "post panchiko concert", color: "#242491" },
  { src: "/10.jpg", caption: "halloween party 2026", color: "#6b8fe3" },
  { src: "/11.jpg", caption: "more photobooth pics", color: "#6b2024" },
];
