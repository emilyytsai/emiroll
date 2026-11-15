"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionConfig, motion } from "motion/react";

export function NavLink() {
  const onGallery = usePathname() === "/gallery";
  const [active, setActive] = useState(false);
  const on = () => setActive(true);
  const off = () => setActive(false);

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
        // flipping the row order on hover; motion's `layout` animates both pieces to their new spots
        className={`flex items-center gap-2 font-pretty text-2xl text-foreground/70 underline-offset-4 transition-colors hover:text-foreground ${active ? "flex-row-reverse" : "flex-row"}`}
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
        <motion.span layout="position" className={active ? "underline" : ""}>
          {onGallery ? "back to the digicam" : "see the full gallery"}
        </motion.span>
      </Link>
    </MotionConfig>
  );
}
