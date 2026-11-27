import type { Metadata } from "next";
import { PhotoGrid } from "@/components/photo-grid";

export const metadata: Metadata = {
  title: "gallery · emiroll",
};

export default function Gallery() {
  return (
    <main className="font-pretty flex flex-1 flex-col">
      <h1 className="-mt-1 px-6 text-2xl text-foreground/70">
        a whole lot of little moments
      </h1>
      <section className="px-6 pt-6 pb-12">
        <PhotoGrid />
      </section>
    </main>
  );
}
