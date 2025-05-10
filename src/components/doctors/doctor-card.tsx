import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Doctor } from '@/lib/data';
import { Star, MessageSquare, Video, MapPin, LanguagesIcon } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-start gap-4 p-4 bg-secondary/30">
        <Image
          src={doctor.image}
          alt={`Photo of ${doctor.name}`}
          data-ai-hint="doctor person"
          width={80}
          height={80}
          className="rounded-full border-2 border-primary object-cover"
        />
        <div className="flex-1">
          <CardTitle className="text-xl">{doctor.name}</CardTitle>
          <CardDescription className="text-primary">{doctor.specialty}</CardDescription>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(doctor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">({doctor.reviews} reviews)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-3">
        <div className="flex items-center text-sm text-foreground/80">
          <MapPin className="h-4 w-4 mr-2 text-primary" />
          {doctor.location}
        </div>
        <div className="flex items-center text-sm text-foreground/80">
          <LanguagesIcon className="h-4 w-4 mr-2 text-primary" />
          Speaks: {doctor.languages.join(', ')}
        </div>
         <div className="text-sm text-foreground/80">
          <span className="font-semibold">Availability:</span> {doctor.availability}
        </div>
        <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline">Online Now</Badge>
            <Badge variant="secondary">{doctor.specialty}</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t flex flex-col sm:flex-row gap-2">
        <Button asChild className="w-full sm:w-auto flex-1">
          <Link href={`/consultation/${doctor.id}?type=video`}>
            <Video className="mr-2 h-4 w-4" /> Video Call
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto flex-1">
          <Link href={`/profile/${doctor.id}`}> {/* Assuming profile page for doctor */}
            View Profile
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
