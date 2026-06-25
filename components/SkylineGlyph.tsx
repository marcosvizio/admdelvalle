export function SkylineGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="22"
      viewBox="0 0 200 90"
      className={className}
      aria-hidden="true"
    >
      <rect x="0" y="40" width="20" height="50" fill="currentColor" />
      <rect x="24" y="20" width="18" height="70" fill="currentColor" />
      <rect x="46" y="48" width="20" height="42" fill="currentColor" />
      <rect x="70" y="6" width="22" height="84" fill="currentColor" />
      <rect x="80" y="-16" width="4" height="22" fill="currentColor" />
      <circle cx="82" cy="-16" r="3.4" fill="currentColor" />
      <rect x="96" y="32" width="18" height="58" fill="currentColor" />
      <polygon points="116,28 132,4 148,28" fill="currentColor" />
      <rect x="116" y="28" width="32" height="62" fill="currentColor" />
      <rect x="152" y="44" width="20" height="46" fill="currentColor" />
      <rect x="176" y="22" width="20" height="68" fill="currentColor" />
    </svg>
  );
}
