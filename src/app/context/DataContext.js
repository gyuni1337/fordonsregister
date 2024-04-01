'use client';

import {createContext, useState, useEffect} from 'react';
import * as api from './api/dbCalls';

export const VehicleContext = createContext(null);

export default function VehicleContextProvider({children}) {

    const fetchVehicles = async () => {
        const vehicles = await api.getVehicles();
        return vehicles;
    }

    const registerVehicle = async (vehicle) => {
        try { await api.registerVehicle(vehicle); console.log(vehicle.registration + ' registered in DB'); } catch(e) { console.log(e); }
    };

    const updateVehicle = async (vehicle) => {
        try { await api.updateVehicle(vehicle); console.log(vehicle.registration + ' updated in DB'); } catch(e) { console.log(e); }
    };

    const deleteVehicle = async (id) => {
       try { await api.deleteVehicle(id); console.log(id + ' deleted from DB'); } catch(e) { console.log(e) }
       
    }

    async function findByRegister(registration) {
        let x = await fetchVehicles();
        return x.filter(vehicle => vehicle.registration === registration);
    }

   return (
    <VehicleContext.Provider 
    value={
      {fetchVehicles, 
      registerVehicle, 
      updateVehicle, 
      deleteVehicle, 
      findByRegister
      }}>
    {children}
    </VehicleContext.Provider>
   )
}

