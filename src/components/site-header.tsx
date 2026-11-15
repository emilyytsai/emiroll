import Image from "next/image";
import Link from "next/link";
import { NavLink } from "@/components/nav-link";

const LETTERS = "emiroll".split("");
// seconds between each piece starting its hop, so the wave travels left → right
const STAGGER = 0.08;
// idle: slow looping wave. hover: swap to a one-shot wave so it plays right away.
const WAVE =
  "inline-block animate-wave group-hover:animate-wave-once motion-reduce:animate-none motion-reduce:group-hover:animate-none";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-6 px-6 pt-6 pb-0">
      <Link href="/" aria-label="emiroll home" className="group">
        {/* hover lift: the whole logo rises a little and stays up while hovered. It's on this inner
            wrapper (not the link) so the hover area stays put while the logo moves. */}
        <span className="flex items-center gap-3 transition-transform duration-200 ease-out group-hover:-translate-y-1 motion-reduce:transition-none">
        {/* idle wave: each letter, then the smile, hops up and back down in turn, on a loop */}
        <span aria-hidden className="font-pretty text-5xl">
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              className={WAVE}
              style={{ animationDelay: `${i * STAGGER}s` }}
            >
              {letter}
            </span>
          ))}
        </span>
        <span
          className={WAVE}
          style={{ animationDelay: `${LETTERS.length * STAGGER}s` }}
        >
          <Image
            src="/smile.png"
            alt=""
            width={46}
            height={46}
            loading="eager"
            className="-translate-y-2"
          />
        </span>
        </span>
      </Link>
      <nav>
        <NavLink />
      </nav>
    </header>
  );
}
