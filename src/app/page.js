'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {

 const router = useRouter();
 const [register, setRegister] = useState("");

 const [showMenu, setShowMenu ] = useState(false);
 const [ searchText, setSearchText ] = useState("");

  return (
    <>
    <div className="flex flex-col mt-52 items-center ">
      <div>
      <h2 className="text-3xl mb-2 hover:-translate-y-1 transition-all cursor-default ">FORDONSREGISTER</h2>
      <div className="flex gap-2 items-center">
      <div className="flex flex-col">
      <input type="text" className="text-black p-3 w-[500px] h-12 rounded-lg text-xl" onChange={(e) => setRegister(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter' && register !== "") router.push('/register/' + register) }} onMouseDown={() => setSearchText('Tryck på enter för att söka!')} onMouseLeave={() => setSearchText("")} placeholder="Registrationsnummer" />
      { searchText !== "" && <p className="text-xl absolute mt-14 text-white">{searchText}</p>}      
      </div>
      <div className="flex flex-col">
      <Image src="/list.png" onClick={() => setShowMenu(!showMenu)} className="bg-white transition-all p-2 rounded-xl hover:-translate-y-1 cursor-pointer"  width={50} height={30} alt="Dashboard Icon" />
        { showMenu && (
          <div className="absolute p-2 px-4 text-black flex flex-col -ml-32 rounded-xl mt-14 bg-white h-36 w-44">
              <h2 className="text-2xl font-medium mt-2">Menu</h2>
              <ul className="flex flex-col gap-1 mt-2">
                <li className="text-xl cursor-pointer hover:-translate-y-0.5 transition-transform" ><Link href={'/add'}>Lägg Till</Link></li>
                <li className="text-xl cursor-pointer hover:-translate-y-0.5 transition-transform" ><Link href={'/list'}>Visa Alla</Link></li>
              </ul>
          </div>
        )}
      </div>
      </div>
      </div>
    </div>
    </>
  );
}
