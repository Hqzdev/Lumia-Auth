'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function CheckAuthPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Auth Check</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Authentication Status
              </h2>
              
              {session ? (
                <div className="space-y-4">
                  <p className="text-green-600 text-lg font-semibold">
                    ✅ Authenticated
                  </p>
                  <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="font-semibold mb-2">User Information:</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>ID:</strong> {session.user?.id}</p>
                      <p><strong>Nickname:</strong> {session.user?.nickname}</p>
                      <p><strong>Email:</strong> {session.user?.email}</p>
                      <p><strong>Subscription:</strong> {session.user?.subscription || 'free'}</p>
                    </div>
                  </div>
                  <div className="space-x-4">
                    <Button
                      onClick={() => window.location.href = 'https://chat.lumiaai.ru'}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Go to Chat
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/login'}
                      variant="outline"
                    >
                      Back to Login
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-red-600 text-lg font-semibold">
                    ❌ Not Authenticated
                  </p>
                  <Button
                    onClick={() => window.location.href = '/login'}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Go to Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 