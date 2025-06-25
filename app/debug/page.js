'use client';
import { auth, db } from '../../lib/firebase'; // ✅ Sesuai alias bar  // ✅ BENAR (dengan jsconfig/tsconfig)
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Check Firebase connection - moved outside component
export const checkFirebaseStatus = () => {
  console.log('🐛 Firebase Auth:', auth);
  console.log('🐛 Current user:', auth.currentUser);
  console.log('🐛 Firestore:', db);
};

export default function DebugPage() {
  const { data: session, status } = useSession();
  const [debugInfo, setDebugInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== 'loading') {
      setIsLoading(false);
      // Set debug info after session is loaded
      setDebugInfo({
        session: session,
        status: status,
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server Side',
        url: typeof window !== 'undefined' ? window.location.href : 'Server Side'
      });
    }
  }, [session, status]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">🐛 Debug Mode</h1>
          <div className="bg-gray-800 p-6 rounded-lg">
            <p>Loading debug information...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🐛 Debug Mode</h1>
        
        {/* Session Info */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Session Information</h2>
          <div className="space-y-2">
            <p><strong>Status:</strong> {status}</p>
            <p><strong>User:</strong> {session?.user ? 'Logged in' : 'Not logged in'}</p>
            {session?.user && (
              <div className="ml-4 space-y-1">
                <p><strong>Email:</strong> {session.user.email}</p>
                <p><strong>Username:</strong> {session.user.username}</p>
                <p><strong>Role:</strong> {session.user.role}</p>
                <p><strong>Name:</strong> {session.user.name}</p>
              </div>
            )}
          </div>
        </div>

        {/* Environment Info */}
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Information</h2>
          <div className="space-y-2">
            <p><strong>Timestamp:</strong> {debugInfo.timestamp}</p>
            <p><strong>Current URL:</strong> {debugInfo.url}</p>
            <p><strong>User Agent:</strong> {debugInfo.userAgent}</p>
          </div>
        </div>

        {/* Raw Session Data */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Raw Session Data</h2>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        {/* Actions */}
        <div className="mt-6 space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Refresh Page
          </button>
          <button
            onClick={() => setDebugInfo({...debugInfo, timestamp: new Date().toISOString()})}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Update Timestamp
          </button>
          <button
            onClick={checkFirebaseStatus}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            Check Firebase Status
          </button>
        </div>
      </div>
    </div>
  );
}