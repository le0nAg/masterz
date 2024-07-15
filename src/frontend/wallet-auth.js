export async function connectWallet() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect();
            return response.publicKey.toString();
        } catch (error) {
            console.error('User rejected the request:', error);
            throw error;
        }
    } else {
        alert('Phantom Wallet not found. Please install it.');
        throw new Error('Phantom Wallet not found');
    }
}

export async function checkAuthStatus() {
    if (window.solana && window.solana.isPhantom) {
        try {
            const response = await window.solana.connect({ onlyIfTrusted: true });
            return response.publicKey.toString();
        } catch (error) {
            console.error('User not logged in:', error);
            return null;
        }
    } else {
        console.error('Phantom Wallet not found');
        return null;
    }
}
