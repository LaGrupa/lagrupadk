"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ImageLightbox({
  src,
  fullSrc,
  alt,
  width,
  height,
}: {
  src: string;
  fullSrc: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ver imagen completa"
        style={{
          display: "block",
          width: "100%",
          maxWidth: "760px",
          padding: 0,
          border: "none",
          background: "none",
          cursor: "zoom-in",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 760px"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            display: "block",
          }}
          priority
        />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            zIndex: 1000,
            cursor: "zoom-out",
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            style={{
              position: "absolute",
              top: "1rem",
              right: "1.25rem",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "2rem",
              lineHeight: 1,
              cursor: "pointer",
            }}
          >
            &times;
          </button>

          <div
            style={{
              position: "relative",
              width: "min(92vw, 1400px)",
              height: "min(88vh, 1400px)",
            }}
          >
            <Image
              src={fullSrc}
              alt={alt}
              fill
              sizes="92vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
