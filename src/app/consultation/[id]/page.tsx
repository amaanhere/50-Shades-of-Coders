import { ConsultationInterface } from '@/components/consultation/consultation-interface';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Video } from 'lucide-react';

// You can fetch doctor details based on params.id if needed
export default function ConsultationPage({ params }: { params: { id: string } }) {
  // For now, params.id can represent a doctor's ID or appointment ID
  // We'll just display a generic title
  
  return (
    <div className="max-w-5xl mx-auto">
      <Card className="mb-8 shadow-lg">
        <CardHeader className="text-center">
          <Video className="mx-auto h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-3xl font-bold text-primary">Online Consultation</CardTitle>
          <CardDescription className="mt-2">
            Connecting you with your healthcare provider.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <ConsultationInterface consultationId={params.id} />
    </div>
  );
}
