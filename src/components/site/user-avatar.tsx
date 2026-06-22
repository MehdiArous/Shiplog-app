import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<UserAvatarProps["size"]>, string> = {
  sm: "size-5",
  md: "size-7",
  lg: "size-9",
};

export function UserAvatar({ src, name, size = "md", className = "" }: UserAvatarProps) {
  const initials = (name?.trim() || "U").slice(0, 2).toUpperCase();
  return (
    <Avatar className={`${SIZE_CLASSES[size]} ${className}`}>
      {src ? <AvatarImage src={src} alt={name ?? "User avatar"} /> : null}
      <AvatarFallback className="bg-linear-to-br from-primary to-info text-[10px] font-bold text-white">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
