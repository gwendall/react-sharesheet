"use client";

import { ShareSheetDrawer } from "react-sharesheet";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          react-sharesheet
        </h1>
        <p className="text-zinc-400 text-lg">
          A beautiful share sheet component for React with social media
          integrations.
        </p>
      </div>

      {/* Demo Card */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
        {/* Preview */}
        <div className="space-y-3">
          <div className="aspect-video bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">gwendall.com</span>
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-white">
              Gwendall Esnault
            </h2>
            <p className="text-zinc-400 text-sm">
              Entrepreneur & Developer. Building cool stuff on the internet.
            </p>
          </div>
        </div>

        {/* Share Button */}
        <ShareSheetDrawer
          title="Share this profile"
          shareUrl="https://gwendall.com"
          shareText="Check out Gwendall's website! 🚀"
          hide={["download"]}
        >
          <button className="w-full py-3 px-4 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer">
            Share
          </button>
        </ShareSheetDrawer>
      </div>

      {/* More Examples */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {/* Minimal example */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
          <h3 className="font-medium text-zinc-300">Minimal</h3>
          <ShareSheetDrawer
            shareUrl="https://gwendall.com"
            shareText="Check out gwendall.com!"
          >
            <button className="w-full py-2 px-3 bg-zinc-800 text-white text-sm rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer">
              Share Link
            </button>
          </ShareSheetDrawer>
        </div>

        {/* Filtered platforms */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
          <h3 className="font-medium text-zinc-300">Social Only</h3>
          <ShareSheetDrawer
            title="Share on social"
            shareUrl="https://gwendall.com"
            shareText="Just found this cool website! 🔥"
            show={["x", "whatsapp", "telegram", "copy"]}
          >
            <button className="w-full py-2 px-3 bg-zinc-800 text-white text-sm rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer">
              Share Social
            </button>
          </ShareSheetDrawer>
        </div>

        {/* Custom labels */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
          <h3 className="font-medium text-zinc-300">Custom Labels</h3>
          <ShareSheetDrawer
            title="Invite a friend"
            shareUrl="https://gwendall.com"
            shareText="Hey, check out Gwendall's site!"
            labels={{
              copy: "Copy URL",
              whatsapp: "Send via WhatsApp",
              x: "Post on X",
            }}
            show={["copy", "whatsapp", "x", "email", "sms"]}
          >
            <button className="w-full py-2 px-3 bg-zinc-800 text-white text-sm rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer">
              Invite Friend
            </button>
          </ShareSheetDrawer>
        </div>

        {/* Different URL */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
          <h3 className="font-medium text-zinc-300">GitHub Repo</h3>
          <ShareSheetDrawer
            title="Share repo"
            shareUrl="https://github.com/gwendall/react-sharesheet"
            shareText="Check out this React library!"
            hide={["download", "tiktok", "snapchat"]}
          >
            <button className="w-full py-2 px-3 bg-zinc-800 text-white text-sm rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer">
              Share Repo
            </button>
          </ShareSheetDrawer>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-zinc-500 text-sm">
        <p>
          View on{" "}
          <a
            href="https://github.com/gwendall/react-sharesheet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white underline underline-offset-2"
          >
            GitHub
          </a>
        </p>
      </footer>
    </main>
  );
}
