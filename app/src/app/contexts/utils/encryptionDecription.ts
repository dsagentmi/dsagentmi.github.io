"use client";
// AES-GCM encryption/decryption with passphrase, output as string

export const encoder = new TextEncoder();
export const decoder = new TextDecoder();

// export function toBase64(buffer: ArrayBuffer | Uint8Array): string {
//     return btoa(String.fromCharCode(...new Uint8Array(buffer)));
// }

export function toBase64(buffer: ArrayBuffer | Uint8Array): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}


export function fromBase64(base64: string): Uint8Array {
    return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

export async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
    const passphraseKey = await crypto.subtle.importKey(
        "raw",
        encoder.encode(passphrase),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt,
            iterations: 100_000,
            hash: "SHA-256"
        },
        passphraseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
}

export async function encrypt(plainText: string, passphrase: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(passphrase, salt);
    const encoded = encoder.encode(plainText);
    const cipherText = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encoded
    );
    // Output as JSON string
    return JSON.stringify({
        salt: toBase64(salt),
        iv: toBase64(iv),
        cipherText: toBase64(cipherText)
    });
}

export async function decrypt(encryptedString: string, passphrase: string): Promise<string> {
    const { salt, iv, cipherText } = JSON.parse(encryptedString);
    const key = await deriveKey(passphrase, fromBase64(salt));
    const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: fromBase64(iv) },
        key,
        fromBase64(cipherText)
    );
    return decoder.decode(decrypted);
}

// Example usage:
