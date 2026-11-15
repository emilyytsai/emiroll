import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "gallery · emiroll",
};

export default function Gallery() {
  return (
    <main className="flex flex-1 flex-col">
      <h1 className="font-pretty -mt-1 px-6 text-2xl text-foreground/70">
        a whole lot of little moments
      </h1>
    </main>
  );
}
