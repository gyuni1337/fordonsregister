'use client';

import React, { useEffect, useState } from 'react'
import { VehicleContext } from '../context/DataContext'
import { useRouter } from 'next/navigation'
export default function Page() {

  const {fetchVehicles} = React.useContext(VehicleContext);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [ vehicles, setVehicles ] = useState([]);
    const [query, setQuery] = useState('');
   let pagesArr = [];

  function setupData(data) {
    pagesArr = [];
    let tempArr = [];
    for (let i = 0; i < data.length; i++) {
      tempArr.push(data[i]);

      if (tempArr.length === 8 || i === data.length - 1) {
        pagesArr.push(tempArr.slice());
        tempArr = [];
      }
    }
    return pagesArr
  }

  const [showNumbers, setShowNumbers] = useState(false);

  useEffect(() => {

    fetchVehicles().then((vehicles) => {
      let pages = setupData(vehicles);
      if (pages.length > 1 ) setShowNumbers(true);
      setData(pages);
    });

  }
  ,[]);

    useEffect(() => {

    if (!query || query == '') {
      // console.log(data.sort((a, b) => a.id - b.id));
      setVehicles(data);
      console.log(vehicles);
    } else {
      const filteredVehicles = data.map((page) => {
        return page.filter((vehicle) => {
          return vehicle.brand.toLowerCase().includes(query.toLowerCase()) || vehicle.model.toLowerCase().includes(query.toLowerCase()) || vehicle.registration.toLowerCase().includes(query.toLowerCase()) || vehicle.year === query.toLowerCase();
        });
      });
      let all = [];
      for (let i = 0; i < filteredVehicles.length; i++) {
        for (let j = 0; j < filteredVehicles[i].length; j++) {
          all.push(filteredVehicles[i][j]);
        }
      }
      const allSet = setupData(all);
      console.log(allSet);
      // console.log(setupData(filteredMovies));
      setVehicles(allSet);
    }

  }, [query, data]);

    const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
    <div className='text-white mx-[24%] mt-32'>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-5 mb-5'>
          <h3 className='text-3xl'>Alla Fordon</h3>
          <input type='text' className='text-black p-2 px-4 rounded-lg' placeholder='Sök fordon' onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className='text-white flex flex-col gap-3'>
          {vehicles.length > 0 ? vehicles[currentPage].map((vehicle, index) => {
            console.log(vehicle);
            return (
              <div className='flex gap-2 border-2 justify-between border-white p-2 rounded' key={index}>
                <div className='flex items-center gap-2'>
                  <h3 className='text-xl'>{vehicle.brand}</h3>
                  <p className='text-xl'>{vehicle.model} | </p>
                  <p className='text-xl text-gray-400'>{vehicle.registration} |</p>
                  <p className='text-xl'>{vehicle.year}</p>
                </div>
                <div className='flex items-center gap-3 mr-5'>
                <button onClick={() => {router.push('/edit/' + vehicle.registration)}} className='text-lg underline underline-offset-2'>Redigera</button>
                <button onClick={() => {router.push('/lookup/' + vehicle.registration)}} className='text-lg underline underline-offset-2'>Visa</button>
                </div>
              </div>
            )
              }) : <p className='text-xl mt-5'>No Such Vehicle Entry Found...</p> }

            {
          showNumbers && 
          <div className='flex gap-2'>
            {Array(Math.ceil(vehicles.length)).fill().map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentPage(index)}
                className={`p-1 px-2 rounded ${currentPage === index ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        }
        </div>
      </div>
    </div>
    
    </>
  )
}
