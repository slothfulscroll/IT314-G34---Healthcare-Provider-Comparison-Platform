import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Footer } from './landingPage';
import { Appbar } from './dashBoard';

export const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [doctors, setDoctors] = useState([]);  
  const navigate = useNavigate();

  // Fetch doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/patient/doctor-list`, {
          withCredentials: true
        });

        if (response.status === 200) {
          setDoctors(response.data.doctorData);
        }
      } catch (error) {
        console.error('Error in Logging out', error);
      }
    };

    fetchDoctors();
  }, []);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);
  return (
    <div className='mt-2'>
      <Appbar />
      <div className='mx-28 mt-4'>
        <p className='text-gray-600'>Browse through the doctors by specialty.</p>
        <div className='flex flex-row item-start gap-5 mt-5'>
          <div className='flex flex-col gap-4 text-sm text-gray-600'>
            <p
              onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General Physician')}
              className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General Physician" ? "bg-indigo-100 text-black" : ""}`}>
              General Physician
            </p>
            <p
              onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}
              className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>
              Gynecologist
            </p>
            <p
              onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
              className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>
              Dermatologist
            </p>
            <p
              onClick={() => speciality === 'Pediatrician' ? navigate('/doctors') : navigate('/doctors/Pediatrician')}
              className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatrician" ? "bg-indigo-100 text-black" : ""}`}>
              Pediatrician
            </p>
            <p
              onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
              className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>
              Neurologist
            </p>
            <p
              onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
              className={`w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>
              Gastroenterologist
            </p>
          </div>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              (filterDoc && filterDoc.length > 0) ? (
                filterDoc.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/appointment/${item.profile._id}`)}
                    className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='bg-blue-500' src={item.profile.image} alt="" />
                    <div className='p-4'>
                      <div className='flex items-center gap-2 text-sm text-center text-gray text-green-500'>
                        <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                        <p>Available</p>
                      </div>
                      <p className='text-gray-900 text-lg font-medium'>{item.user.userName}</p>
                      <p className='text-gray-600 text-sm'>{item.profile.specialty}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-gray-600'>No doctors found.</p> 
              )
            }
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};


