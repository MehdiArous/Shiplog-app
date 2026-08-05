"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserAvatar } from "./user-avatar";
import { ShiplogLogo } from "@/components/site/logo";

interface SiteHeaderProps {
  signedIn?: boolean;
  isAdmin?: boolean;
  appName?: string;
  githubStars?: number;
  githubRepoUrl?: string;
  githubAppInstallUrl?: string;
  displayName?: string;
  initials?: string;
  userEmail?: string;
  unreadCount?: number;
  onSignOut?: () => void;
}

const NAV_LINKS = [
  { href: "/feed", label: "Feed" },
  { href: "/", label: "Docs" },
];

export function SiteHeader({
  signedIn = false,
  isAdmin = false,
  githubStars = 4,
  githubRepoUrl = "#",
  githubAppInstallUrl = "#",
  displayName = "Alex Developer",
  initials = "AD",
  userEmail = "alex@example.com",
  unreadCount = 0,
  onSignOut,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  const handleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard", // Where the user lands on your dashboard when verified
      });
    } catch (error) {
      console.error("Authentication handshake failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-[52px] max-w-[1100px] items-center px-6">
        <Link href="/" className="mr-7 flex shrink-0 items-center gap-2">
          <ShiplogLogo size={20} />
          <span className="font-sans text-sm font-bold tracking-tight text-foreground">
            Shiplog
          </span>
        </Link>
 
        <nav className="flex flex-1 gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
 
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/MehdiArous/Shiplog-app"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground sm:flex"
          >
            <Star className="size-3.5" />
            <span className="text-foreground">4</span>
          </a>
 
          <ThemeToggle />
 
          {isPending ? (
            <div className="size-7" />
          ) : session ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <button
                onClick={() => authClient.signOut()}
                title="Sign out"
                className="rounded-full cursor-pointer"
              >
                <UserAvatar src={session.user.image} name={session.user.name} size="md" />
              </button>
            </div>
          ) : (
            <Button onClick={handleSignIn} size="sm" className="gap-2">
              <GitHubLogoIcon className="size-4" />
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
