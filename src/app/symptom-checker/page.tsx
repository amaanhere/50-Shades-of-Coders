import { SymptomForm } from '@/components/symptom-checker/symptom-form';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function SymptomCheckerPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">AI Symptom Checker</CardTitle>
          <CardDescription className="text-center mt-2">
            Describe your symptoms and our AI will provide a preliminary analysis.
            This tool is not a substitute for professional medical advice.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <SymptomForm />

      <Card className="mt-8 border-primary bg-primary/5">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Lightbulb className="h-8 w-8 text-primary" />
            <CardTitle className="text-primary">Important Note</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/80">
            The information provided by this AI Symptom Checker is for general informational purposes only, and does not constitute medical advice. It is essential to consult with a qualified healthcare professional for any health concerns or before making any decisions related to your health or treatment.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Dummy CardContent to avoid TS error, will be used by SymptomForm later
const CardContent = ({ children }: { children: React.ReactNode }) => <div className="p-6 pt-0">{children}</div>;
