'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdSupportAgent } from "react-icons/md";
import NotificationModal from './NotificationModal';

interface Notification {
  username: string;
  message: string;
  mail: string;
  telefono: string;
}

const CardContact: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://fivetart-travel-kafg.onrender.com/contact');
        console.log('Fetched notifications:', response.data);

        // Verificar que response.data es un array, o es el mensaje "No hay mensajes"
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else if (response.data === 'No hay mensajes') {
          setNotifications([]);
        } else {
          console.error('Unexpected response format:', response.data);
          setNotifications([]);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setNotifications([]); // Manejar el error estableciendo el estado en un array vacío
      }
    };

    fetchNotifications();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
  };

  return (
    
    <div className="relative p-4  bg-white rounded-2xl shadow-xl cursor-pointer text-gray-600 w-60 h-[110px] hover:bg-slate-50 hover:shadow-2xl transition-shadow" onClick={openModal}>
      <div className="absolute top-2 left-2 bg-white rounded-full p-2  ">
        <MdSupportAgent className="text-lime-700  rounded-3xl" size={36} />
      </div>
      <div className="absolute bottom-2 right-2">
        <MdSupportAgent className="text-teal-500 " size={36} />
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-5xl font-bold text-shadow-medium">{notifications.length}</p>
        <p className="text-xl font-semibold text-shadow-medium">Soporte</p>
      </div>
      {isModalOpen && (
        <NotificationModal notifications={notifications} onClose={closeModal} />
      )}
    </div>
  );
};

export default CardContact;