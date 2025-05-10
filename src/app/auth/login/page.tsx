import { LoginForm } from '@/components/auth/login-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Welcome Back to MediCall</CardTitle>
          <CardDescription className="mt-2">
            Log in to access your account and continue your health journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
           <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/auth/signup">Sign up</Link>
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Dummy Button for template
const Button = ({ children, variant, asChild, className }: any) => asChild ? children : <button className={className}>{children}</button>;
