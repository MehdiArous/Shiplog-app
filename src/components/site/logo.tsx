export function ShiplogLogo({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <rect width="20" height="20" rx="4.5" fill="var(--primary)" />
      <rect x="4" y="5"  width="12" height="2" rx="1" fill="white" />
      <rect x="4" y="9"  width="8.5" height="2" rx="1" fill="white" />
      <rect x="4" y="13" width="5"   height="2" rx="1" fill="white" opacity="0.7" />
    </svg>
  );
}
