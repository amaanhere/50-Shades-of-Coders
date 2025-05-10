
import { ProfileForm } from '@/components/profile/profile-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <UserCircle className="mx-auto h-16 w-16 text-primary mb-4" />
          <CardTitle className="text-3xl font-bold">Your Profile</CardTitle>
          <CardDescription className="mt-2">
            Manage your personal information and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
