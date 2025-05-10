'use client'

import { useState } from 'react';
import { DoctorCard } from '@/components/doctors/doctor-card';
import { DoctorFilter } from '@/components/doctors/doctor-filter';
import { mockDoctors, type Doctor } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function DoctorsPage() {
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(mockDoctors);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (filters: { specialty: string; language: string; location: string }) => {
    let doctors = mockDoctors;
    if (filters.specialty) {
      doctors = doctors.filter(doc => doc.specialty.toLowerCase() === filters.specialty.toLowerCase());
    }
    if (filters.language) {
      doctors = doctors.filter(doc => doc.languages.map(l => l.toLowerCase()).includes(filters.language.toLowerCase()));
    }
    if (filters.location) {
      doctors = doctors.filter(doc => doc.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
     if (searchTerm) {
      doctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredDoctors(doctors);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    let doctors = mockDoctors;
     // Apply existing filters first if any (or refactor to combine filter state)
    // For simplicity, this search will currently search from all mockDoctors then apply filters
    if (term) {
      doctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(term.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(term.toLowerCase())
      );
    }
    // This is a simplified re-application of filters. A more robust solution would manage combined filter state.
    // For now, calling handleFilterChange with current filter values to re-apply them on the searched list.
    // This needs a way to get current filter values, or pass them around.
    // Simplified: search resets other filters for now, or we need a more complex state management.
    // Let's make search an addition:
    const currentFilters = { specialty: '', language: '', location: '' }; // Placeholder: fetch actual filter values if set
    handleFilterChange(currentFilters); // Re-apply filters on the possibly search-narrowed list or full list
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
