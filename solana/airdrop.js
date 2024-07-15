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
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
// Importiamo la chiave privata del nostro wallet che abbiamo salvato dopo aver eseguito il comando "yarn keygen"
//import wallet from "key.json";
const wallet = [22, 247, 91, 115, 217, 35, 29, 176, 123, 233, 6, 224, 176, 50, 97, 208, 49, 88, 86, 7, 85, 225, 140, 255, 174, 158, 72, 253, 9, 88, 161, 253, 90, 86, 179, 202, 18, 169, 176, 76, 159, 161, 42, 123, 218, 190, 71, 174, 245, 198, 152, 63, 116, 125, 93, 191, 204, 133, 138, 6, 160, 37, 201, 26];
// Creiamo una nuova istanza di Keypair passando la chiave privata del nostro wallet come argomento
const keypair = web3_js_1.Keypair.fromSecretKey(new Uint8Array(wallet));
// Creiamo una nuova connessione con il cluster di devnet di Solana
const connection = new web3_js_1.Connection("https://api.devnet.solana.com", "finalized");
/*
    requestAirdrop:

    requestAirdrop(
        to: PublicKey,
        lamports: number
    ): Promise<TransactionSignature>;

    - to: Indirizzo del wallet a cui inviare i fondi
    - lamports: Quantità di SOL richiesta (1 SOL = 1_000_000_000 LAMPORTS)

*/
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // åRichiediamo un airdrop di 1 SOL al nostro wallet utilizzando il metodo requestAirdrop
        const airdropSignature = yield connection.requestAirdrop(keypair.publicKey, // Indirizzo del wallet a cui inviare i fondi
        1 * web3_js_1.LAMPORTS_PER_SOL // Quantità di SOL richiesta (1 SOL = 1_000_000_000 LAMPORTS)
        );
        // Attendiamo la conferma della transazione e poi logghiamo il link alla transazione sull'explorer di Solana
        console.log(`Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    }
    catch (error) {
        console.error(error);
    }
}))();
/*
    
    Siccome abbiamo settato il nostro package.json con uno script che esegue il comando "ts-node", possiamo eseguire il nostro script con il comando "yarn airdrop"

    Ricordati di non spammare la richiesta di airdrop, altrimenti verrai limitato dal cluster di devnet di Solana (puoi avere massimo 2 SOL per richiedere un altro airdrop)
    Se hai bisogno di più fondi, utilizza la faucet di Solana: https://faucet.solana.com/

*/ 
