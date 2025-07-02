import { PinataSDK } from 'pinata-web3'

let pinata: PinataSDK | null = null

function getPinataClient() {
  if (!pinata && typeof window !== 'undefined') {
    pinata = new PinataSDK({
      pinataJwt: process.env.PINATA_JWT!,
      pinataGateway: process.env.NEXT_PUBLIC_IPFS_GATEWAY!
    })
  }
  return pinata
}

export interface IPFSUploadResult {
  hash: string
  url: string
  size: number
}

export class IPFSClient {
  static async uploadFile(file: File, folder?: string): Promise<IPFSUploadResult> {
    const client = getPinataClient()
    if (!client) {
      throw new Error('Pinata client not available on server side')
    }
    
    try {
      const upload = await client.upload.file(file).group(folder || 'beats')
      
      return {
        hash: upload.IpfsHash,
        url: `${process.env.NEXT_PUBLIC_IPFS_GATEWAY}${upload.IpfsHash}`,
        size: file.size
      }
    } catch (error) {
      console.error('IPFS upload failed:', error)
      throw new Error('Failed to upload to IPFS')
    }
  }

  static async uploadJSON(data: object, name?: string): Promise<IPFSUploadResult> {
    const client = getPinataClient()
    if (!client) {
      throw new Error('Pinata client not available on server side')
    }
    
    try {
      const upload = await client.upload.json(data).addMetadata({ name })
      
      return {
        hash: upload.IpfsHash,
        url: `${process.env.NEXT_PUBLIC_IPFS_GATEWAY}${upload.IpfsHash}`,
        size: JSON.stringify(data).length
      }
    } catch (error) {
      console.error('IPFS JSON upload failed:', error)
      throw new Error('Failed to upload JSON to IPFS')
    }
  }

  static async getFile(hash: string): Promise<Response> {
    return fetch(`${process.env.NEXT_PUBLIC_IPFS_GATEWAY}${hash}`)
  }
}