/**
 * Brand Logo — uses the official PNG artwork shipped in /public.
 * No container, no wrapper, no background box — just the transparent logo.
 *
 * Props:
 *  - variant: "dark" (default, on light bg) | "light" (inverted, on dark bg like footer)
 *  - height: tailwind height (default "h-8 sm:h-10")
 *  - className: extra classes
 */
export default function Logo({
  variant = "dark",
  height = "h-8 sm:h-10",
  className = "",
  alt = "Pnevmo",
  "data-testid": testId = "brand-logo",
}) {
  const src =
    variant === "light"
      ? `${process.env.PUBLIC_URL || ""}/logo-full-light.png`
      : `${process.env.PUBLIC_URL || ""}/logo-full.png`;

  return (
    <img
      src={src}
      alt={alt}
      className={`${height} w-auto block select-none ${className}`}
      draggable={false}
      data-testid={testId}
    />
  );
}
