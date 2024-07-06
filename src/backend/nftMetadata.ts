import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

//import wallet from "../wallet.json";

const umi = createUmi("https://api.devnet.solana.com", "finalized")

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner)).use(irysUploader());

(async () => {

    const metadata = {
        name: "SolGreen NFT",
        symbol: "SGT",
        description: "SolGreen Olive Tree NFT",
        image: "Generate link with imageUploader script",
        attributes: [
            {
                //Tree type 
                trait_type: "Trees",
                value: "Olive tree"
            },
            {
                //Trees purchased
                trait_type: "Number",
                value: 1
            },
            {
                //Project name *to be defined
                trait_type: "Author",
                value: "ProjectName"
            }
        ],
        proprieties: {
            files: [
                {
                    type: "image/jpeg",
                    uri: "Generate link with imageUploader script"
                }
            ]
        }
    }

    const nftUri = await umi.uploader.uploadJson(metadata);
    console.log("Your Uri:", nftUri);
})();