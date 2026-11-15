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
    // flex-wrap: on the narrowest phones (~320px) the nav link drops to its own row instead of
    // squishing into the logo; ml-auto on <nav> keeps it right-aligned either way
    <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-6 pt-6 pb-0 sm:gap-x-6">
      <Link href="/" aria-label="emiroll home" className="group shrink-0">
        {/* hover lift: the whole logo rises a little and stays up while hovered. It's on this inner
            wrapper (not the link) so the hover area stays put while the logo moves. */}
        <span className="flex items-center gap-2 transition-transform duration-200 ease-out group-hover:-translate-y-1 motion-reduce:transition-none sm:gap-3">
        {/* idle wave: each letter, then the smile, hops up and back down in turn, on a loop.
            whitespace-nowrap: the letters are separate pieces, so without it the word can split across lines on phones. */}
        <span aria-hidden className="font-pretty whitespace-nowrap text-4xl sm:text-5xl">
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
            className="h-auto w-9 -translate-y-1.5 sm:w-[46px] sm:-translate-y-2"
          />
        </span>
        </span>
      </Link>
      <nav className="ml-auto">
        <NavLink />
      </nav>
    </header>
  );
}
