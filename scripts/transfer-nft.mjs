import { createThirdwebClient, getContract, sendTransaction } from "thirdweb";

import { config } from "dotenv";

import { privateKeyToAccount } from "thirdweb/wallets";
import { safeTransferFrom } from "thirdweb/extensions/erc1155";
import { arbitrumSepolia } from "thirdweb/chains";

config();

const main = async () => {
  if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set");
  }
  if (!process.env.THIRDWEB_SECRET_KEY) {
    throw new Error("THIRDWEB_SECRET_KEY is not set");
  }

  try {
    const NFT_CONTRACT_ADDRESS = "0x31c1542CCAb41f15613F29F03E1750f30705F958";
    const chain = arbitrumSepolia;

    // Initialize the client and the account
    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY,
    });

    const account = privateKeyToAccount({
      client,
      privateKey: process.env.PRIVATE_KEY,
    });

    const nftContract = getContract({
      address: NFT_CONTRACT_ADDRESS,
      chain,
      client,
    });

    const destinationAccount = "0x963a337498A3086538386d18916549B9245b8dCb";

    const transaction = safeTransferFrom({
      contract: nftContract,
      from: account.address,
      to: destinationAccount,
      tokenId: BigInt(0),
      value: BigInt(1),
      data: "0x",
    });

    const txData = await sendTransaction({
      transaction: transaction,
      account: account,
    });

    console.log("NFT Transsfered:", txData);
  } catch (error) {
    console.error("Error:", error);
  }
};

main();
