import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { readFile } from "fs/promises";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

import wallet from "../../solana/key.json";

const umi = createUmi("https://api.devnet.solana.com", "finalized");
umi.use(irysUploader());

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));

(async () => {
    const image = await readFile('src/frontend/img/ulivo3.webp');
    const nft_image = createGenericFile(image, "UlivoV3");

    const [myUri] = await umi.uploader.upload([nft_image]);

    console.log(myUri);
})();