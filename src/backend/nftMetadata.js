"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const umi_bundle_defaults_1 = require("@metaplex-foundation/umi-bundle-defaults");
const umi_1 = require("@metaplex-foundation/umi");
const umi_uploader_irys_1 = require("@metaplex-foundation/umi-uploader-irys");
const key_json_1 = __importDefault(require("../../solana/key.json"));
const umi = (0, umi_bundle_defaults_1.createUmi)("https://api.devnet.solana.com", "finalized");
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(key_json_1.default));
const myKeypairSigner = (0, umi_1.createSignerFromKeypair)(umi, keypair);
umi.use((0, umi_1.signerIdentity)(myKeypairSigner)).use((0, umi_uploader_irys_1.irysUploader)());
(() => __awaiter(void 0, void 0, void 0, function* () {
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
                value: "Olive tree" //Variabile
            },
            {
                //Trees purchased
                trait_type: "Number",
                value: 1 //Variabile
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
    };
    const nftUri = yield umi.uploader.uploadJson(metadata);
    console.log("Your Uri:", nftUri);
}))();
