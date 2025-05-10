
'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { specialties, languages } from '@/lib/data'; // Assuming user might set language preference
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters.').optional(),
  // Doctor specific fields (conditionally rendered or handled)
  specialty: z.string().optional(),
  languagesSpoken: z.array(z.string()).optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);


  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '', // Populate from localStorage/API in useEffect
      email: '',    // Populate from localStorage/API in useEffect
      phone: '',
      bio: '',
      specialty: '',
      languagesSpoken: [],
    },
  });

  useEffect(() => {
    // Simulate fetching user data and role
    const storedRole = typeof window !== 'undefined' ? localStorage.getItem('userRoleMediCall') : null;
    if (storedRole === 'doctor') {
      setIsDoctor(true);
    }
    // Populate form with mock data or stored data
    // In a real app, fetch this from your backend
    form.reset({
      fullName: 'Demo User',
      email: 'demo@example.com', // This should ideally come from auth state
      phone: '123-456-7890',
      bio: 'This is a sample bio for the demo user.',
      specialty: storedRole === 'doctor' ? specialties[0]?.value : undefined, // Default to first specialty if doctor
      languagesSpoken: storedRole === 'doctor' ? [languages[0]?.value] : undefined, // Default to first language if doctor
    });
  }, [form]);


  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Profile data:', data);
    // In a real app, you would send this data to your backend to update the user's profile.
    // Example: await updateUserProfile(data);
    setIsLoading(false);
    toast({
      title: 'Profile Updated!',
      description: 'Your profile information has been saved.',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} readOnly disabled /* Email usually not editable or requires verification */ />
              </FormControl>
              <FormDescription>Your email address cannot be changed here.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="e.g., +1 123 456 7890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us a bit about yourself..." {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isDoctor && (
          <>
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialty</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your specialty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specialties.map(spec => (
                        <SelectItem key={spec.value} value={spec.value}>{spec.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Languages spoken selection for doctors could be more complex (multi-select) - simplified here for single selection */}
            <FormField
              control={form.control}
              name="languagesSpoken" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Languages Spoken (Primary)</FormLabel>
                   <Select onValueChange={(value) => field.onChange([value])} value={field.value?.[0] || ''}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary language spoken" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the primary language you use for consultations.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Profile...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>
    </Form>
  );
}
