"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { PHOTOS, type Photo } from "@/data/photos";

type Span = NonNullable<Photo["span"]>;

// card size → grid cells. 2 columns on phones, 4 from md up; rows are a fixed
// height and `grid-flow-dense` backfills holes, so mixed sizes pack tightly.
const SPAN_CLASS: Record<Span, string> = {
  big: "col-span-2 row-span-2",
  wide: "col-span-2",
  tall: "row-span-2",
  standard: "",
};

// how wide each card renders, so the optimizer sends a sensibly sized file
const SPAN_SIZES: Record<Span, string> = {
  big: "(min-width: 768px) 50vw, 100vw",
  wide: "(min-width: 768px) 50vw, 100vw",
  tall: "(min-width: 768px) 25vw, 50vw",
  standard: "(min-width: 768px) 25vw, 50vw",
};

// no span set: the first photo is the hero, portraits go tall, and
// landscapes are mostly wide with every third one a plain card for rhythm
function spanFor(photo: Photo, i: number): Span {
  if (photo.span) return photo.span;
  if (i === 0) return "big";
  if (photo.src.height > photo.src.width) return "tall";
  return i % 3 === 2 ? "standard" : "wide";
}

// no layout set: tall cards get the editorial split, the rest an overlay
function layoutFor(photo: Photo, span: Span) {
  return photo.layout ?? (span === "tall" ? "split" : "overlay");
}

export function PhotoGrid() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul className="grid grid-flow-dense auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] md:auto-rows-[220px] md:grid-cols-4">
        {PHOTOS.map((photo, i) => {
          const span = spanFor(photo, i);
          const split = layoutFor(photo, span) === "split";
          return (
            <li key={photo.src.src} className={SPAN_CLASS[span]}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`open photo ${i + 1}: ${photo.caption}`}
                className="group flex h-full w-full cursor-zoom-in flex-col text-left outline-none focus-visible:ring-2 focus-visible:ring-foreground/50"
              >
                <span className="relative block min-h-0 flex-1 overflow-hidden bg-foreground/10">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes={SPAN_SIZES[span]}
                    placeholder="blur"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {!split && (
                    <>
                      {/* scrim so white text reads on any photo */}
                      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                      <span className="absolute inset-x-0 bottom-0 truncate p-3 text-base text-white md:p-4 md:text-lg">
                        {photo.caption}
                      </span>
                    </>
                  )}
                </span>
                {split && (
                  <span className="block pt-2">
                    {photo.tag && (
                      <span className="block text-sm text-foreground/50">
                        {photo.tag}
                      </span>
                    )}
                    <span
                      className="block truncate text-base md:text-lg"
                      style={{ color: photo.color || undefined }}
                    >
                      {photo.caption}
                    </span>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <Lightbox index={open} setIndex={setOpen} />
    </>
  );
}

// full-photo view. a native <dialog> gives Esc-to-close and keeps focus
// inside while open; arrow keys flip photos, clicking the backdrop closes.
// also used by the digicam on mobile, with its own (deletable) photo list.
export function Lightbox({
  index,
  setIndex,
  photos = PHOTOS,
}: {
  index: number | null;
  setIndex: (i: number | null) => void;
  photos?: Photo[];
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const photo = index === null ? null : (photos[index] ?? null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      setIndex((index + dir + photos.length) % photos.length);
    },
    [index, setIndex, photos.length],
  );

  return (
    <dialog
      ref={ref}
      onClose={() => setIndex(null)}
      onClick={(e) => {
        // the dialog itself is only "hit" on the backdrop / empty space
        if (e.target === e.currentTarget) setIndex(null);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="font-pretty m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-black/85"
    >
      {photo && index !== null && (
        <div
          className="flex h-full flex-col items-center justify-center gap-4 p-4 md:p-10"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIndex(null);
          }}
        >
          <div className="relative min-h-0 w-full flex-1">
            <Image
              key={photo.src.src}
              src={photo.src}
              alt={photo.caption}
              fill
              sizes="100vw"
              placeholder="blur"
              className="object-contain"
            />
          </div>
          <div className="flex w-full max-w-3xl items-center justify-between gap-4 text-white">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="previous photo"
              className="shrink-0 cursor-pointer p-2 opacity-70 transition-opacity hover:opacity-100"
            >
              <Image
                src="/arrow.png"
                alt=""
                width={28}
                height={28}
                className="h-auto w-7 rotate-180 invert"
              />
            </button>
            <p className="min-w-0 text-center">
              {photo.tag && (
                <span className="block text-sm opacity-60">{photo.tag}</span>
              )}
              <span className="block truncate text-lg md:text-xl">
                {photo.caption}
              </span>
            </p>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="next photo"
              className="shrink-0 cursor-pointer p-2 opacity-70 transition-opacity hover:opacity-100"
            >
              <Image
                src="/arrow.png"
                alt=""
                width={28}
                height={28}
                className="h-auto w-7 invert"
              />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIndex(null)}
            aria-label="close"
            className="absolute top-4 right-4 cursor-pointer px-2 text-3xl leading-none text-white opacity-70 transition-opacity hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}
    </dialog>
  );
}
