'use client';

import React, {useContext, useState, useEffect} from 'react'
import { VehicleContext } from '../../context/DataContext';
import { useRouter } from 'next/navigation';

export default function Page({params}) {
    const { findByRegister } = useContext(VehicleContext);
    const { deleteVehicle } = useContext(VehicleContext);
    let [ vehicle, setVehicle ] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchVehicle() {
            const data = await findByRegister(params.reg);
            setVehicle(data[0]);
        }

        fetchVehicle();
    }, []);



    function deletingVehicle() {
        deleteVehicle(vehicle.id);
        router.push('/list');
    }

  return (
    <>
    { vehicle !== undefined ? (
    <div className='flex justify-center w-max mx-auto text-center hover:-translate-y-1 transition-transform mt-32 '>
      <div className=' h-[600px] text-black p-20 bg-white rounded-2xl shadow-md shadow-white'>
        <h1 className='text-3xl mb-5'>Fordonsdata</h1>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 justify-center items-center'>
            <p className='text-xl'>Registreringsnummer:</p>
            <div className='bg-gray-200 p-2 rounded-lg'>{vehicle.registration}</div>
          </div>
          <div className='flex items-center justify-center gap-2'>
            <p className='text-xl'>Brand:</p>
            <div className='bg-gray-200 p-2 rounded-lg'>{vehicle.brand}</div>
          </div>
          <div className='flex gap-2 justify-center items-center'>
            <p className='text-xl'>Årsmodell:</p>
            <div className='bg-gray-200 p-2 rounded-lg'>{vehicle.year}</div>
          </div>
          <div className='flex gap-2 justify-center items-center'>
            <p className='text-xl'>Färg:</p>
            <div className='bg-gray-200 p-2 rounded-lg'>{vehicle.color}</div>
          </div>
          <div className='flex gap-2 justify-center items-center'>
            <p className='text-xl'>Antal hjul:</p>
            <div className='bg-gray-200 p-2 px-4 rounded-lg'>{vehicle.wheels}</div>
          </div>
          <div className='flex gap-2 justify-center items-center'>
            <p className='text-xl'>Typ:</p>
            <div className='bg-gray-200 p-2 rounded-lg'>{vehicle.type}</div>
          </div>
          <div className='flex flex-col gap-2 justify-center mt-10'>
                <div>
                <button className='border-2 border-black p-1 px-10 rounded-lg text-xl hover:bg-black hover:text-white transition-colors duration-200'>Redigera</button>
                </div>
                <div>
                <button  onClick={deletingVehicle} className='border-2 border-black p-1 px-3 rounded-lg text-xl hover:bg-black hover:text-white transition-colors duration-200'>Radera fordonet</button>
                </div>
                
          </div>
        </div>

      </div>
    </div>

    ) : 
      <>

      </>
  }
    </>
  )
}
