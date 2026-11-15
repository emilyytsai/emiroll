import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <h1 className="font-pretty -mt-1 px-6 text-2xl text-foreground/70">
        little moments from my camera roll
      </h1>
      {/* the digicam: centered in the space between the tagline and the footer */}
      <div className="flex flex-1 items-center justify-center px-6 py-8">
        {/* unoptimized: serve the original PNG as-is. Next's optimizer re-compresses to quality 75,
            which softened the camera's fine detail. */}
        <Image
          src="/camera.png"
          alt="Purple digital camera with a gingham bow strap"
          width={735}
          height={467}
          loading="eager"
          fetchPriority="high"
          unoptimized
          className="h-auto w-full max-w-2xl"
        />
      </div>
    </main>
  );
}
