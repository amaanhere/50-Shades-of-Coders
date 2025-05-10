
'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password cannot be empty.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Login data:', data);
    setIsLoading(false);

    // Simulate successful login
    // In a real app, you'd verify credentials and get user role from backend
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedInMediCall', 'true');
      // Simulate a role, or retrieve if stored during signup simulation
      const role = localStorage.getItem('userRoleMediCall') || 'patient'; 
      localStorage.setItem('userRoleMediCall', role);
      // Dispatch a custom event to notify other components (like the header) of auth change
      window.dispatchEvent(new CustomEvent('authChange'));
    }


    toast({
      title: 'Logged In!',
      description: 'Welcome back to MediCall.',
    });
    router.push('/'); // Redirect to homepage after login
    router.refresh(); // Refresh the page to ensure header updates if it missed the event somehow
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email-login">Email</FormLabel>
              <FormControl>
                <Input id="email-login" type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password-login">Password</FormLabel>
              <FormControl>
                <Input id="password-login" type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging In...
            </>
          ) : (
            'Log In'
          )}
        </Button>
      </form>
    </Form>
  );
}
