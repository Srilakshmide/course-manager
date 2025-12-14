import mongoose from 'mongoose'

const MONGOURI = process.env.MONGODB_URI
if (!MONGOURI) {
  // allow local dev without throwing to let frontend run (APIs will fail until MONGODB_URI provided)
  console.warn('MONGODB_URI not set — DB functionality will be disabled until it is provided.')
}

let cached = globalThis._mongo || { conn: null, promise: null }
export async function connectMongo() {
  if (cached.conn) return cached.conn
  if (!MONGOURI) throw new Error('Missing MONGODB_URI')
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGOURI).then(m => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}