import CryptoJS from 'crypto-js'

const iv = '00000000000000000000000000000000'

/**
 * 與 webApi 後端相同的加解密方式 aes 128 cbc
 */

export function decryptId(encryptionId) {
  return Number.parseInt(decryptAES(encryptionId))
}

export function encryptId(id) {
  return encryptAES(id)
}

export function decryptAES(strEncryptText) {
  const strEncryptTextn = base64UrlDecode(strEncryptText)
  const { key } = useRuntimeConfig().public.encryptionService
  const decrypted = CryptoJS.AES.decrypt(strEncryptTextn, CryptoJS.enc.Utf8.parse(key), {
    keySize: 128 / 8,
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

export function encryptAES(strOrignText) {
  const { key } = useRuntimeConfig().public.encryptionService
  const encrypted = CryptoJS.AES.encrypt(strOrignText, CryptoJS.enc.Utf8.parse(key), {
    keySize: 128 / 8,
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })
  return base64UrlEncode(encrypted.toString())
}

function base64UrlEncode(input) {
  return input.toString(CryptoJS.enc.Utf8).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function base64UrlDecode(input) {
  return input.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - input.length % 4) % 4)
}
