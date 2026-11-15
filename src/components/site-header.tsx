import Image from "next/image";
import Link from "next/link";
import { NavLink } from "@/components/nav-link";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-6 px-6 pt-6 pb-0">
      <Link href="/" className="flex items-center gap-3">
        <span className="font-pretty text-5xl">emiroll</span>
        <Image
          src="/smile.png"
          alt=""
          width={46}
          height={46}
          loading="eager"
          className="-translate-y-2"
        />
      </Link>
      <nav>
        <NavLink />
      </nav>
    </header>
  );
}
