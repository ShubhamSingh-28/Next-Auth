"use client"
import { signOut, useSession } from "next-auth/react";

import Image from "next/image";



export default function Navbar() {
  const {data}=useSession()
  return (
    <div className=" bg-slate-400 shadow-md p-6 flex justify-between " >
      <span>Navbar</span>
      {data?.user?.name}
      <button className=" bg-red-700 py-2 px-4 rounded-xl" onClick={()=>signOut()}>Signout</button>
      <Image src={data?.user?.image} width={80} height={80} />
    </div>
  )
}
