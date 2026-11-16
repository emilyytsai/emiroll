import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <h1 className="font-pretty -mt-1 px-6 text-2xl text-foreground/70">
        little moments
        <br className="md:hidden" />
        {" "}from my camera roll
      </h1>
      {/* the digicam: centered in the space between the tagline and the footer */}
      <div className="flex flex-1 items-center justify-center px-6">
      {/* Desktop camera */}
        <Image
          src="/camera.png"
          alt="emi's hand drawn digicam"
          width={1470}
          height={934}
          loading="eager"
          fetchPriority="high"
          unoptimized
          className="hidden h-auto w-full max-w-4xl md:block"
        />

        {/* Mobile camera */}
        <Image
          src="/camera-mobile.png"
          alt="emi's hand drawn digicam"
          width={934}
          height={1200}
          loading="eager"
          unoptimized
          className="block h-auto w-full max-w-sm md:hidden"
        />
      </div>
    </main>
  );
}
