'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';
import { aiSymptomChecker, type AiSymptomCheckerOutput } from '@/ai/flows/ai-symptom-checker';
import { languages } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const symptomCheckerSchema = z.object({
  symptoms: z.string().min(10, { message: 'Please describe your symptoms in at least 10 characters.' }),
  language: z.string().min(1, { message: 'Please select a language.' }),
});

type SymptomCheckerFormValues = z.infer<typeof symptomCheckerSchema>;

export function SymptomForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AiSymptomCheckerOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<SymptomCheckerFormValues>({
    resolver: zodResolver(symptomCheckerSchema),
    defaultValues: {
      symptoms: '',
      language: 'en',
    },
  });

  const onSubmit: SubmitHandler<SymptomCheckerFormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await aiSymptomChecker(data);
      setResult(response);
      toast({
        title: "Assessment Complete",
        description: "Your symptom assessment is ready.",
        variant: "default",
      });
    } catch (err) {
      console.error('AI Symptom Checker Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      toast({
        title: "Error",
        description: `Failed to get assessment: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Describe Your Symptoms</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="symptoms">Symptoms</FormLabel>
                    <FormControl>
                      <Textarea
                        id="symptoms"
                        placeholder="e.g., I have a fever, cough, and headache..."
                        rows={5}
                        {...field}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="language">Language for Assessment</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger id="language" className="bg-background">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value}>
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Assessment...
                  </>
                ) : (
                  'Get AI Assessment'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {error && (
        <Card className="mt-6 border-destructive bg-destructive/10">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
              <CardTitle className="text-destructive">Error</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {result && !error && (
        <Card className="mt-6 shadow-lg">
          <CardHeader>
             <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl text-primary">Preliminary Assessment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Assessment:</h3>
              <p className="text-foreground/90 whitespace-pre-wrap">{result.assessment}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Likelihood Estimate:</h3>
              <p className="text-foreground/90">{result.likelihoodEstimate}</p>
            </div>
             <Card className="mt-4 border-accent bg-accent/5 p-4">
                <div className="flex items-start space-x-3">
                    <Lightbulb className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                        <h4 className="font-semibold text-accent">Disclaimer:</h4>
                        <p className="text-sm text-foreground/80">{result.disclaimer}</p>
                    </div>
                </div>
            </Card>
            <Button asChild variant="outline" className="w-full mt-4">
                <a href="/doctors">Find a Doctor for Professional Advice</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
