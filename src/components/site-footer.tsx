import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="font-pretty mt-8 flex flex-col items-center gap-2 py-6 text-center text-lg text-foreground/50">
      {/* signature is white on transparent so invert to make it dark for the light bg */}
      <Image
        src="/signature.png"
        alt="Emily Tsai signature"
        width={256}
        height={208}
        className="h-auto w-20 opacity-70 invert sm:w-24 md:w-28"
      />
      <p>© 2026 Emily Tsai</p>
    </footer>
  );
}
