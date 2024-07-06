import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { base58 } from '@metaplex-foundation/umi/serializers';

import wallet from "../../solana/key.json";

const umi = createUmi("https://api.devnet.solana.com", "finalized");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner)).use(mplTokenMetadata());

const name = "SolGreen NFT";
const uri = "https://arweave.net/Un0o4Xv7nwj50qDvPUqHXG-ih87hkW7MsP4R-EazfzE"
const mint = generateSigner(umi);
const sellerFeeBasisPoints = percentAmount(5, 2);

(async () => {

    let tx = createNft(
        umi,
        {
            mint,
            name,
            uri,
            sellerFeeBasisPoints,
        }
    );

    let result = await tx.sendAndConfirm(umi);
    const signature = base58.deserialize(result.signature);
    console.log(signature);

})();