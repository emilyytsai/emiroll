import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="flex justify-start px-6 pt-6 pb-0">
        <div className="flex items-center gap-3">
          <h1 className="font-pretty text-5xl">emiroll</h1>
          <Image src="/smile.png" alt="" width={46} height={46} priority className="-translate-y-2" />
        </div>
      </header>
      <p className="font-pretty -mt-1 px-6 text-2xl text-foreground/70">
        little moments from my camera roll
      </p>
    </main>
  );
}
