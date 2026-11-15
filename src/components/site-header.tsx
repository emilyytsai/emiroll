import Image from "next/image";
import Link from "next/link";
import { NavLink } from "@/components/nav-link";

const LETTERS = "emiroll".split("");
// seconds between each piece starting its hop, so the wave travels left → right
const STAGGER = 0.08;

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-6 px-6 pt-6 pb-0">
      <Link href="/" aria-label="emiroll home" className="flex items-center gap-3">
        {/* idle wave: each letter, then the smile, hops up and back down in turn, on a loop */}
        <span aria-hidden className="font-pretty text-5xl">
          {LETTERS.map((letter, i) => (
            <span
              key={i}
              className="inline-block animate-wave motion-reduce:animate-none"
              style={{ animationDelay: `${i * STAGGER}s` }}
            >
              {letter}
            </span>
          ))}
        </span>
        <span
          className="inline-block animate-wave motion-reduce:animate-none"
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
      </Link>
      <nav>
        <NavLink />
      </nav>
    </header>
  );
}
