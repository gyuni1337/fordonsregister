'use client';

import React, { useContext, useState } from "react";
import { VehicleContext } from "./context/DataContext";

export default function Home() {
  const { findByRegister } = useContext(VehicleContext);
  const [register, setRegister] = useState("");
  const [vehicle, setVehicle] = useState(null);

  const findVehicle = async () => {
    const vehicle = await findByRegister(register);
    console.log(vehicle);
    setVehicle(vehicle);
  }
 // test register - ADK321

  return (
    <>
    <input type="text" className="text-black" onChange={(e) => setRegister(e.target.value)} />
    <button onClick={() => findVehicle(register)}>FIND REGISTER</button>
    { vehicle !== null && vehicle[0] !== null && <h1 className="text-white">{vehicle[0].brand}</h1>}
    </>
  );
}
