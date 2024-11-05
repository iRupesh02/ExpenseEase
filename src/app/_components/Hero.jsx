"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
 

const Hero = () => {
  return (
    <div className='bg-gray-50 flex items-center justify-center flex-col'>
       <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Manage Your Money with AI - Driven Personal  <br />
              <span className="text-4xl md:text-[5rem] text-blue-800 font-bold mt-2 leading-none">
                Expense Advisor
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/dashboard.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
    </div>
  )
}

export default Hero
