'use client';

import React, {useContext, useState, useEffect} from 'react'
import { VehicleContext } from '../../context/DataContext';

export default function Page({params}) {
    const { findByRegister } = useContext(VehicleContext);
    let [ vehicle, setVehicle ] = useState([]);

    useEffect(() => {
        async function fetchVehicle() {
            const data = await findByRegister(params.reg);
            console.log(vehicle);
            setVehicle(data[0]);
        }

        fetchVehicle();
    }, []);

  return (
    <div>{ vehicle.length !== 0 && <h1>{vehicle.brand}</h1>}</div>
  )
}
