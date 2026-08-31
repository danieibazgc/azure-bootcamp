"use client";

import { useCallback, useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import { AlertCircle, Download, ImagePlus, Share2 } from "lucide-react";
import { BADGE_LINKEDIN_TEXT } from "@/lib/content";

const TEMPLATE_SRC = "/images/plantilla-badge.png";
const DOWNLOAD_NAME = "badge-azure-bootcamp-2026.png";

const CANVAS_W = 3375;
const CANVAS_H = 4219;

const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

// Píxeles del paisaje interior (debajo de la barra con la X / 2026, dentro
// del marco azul, sin tapar los banners). Medido sobre la PNG nativa 3375×4219.
// El recuadro entra 3px en el marco (izq/der/arriba) para tapar el halo del
// paisaje; abajo se queda en el último píxel verde (2674) para no pisar el banner.
const PHOTO = { x: 866, y: 1201, width: 1649, height: 1474 };

const HEIC_EXTENSION_PATTERN = /\.(heic|heif)$/i;

const LINKEDIN_SHARE_URL = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
  BADGE_LINKEDIN_TEXT,
)}`;

function isHeicFile(file: File): boolean {
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    HEIC_EXTENSION_PATTERN.test(file.name)
  );
}

function validatePhotoFile(file: File): string | null {
  if (isHeicFile(file)) {
    return "Esta foto está en formato HEIC (típico de iPhone). Expórtala o compártela como JPG/PNG antes de subirla.";
  }
  if (!ALLOWED_PHOTO_TYPES.includes(file.type as (typeof ALLOWED_PHOTO_TYPES)[number])) {
    return "La foto debe ser JPG, PNG o WEBP.";
  }
  return null;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  imgW: number,
  imgH: number,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
) {
  const scale = Math.max(dw / imgW, dh / imgH);
  const sw = dw / scale;
  const sh = dh / scale;
  const sx = (imgW - sw) / 2;
  const sy = (imgH - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

export function BadgeGenerator() {
  const photoInputId = useId();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoObjectUrlRef = useRef<string | null>(null);

  const [templateImg, setTemplateImg] = useState<HTMLImageElement | null>(null);
  const [photoImg, setPhotoImg] = useState<HTMLImageElement | null>(null);
  const [photoLabel, setPhotoLabel] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [shareHint, setShareHint] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => setTemplateImg(img);
    img.src = TEMPLATE_SRC;
  }, []);

  useEffect(() => {
    return () => {
      if (photoObjectUrlRef.current) {
        URL.revokeObjectURL(photoObjectUrlRef.current);
      }
    };
  }, []);

  const drawBadge = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (templateImg) {
        ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);
      }

      if (!photoImg) return;

      const scaleX = canvas.width / CANVAS_W;
      const scaleY = canvas.height / CANVAS_H;
      const dx = Math.round(PHOTO.x * scaleX);
      const dy = Math.round(PHOTO.y * scaleY);
      const dw = Math.round(PHOTO.width * scaleX);
      const dh = Math.round(PHOTO.height * scaleY);
      // Un poco más grande que el clip: drawImage a veces deja 1px de hueco
      // por redondeo y se veía el paisaje en los bordes.
      const overscan = Math.max(2, Math.round(2 * Math.max(scaleX, scaleY)));

      ctx.save();
      ctx.beginPath();
      ctx.rect(dx, dy, dw, dh);
      ctx.clip();
      drawCover(
        ctx,
        photoImg,
        photoImg.naturalWidth,
        photoImg.naturalHeight,
        dx - overscan,
        dy - overscan,
        dw + overscan * 2,
        dh + overscan * 2,
      );
      ctx.restore();
    },
    [photoImg, templateImg],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawBadge(ctx, canvas);
  }, [drawBadge]);

  function revokePreviousPhotoUrl() {
    if (photoObjectUrlRef.current) {
      URL.revokeObjectURL(photoObjectUrlRef.current);
      photoObjectUrlRef.current = null;
    }
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const error = validatePhotoFile(file);
    if (error) {
      setPhotoError(error);
      setPhotoImg(null);
      setPhotoLabel(null);
      setShareHint(false);
      revokePreviousPhotoUrl();
      event.target.value = "";
      return;
    }

    setPhotoError(null);
    setShareHint(false);
    revokePreviousPhotoUrl();

    const objectUrl = URL.createObjectURL(file);
    photoObjectUrlRef.current = objectUrl;

    const img = new Image();
    img.onload = () => {
      setPhotoImg(img);
      setPhotoLabel(file.name);
    };
    img.onerror = () => {
      setPhotoError("No pudimos leer esa imagen. Prueba con otro JPG, PNG o WEBP.");
      setPhotoImg(null);
      setPhotoLabel(null);
      revokePreviousPhotoUrl();
    };
    img.src = objectUrl;
  }

  function triggerDownload() {
    const canvas = canvasRef.current;
    if (!canvas || !photoImg) return;

    const link = document.createElement("a");
    link.download = DOWNLOAD_NAME;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function handleDownload() {
    triggerDownload();
  }

  function handleShare() {
    triggerDownload();
    setShareHint(true);
    window.open(LINKEDIN_SHARE_URL, "_blank", "noopener,noreferrer");
  }

  const ready = Boolean(photoImg);
  const templateReady = Boolean(templateImg);

  return (
    <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12">
      <div className="card-surface mx-auto w-full max-w-sm overflow-hidden rounded-2xl p-3 sm:p-4 lg:mx-0">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          className="h-auto w-full rounded-xl"
          aria-label="Vista previa de tu badge"
        >
          Vista previa de tu badge del Azure Bootcamp.
        </canvas>
        {!templateReady ? (
          <p className="mt-3 text-center text-xs text-white/40">Cargando plantilla…</p>
        ) : null}
      </div>

      <div className="card-surface flex flex-col gap-6 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <label htmlFor={photoInputId} className="text-sm font-medium text-white/80">
            Tu foto
          </label>
          <label
            htmlFor={photoInputId}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-white/60 transition-colors hover:border-white/35"
          >
            <ImagePlus className="h-4 w-4 shrink-0" aria-hidden="true" />
            {photoLabel ?? "Sube tu foto — JPG, PNG o WEBP (no HEIC)"}
          </label>
          <input
            id={photoInputId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={handlePhotoChange}
          />
          <span className="text-xs text-white/40">
            La foto reemplaza el paisaje de la ventana. No se sube a ningún servidor: todo se
            arma en tu navegador.
          </span>
          {photoError ? (
            <span className="flex items-start gap-1.5 text-xs text-lead-red">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {photoError}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleDownload}
            disabled={!ready}
            className="gradient-cta glow-violet inline-flex flex-1 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Descargar
          </button>
          <button
            type="button"
            onClick={handleShare}
            disabled={!ready}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors duration-200 hover:border-white/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-white/20 disabled:hover:bg-white/5"
          >
            <Share2 className="h-4 w-4" aria-hidden="true" />
            Compartir
          </button>
        </div>

        <p className="text-sm leading-6 text-white/60">
          LinkedIn no deja adjuntar la imagen automáticamente. Al compartir se descarga tu badge
          para que lo subas al post, con un texto ya redactado como borrador.
        </p>
        {shareHint ? (
          <p className="rounded-xl border border-azure-light/30 bg-azure/10 px-4 py-3 text-sm text-azure-light">
            Se descargó tu badge. Adjúntalo al post de LinkedIn que acabamos de abrir.
          </p>
        ) : null}
      </div>
    </div>
  );
}
