"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Lightbox } from "@/components/photo-grid";
import { PHOTOS, type Photo } from "@/data/photos";

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
  // the art draws the part smaller than the base drawing does (a button pushed
  // in), so paint the page background under it first to hide the base's part
  coverBase?: boolean;
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

// the flash (shutter) button. its art is a full redraw of the camera with the
// button pushed in, so it's clipped down to just the button; otherwise its
// empty switch slot would cover the power switch.
const FLASH: Part = {
  id: "flash",
  label: "flash",
  desktop: "/flash_down.png",
  mobile: "/flash_down-mobile.png",
  desktopBox: box(68.5, 3, 13.5, 12.5),
  mobileBox: box(84.5, 68.5, 12.5, 13.5),
  round: true,
  desktopClip: "inset(0 17.5% 84% 68%)",
  mobileClip: "inset(68% 0 17.5% 84%)",
  coverBase: true,
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

const artClass =
  "pointer-events-none absolute inset-0 h-full w-full select-none";
// hover glow for buttons whose art is always showing
const overlayClass = `${artClass} will-change-[filter,opacity] transition-[opacity,filter] duration-110 peer-hover:brightness-[1.15] peer-hover:saturate-[1.15]`;

function Hotspot({
  part,
  variant,
  hidden,
  pressed,
  onClick,
  onPress,
}: {
  part: Part;
  variant: "desktop" | "mobile";
  hidden?: boolean;
  pressed?: boolean;
  onClick?: () => void;
  // told when a pointer pushes the button down (true) and lets go (false)
  onPress?: (down: boolean) => void;
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
          onPointerDown={onPress && (() => onPress(true))}
          onPointerUp={onPress && (() => onPress(false))}
          onPointerLeave={onPress && (() => onPress(false))}
          onPointerCancel={onPress && (() => onPress(false))}
          className={`pointer-events-auto ${buttonClass(part.round)}`}
          style={style}
        />
      )}
      {part.coverBase && (
        <div
          aria-hidden
          className={`absolute inset-0 bg-background ${hidden ? "opacity-0" : "opacity-100"}`}
          style={{
            clipPath:
              variant === "desktop" ? part.desktopClip : part.mobileClip,
          }}
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
        // pushed-in art (with a background patch under it) swaps instantly and
        // skips the hover glow: it only shows while pressed, so the glow would
        // just make the pressed button look lighter, and a fade would flash
        // the bare patch over the button
        className={`${part.coverBase ? artClass : overlayClass} ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
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

const screenSizes = (variant: "desktop" | "mobile") =>
  variant === "desktop"
    ? "(min-width: 768px) 460px, 0px"
    : "(max-width: 767px) 200px, 0px";

// the camera's screen: black when switched off, the current photo when on,
// or a message once every photo has been deleted.
// changing photos crossfades: the old photo stays underneath until the new
// one has loaded, then the new one fades (and settles) in on top of it.
function Screen({
  variant,
  on,
  photo,
  label,
  neighbors,
}: {
  variant: "desktop" | "mobile";
  on: boolean;
  photo: Photo | null;
  label: string;
  neighbors: Photo[];
}) {
  // the photo sitting fully faded in underneath the incoming one
  const [settled, setSettled] = useState<Photo | null>(null);
  // src of the incoming photo once it has loaded and can fade in
  const [loaded, setLoaded] = useState<string | null>(null);
  // only while a new photo is fading in. once every photo is deleted there's
  // nothing to fade to, so the last one mustn't linger over the empty message
  const under =
    on && photo && settled && settled.src.src !== photo.src.src
      ? settled
      : null;
  const visible = loaded === photo?.src.src;

  return (
    <div
      className="screen @container absolute overflow-hidden bg-black"
      style={SCREEN[variant]}
    >
      {under && (
        <Image
          key={`under-${under.src.src}`}
          src={under.src}
          alt=""
          aria-hidden
          fill
          sizes={screenSizes(variant)}
          className="screen-photo object-cover"
        />
      )}
      {on && photo && (
        <Image
          key={photo.src.src}
          src={photo.src}
          alt={photo.caption || label}
          fill
          sizes={screenSizes(variant)}
          onLoad={() => setLoaded(photo.src.src)}
          onTransitionEnd={() => setSettled(photo)}
          className={`screen-photo object-cover transition-[opacity,scale] duration-400 ease-out ${
            visible ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
          }`}
        />
      )}
      {on && !photo && (
        <p className="screen-empty font-pretty flex h-full items-center justify-center px-[8cqw] text-center text-[9cqw] text-white">
          no pictures to display!
        </p>
      )}
      {/* the photos either side, loaded ahead of time so flipping to them
          fades straight in instead of waiting on the download */}
      {on &&
        neighbors.map((n) => (
          <Image
            key={`next-${n.src.src}`}
            src={n.src}
            alt=""
            aria-hidden
            fill
            loading="eager"
            sizes={screenSizes(variant)}
            className="pointer-events-none object-cover opacity-0"
          />
        ))}
    </div>
  );
}

// one-line caption for the photo on screen. desktop: tucked into the empty
// strip just under the camera body (which ends at 87.5% of the drawing),
// centered on the body so it clears the keychain. mobile: right under the
// drawing, since the keychain fills the space below the body there.
function Caption({
  variant,
  photo,
}: {
  variant: "desktop" | "mobile";
  photo: Photo | null;
}) {
  const { caption, color } = photo ?? { caption: "", color: "" };
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

type CameraState = {
  on: boolean;
  photo: Photo | null;
  label: string;
  neighbors: Photo[];
  togglePower: () => void;
  flash: () => void;
  step: (dir: 1 | -1) => void;
  remove: () => void;
  expand: () => void;
};

function Camera({
  variant,
  on,
  photo,
  label,
  neighbors,
  togglePower,
  flash,
  step,
  remove,
  expand,
}: CameraState & { variant: "desktop" | "mobile" }) {
  const desktop = variant === "desktop";
  const actions: Record<string, (() => void) | undefined> = {
    prev: () => step(-1),
    next: () => step(1),
    delete: remove,
  };
  // what's on screen (only while the camera is on)
  const shown = on ? photo : null;
  return (
    <div
      className={
        desktop
          ? "hidden w-full max-w-4xl md:block"
          : "block w-full max-w-md md:hidden"
      }
    >
      {/* the drawing's box: every overlay and hotspot is positioned in % of
          this, so nothing else may change its height */}
      <div className="relative">
        {/* behind the camera art, showing through its screen hole */}
        {/* remounting on power-up fades the photo in from black */}
        <Screen
          key={on ? "on" : "off"}
          variant={variant}
          on={on}
          photo={photo}
          label={label}
          neighbors={neighbors}
        />
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
        {/* mobile: tapping the screen opens the photo fullscreen */}
        {!desktop && shown && (
          <button
            type="button"
            aria-label="view photo fullscreen"
            onClick={expand}
            className="absolute z-10 cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            style={SCREEN.mobile}
          />
        )}
        <Keychain variant={variant} />
        {BUTTONS.map((part) => (
          <Hotspot
            key={part.id}
            part={part}
            variant={variant}
            onClick={actions[part.id]}
          />
        ))}
        {/* switch art: green overlay = on; hiding it shows the pink "off"
            switch drawn underneath */}
        <Hotspot
          part={SWITCH}
          variant={variant}
          hidden={!on}
          pressed={on}
          onClick={togglePower}
        />
        <FlashButton variant={variant} flash={flash} />
        {desktop && <Caption variant={variant} photo={shown} />}
      </div>
      {!desktop && <Caption variant={variant} photo={shown} />}
    </div>
  );
}

// the flash button: shows the pushed-in art while held (or briefly on a
// keyboard press), and fires the flash on click
function FlashButton({
  variant,
  flash,
}: {
  variant: "desktop" | "mobile";
  flash: () => void;
}) {
  const [held, setHeld] = useState(false);
  const [tapped, setTapped] = useState(false);
  return (
    <Hotspot
      part={FLASH}
      variant={variant}
      hidden={!held && !tapped}
      onPress={setHeld}
      onClick={() => {
        setTapped(true);
        setTimeout(() => setTapped(false), 150);
        flash();
      }}
    />
  );
}

// the camera flash: the page background snaps to white, then fades back to
// pink over a second. it animates the --background variable itself, so
// everything painted with it (the page, the flash button's patch) flashes
// together. pressing again mid-flash starts it over.
function flashBackground() {
  const root = document.documentElement;
  root.getAnimations().forEach((a) => {
    if (a.id === "camera-flash") a.cancel();
  });
  root.animate([{ "--background": "#fff", offset: 0 }], {
    id: "camera-flash",
    duration: 1000,
    easing: "ease-out",
  });
}

export function Digicam() {
  const [on, setOn] = useState(true);
  // deleting only hides a photo for this visit; a reload brings them all back
  const [photos, setPhotos] = useState(PHOTOS);
  const [index, setIndex] = useState(0);
  // the screen tapped open into the full-photo view (mobile)
  const [viewing, setViewing] = useState(false);

  const photo = photos[index] ?? null;
  const camera: CameraState = {
    on,
    photo,
    label: `photo ${index + 1} of ${photos.length}`,
    neighbors: [
      ...new Set([
        photos[(index + 1) % photos.length],
        photos[(index - 1 + photos.length) % photos.length],
      ]),
    ].filter((n) => n && n !== photo),
    togglePower: () => setOn((o) => !o),
    // only fires while the camera is on, like the other buttons
    flash: () => {
      if (on) flashBackground();
    },
    // wraps around at both ends; the buttons do nothing while it's off
    step: (dir) => {
      if (!on || photos.length === 0) return;
      setIndex((i) => (i + dir + photos.length) % photos.length);
    },
    // drops the photo on screen and shows the one after it (or the new
    // last one, if the last photo was deleted)
    remove: () => {
      if (!on || !photo) return;
      setPhotos((list) => list.filter((p) => p !== photo));
      setIndex((i) => Math.max(0, Math.min(i, photos.length - 2)));
    },
    expand: () => {
      if (on && photo) setViewing(true);
    },
  };

  return (
    <>
      <Camera variant="desktop" {...camera} />
      <Camera variant="mobile" {...camera} />
      {/* the gallery's full-photo view; flipping photos in it flips the
          camera too, so closing it lands on the photo you were looking at */}
      <Lightbox
        photos={photos}
        index={viewing ? index : null}
        setIndex={(i) => (i === null ? setViewing(false) : setIndex(i))}
      />
    </>
  );
}
