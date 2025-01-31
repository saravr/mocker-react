
export const generateShortUniqueId = (length) => {
    const crypto = window.crypto || window.msCrypto // For compatibility with older browsers
    const bytes = new Uint8Array(6)
    crypto.getRandomValues(bytes)

    // Encode bytes in base64 and take the specified length
    return btoa(String.fromCharCode(...bytes)).substring(0, length)
}

export function removePrefix(str, prefix) {
    if (str.startsWith(prefix)) {
        return str.slice(prefix.length)
    }
    return str
}
