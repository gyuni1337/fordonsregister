'use client';

import React, { useState, useContext} from 'react'
import { VehicleContext } from '../context/DataContext';
import { useRouter} from 'next/navigation';

export default function Page() {

  let [ registration, setRegistration ] = useState('');
  let [ brand, setBrand ] = useState('');
  let [ model, setModel ] = useState('');
  let [ year, setYear ] = useState('');
  let [ color, setColor ] = useState('');
  let [ wheels, setWheels ] = useState('');
  let [ type, setType ] = useState('');
  let [ text, setText ] = useState('');
  let { registerVehicle } = useContext(VehicleContext);
  const router = useRouter();

  function addingVehicle() {
    if(registration === '' || brand === '' || model === '' || year === '' || color === '' || wheels === '' || type === '') {
      setText('Du måste fylla i varje fält!'); 
    } else {
      let vehicle = {registration, brand, model, year, color, wheels, type};
      registerVehicle(vehicle);
      router.push('/list');
    }
  }
  
  return (
    <>
      <div className='w-[800px] text-black rounded-2xl pb-20 bg-white mx-auto mt-20'>
          <h2 className='text-center text-3xl pt-10 font-medium '>Lägg Till Fordon</h2>
          <div className='mx-52 mt-10 flex flex-col gap-2'>
            <input type="text" className='border-2 border-black rounded-xl p-2 w-96 text-xl' value={registration} onChange={(e) => { if(e.target.value.length === 7) return; else { setRegistration(e.target.value) }}} placeholder='Registrationsnummer' />
            <input type="text" className='border-2 border-black rounded-xl p-2 w-96 text-xl' value={brand} onChange={(e) => setBrand(e.target.value)} placeholder='Brand' />
            <input type="text" className='border-2 border-black rounded-xl p-2 w-96 text-xl' value={model} onChange={(e) => setModel(e.target.value)} placeholder='Model' />
            <input type="text" className='border-2 border-black rounded-xl p-2 w-96 text-xl' value={year} onChange={(e) => setYear(e.target.value)} placeholder='Årsmodell' />
            <input type="text" className='border-2 border-black rounded-xl p-2 w-96 text-xl' value={color} onChange={(e) => setColor(e.target.value)} placeholder='Färg' />
            <input type="text" className='border-2 border-black rounded-xl p-2 w-96 text-xl' value={wheels} onChange={(e) => setWheels(e.target.value)} placeholder='Antal Hjul' />
            <input type="text" className='border-2 border-black rounded-xl p-2 w-96 text-xl' value={type} onChange={(e) => setType(e.target.value)} placeholder='Typ' />
            <div className='mx-auto flex flex-col p-0 m-0'>
            <h2 className={`text-2xl mt-2 text-red-600`}>{text}</h2>
            <button onClick={addingVehicle} className='border-2 border-black rounded p-2 mx-auto px-10 mt-5 hover:bg-black hover:text-white transition-colors'>Lägg Till</button>
            </div>
          </div>
      </div>

    </>
  )
}
