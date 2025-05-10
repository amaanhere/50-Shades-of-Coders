'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { languages, specialties } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FilterIcon, XIcon } from 'lucide-react';

interface DoctorFilterProps {
  onFilterChange: (filters: { specialty: string; language: string; location: string }) => void;
}

export function DoctorFilter({ onFilterChange }: DoctorFilterProps) {
  const [specialty, setSpecialty] = useState('');
  const [language, setLanguage] = useState('');
  const [location, setLocation] = useState('');

  const handleApplyFilters = () => {
    onFilterChange({ specialty, language, location });
  };

  const handleClearFilters = () => {
    setSpecialty('');
    setLanguage('');
    setLocation('');
    onFilterChange({ specialty: '', language: '', location: '' });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FilterIcon className="h-5 w-5" />
          Filter Doctors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label htmlFor="specialty-filter" className="block text-sm font-medium text-foreground/80 mb-1">Specialty</label>
            <Select value={specialty} onValueChange={setSpecialty}>
              <SelectTrigger id="specialty-filter">
                <SelectValue placeholder="Any Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Specialty</SelectItem>
                {specialties.map((spec) => (
                  <SelectItem key={spec.value} value={spec.value}>
                    {spec.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="language-filter" className="block text-sm font-medium text-foreground/80 mb-1">Language</label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language-filter">
                <SelectValue placeholder="Any Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Language</SelectItem>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.label.toLowerCase()}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
             <label htmlFor="location-filter" className="block text-sm font-medium text-foreground/80 mb-1">Location</label>
            <Input
              id="location-filter"
              type="text"
              placeholder="e.g., City, Country"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleApplyFilters} className="w-full">Apply Filters</Button>
            <Button onClick={handleClearFilters} variant="outline" className="w-auto" title="Clear Filters">
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
