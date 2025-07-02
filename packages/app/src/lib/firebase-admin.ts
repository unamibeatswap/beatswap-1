import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'
import { getStorage } from 'firebase-admin/storage'

const serviceAccount = {
  type: "service_account",
  project_id: "beatswap-36c32",
  private_key_id: "bd12edc6badbad12dd1c42df2db74c2441a90959",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDGiHfN6Rfqa3LK\nJlVWX9Aee4HjmVMLzqE7M3hgAejuSzl2gKlTxpobpQQvXHSMKn88YKPHuKZNrVQJ\nDK8lNgbdHfmD1lwbGjfVeXdMUXps+t/VRJEDTt73yMEfIo9Id+CP7c/OQK24R73a\nlq4f3cWA/MVb3rtEmP34knB4rTkRyRlJShVdIt+xjUkA+wLQ6Ir4nPO0ckJqfQLz\nxGs1MvnJZyPNY255C/PA5WbybPbwWIH+JChIVYQ6h9X94O7SAOdJJilZyqvn7AjD\nh4GcvC5ht4VlUbr4duYQdF1GrG7k6kLcT7or4tFJXkH234Dwq5myMH41dY0yKQBZ\nqFLVfYzRAgMBAAECggEAU3i8OmBnFEIh7LlqRtsY80AFcA6eeofhhTUSRvd2mn4Z\nRmg5CUams7nRRSJvxCD4BwgwxD+v+FfITde96fzJrP0108b0Sdbfo8siq/1T5m8i\nXhYqjEQEfhSzkeYjbRot2gXoSbUq9SCAw993jWFecWmVhxdiECjtGy5iyHI4XO+8\nUbtW1Hjw9O4LiOVrG/6PfvSHob8dryl+RJGAQKIENXs/GKIW9RyL1Eh02FEAxX/N\nk/6LJBtDlhr6ob06lnfznWzeknWoAbp+UkvlJHgKFqnMfSMpnSBtjdJ2dNYqA6FV\nFEkkLAHuhEaUBRVmfmhS9AKEN4lqbgaq2UzgdiTWgwKBgQD4Xfc/mDMrTyD4SmLj\nK+j4122E5O+tJ8dI/g8mzTjpuKcGB3J20FMmACcXH0ad7bPQyeyLR8clC991Iz/M\n8oNeg1/o7Wz6GfIELDznAQl6zUWoq9jBw8lnMIDk/9qY3q4ZXrDgO0fBqAZobknq\nNrHfUXv/VsFh+3WJkpzS+1IUgwKBgQDMom6dFE3ZBNCalYBTUyHGSF+FRdtqoLKG\nw1Acqf5uS9D8yat1V2x8aiM/y7y8LwPRmQnej3m8REuMXpmkGA5pjpjj0x+YkUo4\nINoSN7gowuUCbAm5e6O4WpoO8ziVQZz4EC3NgL62vDAM5UJ0fyrNfX9Flnev0fAl\nryNN6iWhGwKBgQDr+3QZ04YCx2tfHmZ4zFbOYPnpRBDKaDo8i1BgIKvLvivMWbUT\nWPs35vs9R/Uzxw+L+N+ssqVv+Kj3xmcvVtklKxQs37IkrBQ8jL/NCTo1mOZvzd/k\nsx8g0YAWlVbg2ut2pXbPhuO2B+0Wunu2cwNsWSLEyGxzqZXTAh/JgwtI+wKBgQCd\n6q/v+m5FDqko0jxwkRPcX5ePUqSL+a0rwGf/ZtRZK5sAqWTureOjc4j2P3TLyIBq\n7G4oWZJ5Tj76+ToZ3xKoNQoZrqCQbXbYL8n6CxPMKPLv1o3+nMJwj0KaTOoajMLk\n0B94mmUSwdFW8klBe619XN6txfthLGLlwe09wHb/hwKBgQDfe+2UQ1KiPp+5q2aF\nyiYcYIJv0TC91VQim7ePl94TtF4yQsI5v65E7420Axndjat2lbGXf7w/FnhaLiuz\ngToIT0i2rOmMUnNyUGZ285Jff9O5TPUXQRtgQoLDWNl1w+fcAQoU17pPSSiQdtZF\nmU0sAVJxM+ht/N+QxwD18BPB/g==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
  client_email: "firebase-adminsdk-fbsvc@beatswap-36c32.iam.gserviceaccount.com",
  client_id: "109633865516363435614",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40beatswap-36c32.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}

const firebaseAdminConfig = {
  credential: cert(serviceAccount as any),
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
}

const app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0]

export const adminDb = getFirestore(app)
export const adminAuth = getAuth(app)
export const adminStorage = getStorage(app)

export default app