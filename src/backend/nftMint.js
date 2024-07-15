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
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const umi_1 = require("@metaplex-foundation/umi");
const serializers_1 = require("@metaplex-foundation/umi/serializers");
const key_json_1 = __importDefault(require("../../solana/key.json"));
const umi = (0, umi_bundle_defaults_1.createUmi)("https://api.devnet.solana.com", "finalized");
let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(key_json_1.default));
const myKeypairSigner = (0, umi_1.createSignerFromKeypair)(umi, keypair);
umi.use((0, umi_1.signerIdentity)(myKeypairSigner)).use((0, mpl_token_metadata_1.mplTokenMetadata)());
const name = "SolGreen NFT";
const uri = "https://arweave.net/Un0o4Xv7nwj50qDvPUqHXG-ih87hkW7MsP4R-EazfzE";
const mint = (0, umi_1.generateSigner)(umi);
const sellerFeeBasisPoints = (0, umi_1.percentAmount)(5, 2);
(() => __awaiter(void 0, void 0, void 0, function* () {
    let tx = (0, mpl_token_metadata_1.createNft)(umi, {
        mint,
        name,
        uri,
        sellerFeeBasisPoints,
    });
    let result = yield tx.sendAndConfirm(umi);
    const signature = serializers_1.base58.deserialize(result.signature);
    console.log(signature);
}))();
