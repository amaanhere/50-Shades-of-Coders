'use client'

import { useState } from 'react';
import { DoctorCard } from '@/components/doctors/doctor-card';
import { DoctorFilter } from '@/components/doctors/doctor-filter';
import { mockDoctors, type Doctor } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ANY_SPECIALTY_VALUE = "_ANY_SPECIALTY_";
const ANY_LANGUAGE_VALUE = "_ANY_LANGUAGE_";

export default function DoctorsPage() {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(mockDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  // Store current filter values to re-apply them after search
  const [currentFilters, setCurrentFilters] = useState({ specialty: '', language: '', location: '' });


  const handleFilterChange = (filters: { specialty: string; language: string; location: string }) => {
    setCurrentFilters(filters); // Store the latest filters
    let doctors = mockDoctors;

    // Apply search term first if present
    if (searchTerm) {
      doctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply filters
    if (filters.specialty && filters.specialty !== ANY_SPECIALTY_VALUE) {
      doctors = doctors.filter(doc => doc.specialty.toLowerCase() === filters.specialty.toLowerCase());
    }
    if (filters.language && filters.language !== ANY_LANGUAGE_VALUE) {
      doctors = doctors.filter(doc => doc.languages.map(l => l.toLowerCase()).includes(filters.language.toLowerCase()));
    }
    if (filters.location) {
      doctors = doctors.filter(doc => doc.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    
    setFilteredDoctors(doctors);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    // Re-apply filters with the new search term
    // This ensures search and filters work together
    let doctors = mockDoctors;
    if (term) {
      doctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(term.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Apply current filters on the search-filtered list
    if (currentFilters.specialty && currentFilters.specialty !== ANY_SPECIALTY_VALUE) {
      doctors = doctors.filter(doc => doc.specialty.toLowerCase() === currentFilters.specialty.toLowerCase());
    }
    if (currentFilters.language && currentFilters.language !== ANY_LANGUAGE_VALUE) {
      doctors = doctors.filter(doc => doc.languages.map(l => l.toLowerCase()).includes(currentFilters.language.toLowerCase()));
    }
    if (currentFilters.location) {
      doctors = doctors.filter(doc => doc.location.toLowerCase().includes(currentFilters.location.toLowerCase()));
    }
    setFilteredDoctors(doctors);
  };


  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-primary">Find Your Doctor</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Search and filter to find the healthcare professional that meets your needs.
        </p>
      </header>

      <div className="sticky top-16 bg-background/90 backdrop-blur-md py-4 z-10 rounded-lg shadow">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by doctor name or specialty..."
            className="w-full pl-10 py-3 text-base"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <DoctorFilter onFilterChange={handleFilterChange} />
      </div>
      
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No doctors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
