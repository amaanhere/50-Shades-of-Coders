import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Stethoscope, UserPlus } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-lg shadow-lg">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary">
            Welcome to MediCall
          </h1>
          <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl mt-4">
            Your health, connected. Access doctors, check symptoms, and manage your health online.
          </p>
          <div className="mt-8 space-x-4">
            <Button asChild size="lg">
              <Link href="/symptom-checker">Check Symptoms</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/doctors">Find a Doctor</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Our Services</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="p-3 rounded-full bg-primary/10 mb-2">
                  <Bot className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>AI Symptom Checker</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get a preliminary assessment of your symptoms using our intelligent AI.
                </CardDescription>
                <Button asChild variant="link" className="w-full mt-4">
                  <Link href="/symptom-checker">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="p-3 rounded-full bg-accent/10 mb-2">
                 <Stethoscope className="h-10 w-10 text-accent" />
                </div>
                <CardTitle>Doctor Discovery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Find qualified doctors by specialty, language, and location.
                </CardDescription>
                 <Button asChild variant="link" className="w-full mt-4">
                  <Link href="/doctors">Find Doctors</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="p-3 rounded-full bg-secondary mb-2">
                  <UserPlus className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>Easy Profile Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Register and manage your health profile securely.
                </CardDescription>
                <Button asChild variant="link" className="w-full mt-4">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 bg-secondary/50 dark:bg-secondary/20 rounded-lg">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Virtual Consultations, Real Care.
            </h2>
            <p className="max-w-[600px] text-foreground/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Connect with healthcare professionals from the comfort of your home. Secure video, audio, and chat consultations.
            </p>
            <Button asChild>
              <Link href="/doctors">Book an Appointment</Link>
            </Button>
          </div>
          <Image
            src="https://picsum.photos/600/400"
            alt="Online Consultation"
            data-ai-hint="telemedicine consultation"
            width={600}
            height={400}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
          />
        </div>
      </section>
    </div>
  );
}
