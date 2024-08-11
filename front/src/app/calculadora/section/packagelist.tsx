import React from 'react';
import { IBusTour } from '@/interface/IBusTour';

interface PackageListProps {
  tours: IBusTour[];
  filteredTours: IBusTour[];
  selectedPackage: IBusTour | null;
  handleSelectPackage: (tour: IBusTour) => void;
}

const PackageList: React.FC<PackageListProps> = ({ tours, filteredTours, selectedPackage, handleSelectPackage }) => {
  return (
    <div className="w-[50vw] max-h-[50vh] overflow-y-auto">
      <div className="grid grid-cols-3 gap-5">
        {filteredTours.map((tour) => {
          const startDate = new Date(tour.fecha_ingreso);
          const endDate = new Date(tour.fecha_egreso);
  
          if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error(`Fechas inválidas para el tour con ID ${tour.id}`);
            return null;
          }
  
          const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
          const tourDuration = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
          let noches = 0;
          if (tour.transportType === 'bus') {
            noches = tourDuration - 2;
          } else if (tour.transportType === 'plane') {
            noches = tourDuration - 1;
          }
  
          return (
            <div
              key={tour.id}
              className={` rounded-xl p-5 shadow-2xl cursor-pointer  ${
                selectedPackage && selectedPackage.id === tour.id ? 'bg-red-500' : 'bg-white'
              }`}
              style={{
                backgroundImage: `url(${tour.imgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={() => handleSelectPackage(tour)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-center text-white bg-gradient-to-bl from-purple-600 via-indigo-600 to-indigo-500 p-1.5 rounded-xl text-sm whitespace-nowrap overflow-hidden text-ellipsis max-w-[160px]">
                    {tour.title}
                    <p className="text-left">
                      {tourDuration} días, {noches} noches
                    </p>
                  </h3>
  
                  <div className="mt-1 text-center p-1 border  rounded-xl bg-blue-950 text-white">
                    <p>Precio: ${tour.price.toLocaleString()}</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedPackage ? selectedPackage.id === tour.id : false}
                  readOnly
                  className="ml-2 rounded-full bg-gray-100 w-4 h-4 text-indigo-500 focus:ring-0"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
  
};

      export default PackageList;
