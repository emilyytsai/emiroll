import { ViewTransition } from "react";
import { Digicam } from "@/components/digicam";

export default function Home() {
  return (
    // crossfades this page in/out when navigating between the digicam and
    // the gallery (the header and footer stay put)
    <ViewTransition>
      <main className="flex flex-1 flex-col">
        <h1 className="font-pretty -mt-1 px-6 text-2xl leading-[24px] text-foreground/70 md:leading-8">
          little moments
          <br className="md:hidden" /> from my camera roll
        </h1>
        {/* the digicam: centered in the space between the tagline and the footer */}
        <div className="flex flex-1 items-center justify-center px-2 md:px-6">
          <Digicam />
        </div>
      </main>
    </ViewTransition>
  );
}
