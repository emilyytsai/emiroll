"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PHOTOS } from "@/data/photos";

type Box = { left: string; top: string; width: string; height: string };

type Part = {
  id: string;
  label: string;
  // overlay art, same canvas size as the camera drawing
  desktop: string;
  mobile: string;
  // clickable area on each drawing, as % of the image box (measured from the
  // overlay's visible pixels, with a little padding so it's easy to hit)
  desktopBox: Box;
  mobileBox: Box;
  round?: boolean;
  // trims the art (CSS clip-path) so it never paints over shared lines of
  // the base drawing; the d-pad divider would otherwise brighten away on hover
  desktopClip?: string;
  mobileClip?: string;
  // makes the hotspot a link to this page instead of a button
  href?: string;
};

const box = (
  left: number,
  top: number,
  width: number,
  height: number,
): Box => ({
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
  height: `${height}%`,
});

// the see-through screen hole in each drawing (mobile is the desktop rotated
// 90°), grown ~10px per side so the photo tucks under the drawn outline and
// never leaves a gap
const SCREEN = {
  desktop: box(10.77, 26.77, 50.46, 50.06),
  mobile: box(23.17, 10.77, 50.06, 50.46),
};

const SWITCH: Part = {
  id: "switch",
  label: "camera power switch",
  desktop: "/switch.png",
  mobile: "/switch-mobile.png",
  desktopBox: box(67, 16.5, 8.5, 8),
  mobileBox: box(75.5, 67, 7.5, 8.5),
  round: true,
};

const BUTTONS: Part[] = [
  {
    id: "gallery",
    label: "open the gallery",
    href: "/gallery",
    desktop: "/gallery.png",
    mobile: "/gallery-mobile.png",
    desktopBox: box(65.2, 32.3, 8, 11.2),
    mobileBox: box(56.4, 65.1, 11.2, 8),
    round: true,
  },
  {
    id: "delete",
    label: "delete",
    desktop: "/delete.png",
    mobile: "/delete-mobile.png",
    desktopBox: box(65.2, 70.9, 6.3, 8.7),
    mobileBox: box(20.4, 65.2, 8.7, 6.3),
    round: true,
  },
  {
    id: "prev",
    label: "previous photo",
    desktop: "/next_1.png",
    mobile: "/next_1-mobile.png",
    desktopBox: box(65, 45.1, 9.3, 25.6),
    mobileBox: box(29.3, 65, 25.6, 9.3),
    desktopClip: "inset(0 26.15% 0 0)",
    mobileClip: "inset(0 0 26.15% 0)",
  },
  {
    id: "next",
    label: "next photo",
    desktop: "/next_2.png",
    mobile: "/next_2-mobile.png",
    desktopBox: box(73.8, 45.1, 9.1, 25.6),
    mobileBox: box(29.3, 73.8, 25.6, 9.1),
    desktopClip: "inset(0 0 0 74.3%)",
    mobileClip: "inset(74.3% 0 0 0)",
  },
];

const buttonClass = (round?: boolean) =>
  `peer absolute z-10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 ${
    round ? "rounded-full" : "rounded-lg"
  }`;

const overlayClass =
  "pointer-events-none absolute inset-0 h-full w-full select-none will-change-[filter,opacity] transition-[opacity,filter] duration-110 peer-hover:brightness-[1.15] peer-hover:saturate-[1.15]";

function Hotspot({
  part,
  variant,
  hidden,
  pressed,
  onClick,
}: {
  part: Part;
  variant: "desktop" | "mobile";
  hidden?: boolean;
  pressed?: boolean;
  onClick?: () => void;
}) {
  const [w, h] = variant === "desktop" ? [2360, 1640] : [1640, 2360];
  const style = variant === "desktop" ? part.desktopBox : part.mobileBox;
  // each button + its art lives in its own layer so `peer-hover` only lights
  // up that button's art, not every overlay after it
  return (
    <div className="pointer-events-none absolute inset-0">
      {part.href ? (
        <Link
          href={part.href}
          aria-label={part.label}
          className={`pointer-events-auto ${buttonClass(part.round)}`}
          style={style}
        />
      ) : (
        <button
          type="button"
          aria-label={part.label}
          aria-pressed={pressed}
          onClick={onClick}
          className={`pointer-events-auto ${buttonClass(part.round)}`}
          style={style}
        />
      )}
      <Image
        src={variant === "desktop" ? part.desktop : part.mobile}
        alt=""
        aria-hidden
        width={w}
        height={h}
        loading="eager"
        unoptimized
        className={`${overlayClass} ${hidden ? "opacity-0" : "opacity-100"}`}
        style={{
          clipPath: variant === "desktop" ? part.desktopClip : part.mobileClip,
        }}
      />
    </div>
  );
}

// where the keychain's ring threads through the camera's strap lug
const KEYCHAIN_PIVOT = { desktop: "86.4% 16.8%", mobile: "83.2% 86.4%" };
// where hovering starts the bouncy swing
const KEYCHAIN_HOVER = {
  desktop: box(79.8, 15.5, 19.4, 80.1),
  mobile: box(4.3, 79.8, 80.1, 19.4),
};

