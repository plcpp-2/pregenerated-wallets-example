"use client";

import { useEffect, useState } from "react";
import { useActiveWallet } from "thirdweb/react";
import { getOwnedNFTs } from "thirdweb/extensions/erc1155";
import { defineChain, getContract } from "thirdweb";
import Image from "next/image";
import { client } from "../client";
import { useActiveAccount } from "thirdweb/react";
import { arbitrumSepolia } from "thirdweb/chains";

interface NFT {
  metadata: {
    image: string;
    name: string;
    description: string;
  };
  quantityOwned: number;
}

export default function Profile() {
  const [nfts, setNfts] = useState<any | null>(null);

  const walletInfo = useActiveWallet();
  const chain = defineChain(421614);
  const walletAddress = walletInfo?.getAccount()?.address ?? "0x";
  const account = useActiveAccount();

  const nftContract = getContract({
    address: "0x31c1542CCAb41f15613F29F03E1750f30705F958",
    chain,
    client,
  });

  useEffect(() => {
    if (walletAddress !== "0x") {
      const fetchNfts = async () => {
        try {
          walletInfo?.switchChain(arbitrumSepolia);
          const fetchedNFTs = await getOwnedNFTs({
            contract: nftContract,
            start: 0,
            count: 10,
            address: walletAddress,
          });
          setNfts(fetchedNFTs);
        } catch (error) {
          console.error("Error fetching NFTs:", error);
        }
      };
      fetchNfts();
    }
  }, [walletAddress, walletInfo, nftContract]);

  const formatIpfsUrl = (url: string) => {
    return url.replace(
      "ipfs://",
      "https://349727a4ec341e84982e34ffb54950c3.ipfscdn.io/ipfs/"
    );
  };

  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Your NFT Collection</span>
            <span className="block text-indigo-600">on Arbitrum Sepolia</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore your unique digital assets and their attributes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {nfts.map((nft: NFT, index: number) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow-lg rounded-lg"
            >
              <div className="relative h-64">
                <Image
                  src={formatIpfsUrl(nft.metadata.image)}
                  alt={nft.metadata.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {nft.metadata.name}
                </h2>
                <p className="text-indigo-600 font-semibold mb-4">
                  Owned: {nft.quantityOwned.toString()}
                </p>
                <p className="text-gray-600 mb-4">{nft.metadata.description}</p>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Attributes
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
