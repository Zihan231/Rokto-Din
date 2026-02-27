"use client"; 
import React from 'react'; 
import { HashLoader } from 'react-spinners';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loading({ fullScreen = false, text = "Finding donors..." }) {
  const color = "#8A1119"; 

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm gap-4">
        {/* Added cssOverride */}
        <HashLoader 
            color={color} 
            loading={true} 
            cssOverride={override} 
            size={60} 
        />
        <p className="text-xl font-bold text-[#8A1119] animate-pulse">
            {text}
        </p>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col justify-center items-center py-20 gap-4">
      {/* Added cssOverride */}
      <HashLoader 
        color={color} 
        loading={true} 
        cssOverride={override} 
        size={50} 
      />
      <p className="text-base font-semibold text-gray-500 animate-pulse">
        {text}
      </p>
    </div>
  );
}