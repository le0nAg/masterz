import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

import wallet from "../../solana/key.json";

const umi = createUmi("https://api.devnet.solana.com", "finalized");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner)).use(irysUploader());

(async () => {

    //WIP
    
    const metadata = {
        name: "SolGreen NFT",
        symbol: "SGT",
        description: "SolGreen Olive Tree NFT",                                   
        image: "https://arweave.net/xZa5vlOtp9VRyYrzPYoYpQmnPXBDCQcyiWQza5MVXh4", //Variabile
        attributes: [
            {
                //Tree type 
                trait_type: "Tree Type",
                value: "Olive tree"                                               //Variabile
            },
            {
                //Trees purchased
                trait_type: "Number",
                value: 1                                                          //Variabile
            },
            {
                //Project name *to be defined
                trait_type: "Author",
                value: "SolGreen"
            }
        ],
        properties: {
            files: [
                {
                    type: "image/jpeg",
                    uri: "https://arweave.net/xZa5vlOtp9VRyYrzPYoYpQmnPXBDCQcyiWQza5MVXh4"
                }
            ]
        }
    }

    const nftUri = await umi.uploader.uploadJson(metadata);
    console.log("Your Uri:", nftUri);
})();