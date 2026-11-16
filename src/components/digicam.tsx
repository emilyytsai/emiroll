"use client";

import Image from "next/image";
import { useState } from "react";

// where the on/off switch sits on each drawing, as % of the image box
// (measured from switch.png / switch-mobile.png, with a little padding so
// it's easy to hit)
const DESKTOP_HOTSPOT = { left: "67%", top: "16.5%", width: "8.5%", height: "8%" };
const MOBILE_HOTSPOT = { left: "75.5%", top: "67%", width: "7.5%", height: "8.5%" };

export function Digicam() {
  // true = switch overlay hidden, revealing the red switch drawn underneath
  const [pressed, setPressed] = useState(false);
  const toggle = () => setPressed((p) => !p);

  const switchClass = `pointer-events-none absolute inset-0 h-full w-full select-none will-change-[filter,opacity] transition-[opacity,filter] duration-110 peer-hover:brightness-[1.15] peer-hover:saturate-[1.15] ${
    pressed ? "opacity-0" : "opacity-100"
  }`;
  const buttonClass =
    "peer absolute z-10 cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-foreground/40";

  return (
    <>
      {/* Desktop camera */}
      <div className="relative hidden w-full max-w-4xl md:block">
        <Image
          src="/camera.png"
          alt="emi's hand drawn digicam"
          width={2360}
          height={1640}
          loading="eager"
          fetchPriority="high"
          unoptimized
          className="h-auto w-full transform-gpu"
        />
        <button
          type="button"
          aria-label="camera power switch"
          aria-pressed={pressed}
          onClick={toggle}
          className={buttonClass}
          style={DESKTOP_HOTSPOT}
        />
        <Image
          src="/switch.png"
          alt=""
          aria-hidden
          width={2360}
          height={1640}
          loading="eager"
          unoptimized
          className={switchClass}
        />      </div>

      {/* Mobile camera */}
      <div className="relative block w-full max-w-sm md:hidden">
        <Image
          src="/camera-mobile.png"
          alt="emi's hand drawn digicam"
          width={1640}
          height={2360}
          loading="eager"
          unoptimized
          className="h-auto w-full transform-gpu"
        />
        <button
          type="button"
          aria-label="camera power switch"
          aria-pressed={pressed}
          onClick={toggle}
          className={buttonClass}
          style={MOBILE_HOTSPOT}
        />
        <Image
          src="/switch-mobile.png"
          alt=""
          aria-hidden
          width={1640}
          height={2360}
          loading="eager"
          unoptimized
          className={switchClass}
        />      </div>
    </>
  );
}
