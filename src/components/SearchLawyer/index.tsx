"use client"
import { useState, useMemo, useEffect } from 'react';
import { Star, MapPin, Phone, Mail, Briefcase, Clock, Award} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import GeoLocationData from '../../api/geo-location-bd.json' assert { type: 'json' };

interface Availability {
  date: string;
  time: string;
}

interface Location {
  country: string;
  division: string;
  district: string;
  upazila: string;
}

interface Lawyer {
  id: string;
  full_name: string;
  designation: string;
  profile_picture: string;
  location: Location;
  email: string;
  mobile_number: string;
  years_of_experience: number;
  specialization: string[];
  availability: Availability[];
}

export interface SearchFilters {
  country: string;
  division: string;
  district: string;
  upazila: string;
}

interface GeoLocationType {
  country: string;
  divisions: {
    name: string;
    districts: {
      name: string;
      upazilas: string[];
    }[];
  }[];
}

const GeoLocation = GeoLocationData[0] as GeoLocationType;

export const SearchLawyer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    country: '',
    division: '',
    district: '',
    upazila: '',
  });
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([]);
  const lawyersPerPage = 6;

  // Fetch lawyers from Payload API
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/lawyers-profile`);        
        if (!response.ok) {
          throw new Error(`API call failed: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        // Adjust this based on your Payload API response structure
        // Payload typically returns data in a docs array within the response
        setLawyers(data.docs || data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch lawyers');
        setLoading(false);
        console.error('Error fetching lawyers:', err);
      }
    };

    fetchLawyers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      
      // Reset dependent fields when parent field changes
      if (name === 'country') {
        newFilters.division = '';
        newFilters.district = '';
        newFilters.upazila = '';
      } else if (name === 'division') {
        newFilters.district = '';
        newFilters.upazila = '';
      } else if (name === 'district') {
        newFilters.upazila = '';
      }
      
      return newFilters;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);

    // Create filtered array based on selected filters
    const filtered = lawyers.filter(lawyer => {
      // If no filters are selected, show all lawyers
      if (!filters.country && !filters.division && !filters.district && !filters.upazila) {
        return true;
      }

      // Check each filter level
      if (filters.country && lawyer.location.country.toLowerCase() !== filters.country.toLowerCase()) {
        return false;
      }

      if (filters.division && lawyer.location.division.toLowerCase() !== filters.division.toLowerCase()) {
        return false;
      }

      if (filters.district && lawyer.location.district.toLowerCase() !== filters.district.toLowerCase()) {
        return false;
      }

      if (filters.upazila && lawyer.location.upazila.toLowerCase() !== filters.upazila.toLowerCase()) {
        return false;
      }

      return true;
    });

    // Update filtered lawyers state
    setFilteredLawyers(filtered);
  };

  // Add this useEffect to initialize filteredLawyers when lawyers are first loaded
  useEffect(() => {
    setFilteredLawyers(lawyers);
  }, [lawyers]);

  const getCountries = () => {
    return [GeoLocation.country];
  };

  const getDivisions = () => {
    return GeoLocation.divisions.map(div => div.name);
  };

  const getDistricts = (division: string) => {
    const selectedDivision = GeoLocation.divisions.find(
      div => div.name.toLowerCase() === division.toLowerCase()
    );
    return selectedDivision ? selectedDivision.districts.map(dist => dist.name) : [];
  };

  const getUpazilas = (division: string, district: string) => {
    const selectedDivision = GeoLocation.divisions.find(
      div => div.name.toLowerCase() === division.toLowerCase()
    );
    const selectedDistrict = selectedDivision?.districts.find(
      dist => dist.name.toLowerCase() === district.toLowerCase()
    );
    return selectedDistrict ? selectedDistrict.upazilas : [];
  };

  const totalPages = Math.ceil(filteredLawyers.length / lawyersPerPage);
  const indexOfLastLawyer = currentPage * lawyersPerPage;
  const indexOfFirstLawyer = indexOfLastLawyer - lawyersPerPage;
  const currentLawyers = filteredLawyers.slice(indexOfFirstLawyer, indexOfLastLawyer);

  const formatLocation = (location: Location) => {
    return `${location.upazila}, ${location.district}, ${location.division}`;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">
      <h3 className="text-xl font-semibold mb-2">Error Loading Lawyers</h3>
      <p>{error}</p>
    </div>;
  }

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
              <div className="relative">
                <select
                  name="country"
                  value={filters.country}
                  onChange={handleChange}
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Country</option>
                  {getCountries().map(country => (
                    <option key={country} value={country.toLowerCase()}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  name="division"
                  value={filters.division}
                  onChange={handleChange}
                  disabled={!filters.country}
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Division</option>
                  {getDivisions().map(division => (
                    <option key={division} value={division.toLowerCase()}>
                      {division}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  name="district"
                  value={filters.district}
                  onChange={handleChange}
                  disabled={!filters.division}
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select District</option>
                  {getDistricts(filters.division).map(district => (
                    <option key={district} value={district.toLowerCase()}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  name="upazila"
                  value={filters.upazila}
                  onChange={handleChange}
                  disabled={!filters.district}
                  className="w-full h-12 px-4 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select Upazila</option>
                  {getUpazilas(filters.division, filters.district).map(upazila => (
                    <option key={upazila} value={upazila.toLowerCase()}>
                      {upazila}
                    </option>
                  ))}
                </select>
              </div>
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
          <div key={lawyer.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-card p-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white mb-4">
                <img
                  src={lawyer.profile_picture.sizes.thumbnail.url}
                  alt="Profile picture"
                />
              </div>
              <h1 className="text-xl font-bold text-gray-700">{lawyer.full_name}</h1>
              <p className="text-gray-700">{lawyer.designation}</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-500 mr-3" />
                  <span className="text-gray-700">{formatLocation(lawyer.location)}</span>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-500 mr-3" />
                  <span className="text-gray-700">{lawyer.email}</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-500 mr-3" />
                  <span className="text-gray-700">{lawyer.mobile_number}</span>
                </div>
                
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-blue-500 mr-3" />
                  <span className="text-gray-700">{lawyer.years_of_experience} Years of Experience</span>
                </div>
                
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-blue-500 mr-3" />
                  <span className="text-gray-700">Specialization: {lawyer.specialization.join(", ")}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-500 mr-3 mt-1" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Availability</h3>
                      {lawyer.availability.map((slot, index) => (
                        <p key={index} className="text-sm text-gray-500">{slot.date}: {slot.time}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
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