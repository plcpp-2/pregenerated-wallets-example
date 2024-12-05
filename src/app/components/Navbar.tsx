"use client";

import { client } from "../client";
import { useActiveWallet } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";

import Link from "next/link";
import Image from "next/image";

const wallets = [
  inAppWallet({
    auth: {
      options: ["email"],
    },
  }),
];

export default function Navbar() {
  const walletInfo = useActiveWallet();
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side content */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/img/thirdweb-wordmark-dark.png"
                  alt="Logo"
                  width={150}
                  height={32}
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-xl font-bold text-foreground font-medieval">
                  Aliemon TCG
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/profile"
                className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Profile
              </a>
            </div>
          </div>

          {/* Right side button */}
          <div className="flex items-center">
            <ConnectButton
              client={client}
              wallets={wallets}
              connectButton={{
                label: "Sign in",
              }}
              connectModal={{ size: "compact" }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
