import React, { useEffect } from 'react'
import { VehicleContext } from '../context/DataContext'
export default function Page() {

  const {fetchVehicles} = React.useContext(VehicleContext);

  

  useEffect(() => {

    fetchVehicles().then((vehicles) => {
      console.log(vehicles);
    });

  }
  ,[]);


  return (
    <>
    <div className='text-white mx-[24%] mt-32'>
      <div className='flex flex-col gap-2'>
      <h3 className='text-3xl'>Alla Fordon</h3>
        <div>

        </div>
      </div>
    </div>
    
    </>
  )
}
