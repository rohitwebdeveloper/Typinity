'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
// import { useState } from "react";

export default function Header() {

  const isAuthorized = useSelector((state) => state.auth.value);
  const router = useRouter();

  return (
    <div className=" flex justify-between px-[10px] sm:px-6  items-center w-full bg-black ">
      <Link href='/'>
        <img src="/typinity.png" alt="" className=" mt-2 md:mt-0 h-12 sm:h-16 md:h-20" />
      </Link>
        {isAuthorized ? (
      <div className="flex items-center bg-primarybg border sm:border-2 border-secondary  rounded-full shadow-lg">
        <div
          className="text-secondary text-2xl hover:text-black transition"
          onClick={() => router.push('/account') }
        >
          {/* <FaLinkedin /> */}
          <img src="/account.svg" alt="Account" className="h-[30px] sm:h-9 md:h-11" />
      </div>
        </div>
        ) : (
          <button className="bg-cyan-500 text-base hover:bg-white border-2  sm:py-1 border-cyan-500 rounded-md px-2  sm:px-4 " onClick={() => router.push('/sign-in')}>Sign In</button>
        )}
    </div >
  );
}