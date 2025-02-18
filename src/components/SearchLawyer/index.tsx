
"use client"
import { useState, useMemo } from 'react';
import { Star, MapPin, Phone, Mail, Briefcase, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export interface SearchFilters {
  country: string;
  division: string;
  District: string;
  upazilla: string;
}

export const SearchLawyer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<SearchFilters>({
    country: '',
    division: '',
    District: '',
    upazilla: '',
  });
  const lawyersPerPage = 6;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const lawyers = [
    { id: 1, name: 'Sarah Johnson', location: 'Dhaka, Bangladesh', experience: 8, rating: 4.8, hourlyRate: '200-300', reviews: 278, specialties: ['Corporate Law', 'Intellectual Property'] },
    { id: 2, name: 'Michael Chen', location: 'Chittagong, Bangladesh', experience: 12, rating: 4.9, hourlyRate: '250-350', reviews: 342, specialties: ['Family Law', 'Criminal Law'] },
    { id: 3, name: 'Emma Thompson', location: 'Sylhet, Bangladesh', experience: 6, rating: 4.6, hourlyRate: '150-250', reviews: 156, specialties: ['Employment Law', 'Civil Rights'] },
  ];

  const filteredLawyers = useMemo(() => {
    return lawyers.filter(lawyer =>
      (!filters.division || lawyer.location.toLowerCase().includes(filters.division.toLowerCase())) &&
      (!filters.District || lawyer.location.toLowerCase().includes(filters.District.toLowerCase()))
    );
  }, [lawyers, filters]);

  const totalPages = Math.ceil(filteredLawyers.length / lawyersPerPage);
  const indexOfLastLawyer = currentPage * lawyersPerPage;
  const indexOfFirstLawyer = indexOfLastLawyer - lawyersPerPage;
  const currentLawyers = filteredLawyers.slice(indexOfFirstLawyer, indexOfLastLawyer);

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Find the Right Legal Expert</h1>
        <p className="text-lg text-gray-600">Connect with experienced lawyers who can help you navigate your legal challenges</p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['country', 'division', 'District', 'upazilla'].map((field) => (
                <div key={field} className="relative">
                  <select
                    name={field}
                    value={filters[field as keyof SearchFilters]}
                    onChange={handleChange}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">{`Select ${field.charAt(0).toUpperCase() + field.slice(1)}`}</option>
                    {field === 'country' && <option value="bangladesh">Bangladesh</option>}
                    {field === 'division' && ['Dhaka', 'Chittagong', 'Sylhet'].map(div => (
                      <option key={div} value={div.toLowerCase()}>{div}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                Find Lawyers
              </button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentLawyers.map(lawyer => (
          <Card key={lawyer.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{lawyer.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{lawyer.location}</span>
                  </div>
                </div>
                <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-semibold">{lawyer.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({lawyer.reviews})</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Briefcase className="h-4 w-4 mr-2" />
                  <span>{lawyer.experience} years experience</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>${lawyer.hourlyRate}/hour</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {lawyer.specialties.map(specialty => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
                Contact Now
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'border hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
