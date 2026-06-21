import Image from "next/image";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
}

export function UserAvatar({ src, name, size = 28, className }: UserAvatarProps) {
  const initials = (name ?? "U").slice(0, 2).toUpperCase();
  if (src) {
    return (
      <Image
        src={src}
        alt={name ?? "User avatar"}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className ?? ""}`}
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-info text-xs font-bold text-white ${className ?? ""}`}
    >
      {initials}
    </div>
  );
}
