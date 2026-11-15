"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionConfig, motion } from "motion/react";

export function NavLink() {
  const pathname = usePathname();
  // key={pathname} remounts the link on every page change, which resets the hover state.
  // So after clicking "see the full gallery" (arrow already slid right), the gallery link
  // starts in its resting spot — arrow on the right — instead of its hovered spot.
  return <NavLinkInner key={pathname} onGallery={pathname === "/gallery"} />;
}

function NavLinkInner({ onGallery }: { onGallery: boolean }) {
  const [active, setActive] = useState(false);
  const on = () => setActive(true);
  const off = () => setActive(false);
  // home: arrow starts left of the text and slides right on hover.
  // gallery: arrow starts right of the text (pointing left) and slides left on hover.
  const reversed = active !== onGallery;

  return (
    // reducedMotion="user" skips the slide for people who turned off animations in their OS
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
    >
      <Link
        href={onGallery ? "/" : "/gallery"}
        onMouseEnter={on}
        onMouseLeave={off}
        onFocus={on}
        onBlur={off}
        // flipping the row order on hover (see `reversed`); motion's `layout` animates both pieces to their new spots
        className={`flex items-center gap-2 font-pretty text-2xl text-foreground/70 transition-colors hover:text-foreground ${reversed ? "flex-row-reverse" : "flex-row"}`}
      >
        {/* fade the arrow out while it crosses the text, then back in at its new spot */}
        <motion.span
          layout="position"
          className="flex"
          initial={false}
          animate={{ opacity: active ? [0.7, 0, 0, 1] : [1, 0, 0, 0.7] }}
          transition={{
            layout: { type: "spring", stiffness: 210, damping: 30 },
            opacity: { duration: 0.55, times: [0, 0.2, 0.6, 1], ease: "easeInOut" },
          }}
        >
          <Image
            src="/arrow.png"
            alt=""
            width={28}
            height={28}
            loading="eager"
            className={onGallery ? "rotate-180" : ""}
          />
        </motion.span>
        <motion.span layout="position">
          {onGallery ? "back to the digicam" : "see the full gallery"}
        </motion.span>
      </Link>
    </MotionConfig>
  );
}
