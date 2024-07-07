'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TbBrandGoogleHome } from "react-icons/tb";
import AgencyModal from './AgencyModal';

interface Agency {
  id: string;
  name: string;
  description: string;
  location: string;
  phone: string;
  email: string;
}

const CardAgency: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get('https://fivetart-travel-kafg.onrender.com/agency');
        console.log('Fetched agencies:', response.data);
        setAgencies(response.data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };

    fetchAgencies();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
  };

  return (
    <div className="relative p-4 bg-lime-600 hover:bg-lime-700 rounded-2xl shadow-2xl cursor-pointer text-white w-60 h-[130px] hover:shadow-2xl transition-shadow" onClick={openModal}>
      <div className="absolute top-2 left-2 bg-white rounded-full p-2">
        <TbBrandGoogleHome className="text-lime-700" size={24} />
      </div>
      <div className="absolute bottom-2 right-2">
        <TbBrandGoogleHome className="text-orange-500" size={24} />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-5xl font-bold">{agencies.length}</p>
        <p className="text-lg">Agencias</p>
      </div>
      {isModalOpen && (
        <AgencyModal agencies={agencies} onClose={closeModal} />
      )}
    </div>
  );
};

export default CardAgency;
