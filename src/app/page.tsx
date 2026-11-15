import { FadeIn } from "@/components/fade-in";
import { HoverCard } from "@/components/hover-card";

const features = [
  { title: "Next.js", body: "App Router, Server Components, TypeScript." },
  { title: "Tailwind CSS", body: "Utility-first styling, v4 CSS-first config." },
  { title: "Motion", body: "Declarative animations via motion/react." },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center gap-12 px-6 py-24">
      <FadeIn>
        <h1 className="text-5xl font-bold tracking-tight">EmiRoll</h1>
        <p className="mt-4 text-lg text-foreground/70">
          Next.js + Tailwind CSS + Motion starter. Edit{" "}
          <code className="font-mono text-foreground">src/app/page.tsx</code> to begin.
        </p>
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-3">
        {features.map((f, i) => (
          <FadeIn key={f.title} delay={0.15 + i * 0.1}>
            <HoverCard {...f} />
          </FadeIn>
        ))}
      </div>
    </main>
  );
}
