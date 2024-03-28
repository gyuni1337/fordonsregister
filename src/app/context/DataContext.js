'use client';

import {createContext, useState, useEffect} from 'react';
import * as api from './api/dbCalls';

export const VehicleContext = createContext(null);

export default function VehicleContextProvider({children}) {
    const [allVehicles, setAllVehicles] = useState([]);

    useEffect(() => {
        async function fetchVehicles() {
            const vehicles = await api.getVehicles();
            setAllVehicles(vehicles);
        }

        fetchVehicles();
    }, []);

    const registerVehicle = async (vehicle) => {
        await api.registerVehicle(vehicle);
        const vehicles = await api.getVehicles();
        setAllVehicles(vehicles);
    };

    const updateVehicle = async (vehicle) => {
        await api.updateVehicle(vehicle);
        const vehicles = await api.getVehicles();
        setAllVehicles(vehicles);
    };

    const deleteVehicle = async (id) => {
        await api.deleteVehicle(id);
        const vehicles = await api.getVehicles();
        setAllVehicles(vehicles);
    }

    const findByRegister = async (registration) => {
        return allVehicles.filter(vehicle => vehicle.registration === registration);
    }

   return (
    <VehicleContext.Provider 
    value={
      {allVehicles, 
      registerVehicle, 
      updateVehicle, 
      deleteVehicle, 
      findByRegister
      }}>
    {children}
    </VehicleContext.Provider>
   )
}

