import { redirect } from 'next/navigation';
import { auth } from '@/app/(auth)/auth';

export default async function HomePage() {
  const session = await auth();
  
  // If user is logged in, redirect to external chat site
  if (session?.user) {
    redirect('https://chat.lumiaai.ru');
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Lumia
        </h1>
        <p className="text-center text-lg text-muted-foreground">
          The strongest A.I assistant
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <a
            href="/login"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Login
          </a>
          <a
            href="/register"
            className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
} 