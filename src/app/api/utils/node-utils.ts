import crypto from "crypto"

export const generateRandomString = (bytes: number = 32) =>
    crypto.randomBytes(bytes).toString("hex")