"use client";
import React from "react";
import { ContainerScroll } from "../../components/ui/container-scroll-animation";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 text-black dark:text-white flex items-center justify-center flex-col">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl mb-7 font-semibold text-black dark:text-white">
                Manage Your Money <br />
                <span className="text-4xl md:text-[5rem] text-blue-800 dark:text-blue-800 font-bold mt-2 leading-none">
                  Expense Advisor
                </span>
              </h1>
            </>
          }
        >
          <Image
            src={`/hero.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top dark:brightness-90"
            draggable={false}
          />
        </ContainerScroll>
      </div>
    </div>
  );
};

export default Hero;
