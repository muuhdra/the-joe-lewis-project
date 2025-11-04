import Reveal from "./Reveal"

import React from "react";
import heroBg from "/image/background_image.jpg"; // ton background
import square from "/image/square.png"; // ton illustration

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay sombre et léger */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 text-white px-6">
        {/* Titre principal */}
        <h1 className="text-5xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          THE JOE LEWIS PROJECT
        </h1>

        {/* Petite illustration sous le titre */}
        <div className="flex justify-center mb-6">
          <img
            src={square}
            alt="Decoration"
            className="h-56 md:h-56 object-contain opacity-95 drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
