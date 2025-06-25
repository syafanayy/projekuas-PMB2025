// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          // Verifikasi dengan Firebase Auth
          const userCredential = await signInWithEmailAndPassword(
            auth, 
            credentials.email, 
            credentials.password
          )
          
          // Ambil data user dari Firestore
          const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))
          const userData = userDoc.data()
          
          return {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            username: userData?.username || userData?.name,
            role: userData?.role || 'user'
          }
        } catch (error) {
          console.error('Login error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      session.user.username = token.username
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
})

export { handler as GET, handler as POST }