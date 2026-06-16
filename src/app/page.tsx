"use client";

// 1. Import your brand new local shadcn button component!
import { Button } from "@/components/ui/button";
// 2. Import your Better-Auth frontend client wrapper tool
import { authClient } from "@/lib/auth-client";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function HomePage() {
  const handleGitHubLogin = async () => {
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
    <div className="relative min-h-screen bg-[#0a0a0c] hero-glow hero-grid flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="relative z-10 max-w-xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-sans font-bold tracking-tight text-[#f4f2ee]">
          Publish Your Changelogs With <span className="text-[#ff8a5c]">PulseLog</span>
        </h1>
        <p className="text-sm md:text-base text-[#807c72] font-mono">
          An elegant engine designed exclusively for developer logs.
        </p>

        <div className="pt-4 flex justify-center">
          {/* Using your custom configured premium shadcn button style primitives */}
          <Button 
            onClick={handleGitHubLogin}
            className="bg-[#ff8a5c] text-[#1a0e08] hover:bg-[#ff8a5c]/90 font-medium rounded-xl px-6 py-5 text-sm flex items-center gap-2 shadow-soft transition-all"
          >
            <GitHubLogoIcon className="w-4 h-4" />
            Connect via GitHub Account
          </Button>
        </div>
      </div>
    </div>
  );
}
