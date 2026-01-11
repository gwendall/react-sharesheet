"use client";

import { useState } from "react";
import { ShareSheetDrawer, ShareSheetContent } from "react-sharesheet";
import { Copy, Check } from "lucide-react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyNpmCommand = async () => {
    await navigator.clipboard.writeText("npm i react-sharesheet");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          react-sharesheet
        </h1>
        <p className="text-zinc-400 text-lg">
          A mobile-first share sheet for React with native sharing and built-in
          Open Graph previews.
        </p>
        {/* Dev credibility signal */}
        <div className="flex items-center justify-center gap-3 text-sm text-zinc-500">
          <div className="flex items-center gap-2 px-2 py-1 bg-zinc-800/50 rounded-md">
            <code className="font-mono text-zinc-400">
              npm i react-sharesheet
            </code>
            <button
              onClick={copyNpmCommand}
              className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              aria-label="Copy npm command"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <span className="text-zinc-600">·</span>
          <span>MIT</span>
        </div>
      </div>

      {/* Preview - Shows the component without interaction */}
      <div className="w-full max-w-sm">
        <div className="bg-zinc-900 border border-zinc-800 rounded-t-3xl p-6 pb-8">
          {/* Drawer handle */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1 bg-zinc-700 rounded-full" />
          </div>
          <ShareSheetContent
            title="Share"
            shareUrl="https://gwendall.com"
            shareText="Check out this awesome site!"
            hide={["download"]}
          />
        </div>
      </div>

      {/* CTA to try it */}
      <div className="text-center space-y-4">
        <p className="text-zinc-500 text-sm">Click to try it yourself</p>
        <ShareSheetDrawer
          shareUrl="https://gwendall.com"
          shareText="Check this out"
          hide={["download"]}
        >
          <button className="py-3 px-8 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer">
            Open Share Sheet
          </button>
        </ShareSheetDrawer>
      </div>

      {/* Scroll hint */}
      <div className="flex flex-col items-center gap-2 text-zinc-500 text-sm animate-pulse">
        <span>More variants below</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>

      {/* More Examples */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {/* Minimal example */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
          <h3 className="font-medium text-zinc-300">Minimal</h3>
          <ShareSheetDrawer
            shareUrl="https://gwendall.com"
            shareText="Check this out"
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
            shareText="Check this out"
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
            shareText="Check this out"
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
            shareText="Check out this React library"
            hide={["download", "tiktok", "snapchat"]}
          >
            <button className="w-full py-2 px-3 bg-zinc-800 text-white text-sm rounded-lg hover:bg-zinc-700 transition-colors cursor-pointer">
              Share Repo
            </button>
          </ShareSheetDrawer>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-zinc-500 text-sm space-y-2 pt-8">
        <p>
          <a
            href="https://github.com/gwendall/react-sharesheet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white underline underline-offset-2"
          >
            View on GitHub
          </a>
          <span className="mx-2 text-zinc-600">·</span>
          <a
            href="https://www.npmjs.com/package/react-sharesheet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white underline underline-offset-2"
          >
            npm
          </a>
        </p>
        <p className="text-zinc-600">
          Made by{" "}
          <a
            href="https://gwendall.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white"
          >
            gwendall
          </a>
        </p>
      </footer>
    </main>
  );
}