// keychain: just art for now, not a button. Idle sway on the wrapper, hover
// swing on the image, so the two add up instead of jumping between each other.
function Keychain({ variant }: { variant: "desktop" | "mobile" }) {
  const desktop = variant === "desktop";
  const [swinging, setSwinging] = useState(false);
  const origin = { transformOrigin: KEYCHAIN_PIVOT[variant] };

  return (
    <>
      {/* rendered before the buttons, so the d-pad stays clickable where the
          hover area overlaps it on mobile */}
      <div
        aria-hidden
        className="absolute"
        style={KEYCHAIN_HOVER[variant]}
        onMouseEnter={() => setSwinging(true)}
      />
      <div
        className="pointer-events-none absolute inset-0 motion-safe:animate-key-idle"
        style={origin}
      >
        <Image
          src={desktop ? "/keychain.png" : "/keychain-mobile.png"}
          alt=""
          aria-hidden
          width={desktop ? 2360 : 1640}
          height={desktop ? 1640 : 2360}
          loading="eager"
          unoptimized
          // the swing plays to the end even if the mouse leaves, then resets
          // so the next hover swings again
          onAnimationEnd={() => setSwinging(false)}
          className={`h-full w-full select-none ${
            swinging ? "motion-safe:animate-key-swing" : ""
          }`}
          style={origin}
        />
      </div>
      {/* bit of the strap lug drawn over the ring so it looks threaded
          through the camera; stays still while the keychain swings */}
      <Image
        src={desktop ? "/keychain_loop.png" : "/keychain_loop-mobile.png"}
        alt=""
        aria-hidden
        width={desktop ? 2360 : 1640}
        height={desktop ? 1640 : 2360}
        loading="eager"
        unoptimized
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
      />
    </>
  );
}

// the photo on the camera's screen
function Screen({
  variant,
  index,
}: {
  variant: "desktop" | "mobile";
  index: number;
}) {
  const photo = PHOTOS[index];
  return (
    <div
      className="screen absolute overflow-hidden bg-black"
      style={SCREEN[variant]}
    >
      <Image
        key={photo.src}
        src={photo.src}
        alt={photo.caption || `photo ${index + 1} of ${PHOTOS.length}`}
        fill
        sizes={
          variant === "desktop"
            ? "(min-width: 768px) 460px, 0px"
            : "(max-width: 767px) 200px, 0px"
        }
        className="screen-photo object-cover"
      />
    </div>
  );
}

// one-line caption for the photo on screen. desktop: tucked into the empty
// strip just under the camera body (which ends at 87.5% of the drawing),
// centered on the body so it clears the keychain. mobile: right under the
// drawing, since the keychain fills the space below the body there.
function Caption({
  variant,
  index,
}: {
  variant: "desktop" | "mobile";
  index: number;
}) {
  const { caption, color } = PHOTOS[index];
  return (
    <p
      className={`caption font-pretty min-h-[1.5em] truncate text-center text-xl ${
        color ? "" : "text-foreground/70"
      } ${variant === "desktop" ? "absolute top-[89%] left-[2%] w-[85%]" : "mt-4 w-full"}`}
      style={color ? { color } : undefined}
    >
      {caption}
    </p>
  );
}

function Camera({
  variant,
  pressed,
  toggle,
  index,
  step,
}: {
  variant: "desktop" | "mobile";
  pressed: boolean;
  toggle: () => void;
  index: number;
  step: (dir: 1 | -1) => void;
}) {
  const desktop = variant === "desktop";
  return (
    <div
      className={
        desktop
          ? "hidden w-full max-w-4xl md:block"
          : "block w-full max-w-sm md:hidden"
      }
    >
      {/* the drawing's box: every overlay and hotspot is positioned in % of
          this, so nothing else may change its height */}
      <div className="relative">
        {/* behind the camera art, showing through its screen hole */}
        <Screen variant={variant} index={index} />
        <Image
          src={desktop ? "/camera.png" : "/camera-mobile.png"}
          alt="emi's hand drawn digicam"
          width={desktop ? 2360 : 1640}
          height={desktop ? 1640 : 2360}
          loading="eager"
          fetchPriority={desktop ? "high" : undefined}
          unoptimized
          className="relative h-auto w-full transform-gpu"
        />
        <Keychain variant={variant} />
        {BUTTONS.map((part) => (
          <Hotspot
            key={part.id}
            part={part}
            variant={variant}
            onClick={
              part.id === "prev"
                ? () => step(-1)
                : part.id === "next"
                  ? () => step(1)
                  : undefined
            }
          />
        ))}
        {/* switch overlay hidden = the red switch drawn underneath shows */}
        <Hotspot
          part={SWITCH}
          variant={variant}
          hidden={pressed}
          pressed={pressed}
          onClick={toggle}
        />
        {desktop && <Caption variant={variant} index={index} />}
      </div>
      {!desktop && <Caption variant={variant} index={index} />}
    </div>
  );
}

export function Digicam() {
  const [pressed, setPressed] = useState(false);
  const toggle = () => setPressed((p) => !p);
  const [index, setIndex] = useState(0);
  // wraps around at both ends
  const step = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + PHOTOS.length) % PHOTOS.length);
  const camera = { pressed, toggle, index, step };

  return (
    <>
      <Camera variant="desktop" {...camera} />
      <Camera variant="mobile" {...camera} />
    </>
  );
}
