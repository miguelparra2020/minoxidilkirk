import { ButtonGeneral } from '@globals';
import { generalConfig } from '@util/generalConfig';
import { Scissors } from 'lucide-react';
import React from 'react'

// Constante con los servicios de barbería
const serviciosBarberia = [
  {
    id: 1,
    titulo: "Corte de pelo básico",
    descripcion: "Corte clásico y preciso, adaptado a tu estilo personal. Incluye lavado y acabado profesional para una presentación impecable.",
    duracion: "30 min",
    calificacion: 5.0
  },
  {
    id: 2,
    titulo: "Corte y barba combo",
    descripcion: "Servicio integral que combina corte de cabello y perfilado de barba. Incluye aplicación de aceites esenciales y toalla caliente para una experiencia relajante.",
    duracion: "60 min",
    calificacion: 5.0
  },
  {
    id: 3,
    titulo: "Corte con difuminado",
    descripcion: "Corte moderno con técnica de degradado (fade) para un acabado limpio y elegante. Ideal para quienes buscan estilo y precisión.",
    duracion: "45 min",
    calificacion: 5.0
  },
  {
    id: 4,
    titulo: "Corte de barba",
    descripcion: "Diseño y recorte detallado de barba, con perfilado a navaja y productos hidratantes para realzar tu estilo con distinción.",
    duracion: "45 min",
    calificacion: 5.0
  },
  {
    id: 5,
    titulo: "Corte niño",
    descripcion: "Corte especializado para niños, cómodo y personalizado, ideal para resaltar su estilo con un toque moderno y fresco.",
    duracion: "40 min",
    calificacion: 5.0
  },
  {
    id: 6,
    titulo: "Cerquillo",
    descripcion: "Definición precisa del contorno frontal del cabello. Perfecto para mantener tu estilo impecable entre cortes.",
    duracion: "15 min",
    calificacion: 5.0
  },
  {
    id: 7,
    titulo: "Cejas",
    descripcion: "Diseño y perfilado de cejas con navaja para un acabado limpio, natural y armonioso con tu rostro.",
    duracion: "20 min",
    calificacion: 5.0
  },
  {
    id: 8,
    titulo: "Línea",
    descripcion: "Marcación y diseño de líneas en el corte para resaltar tu estilo con detalles definidos y modernos.",
    duracion: "10 min",
    calificacion: 5.0
  },
  {
    id: 9,
    titulo: "Retoque degradado",
    descripcion: "Ajuste del degradado para mantener el corte fresco, limpio y bien definido sin necesidad de un corte completo.",
    duracion: "10 min",
    calificacion: 5.0
  }
];

const ServiciosConAgendamientoInicio = () => {
    return (
        <div>
            
          <div className="p-10">
            <div className="w-full mt-2 flex flex-col justify-center items-center text-center">
              <h1 className={generalConfig.classTitlesGeneral}>
              Servicios de barbería diseñados para ti
              </h1>
            </div>

            {/* Layout para múltiples cards */}
              <div className="flex flex-col items-center justify-center w-full">
                <div className="w-[90%] pb-1 flex flex-col items-center justify-center text-center">
                  <p className={generalConfig.classParagraphGeneral}>
                  Descubre una experiencia de barbería donde cada servicio está pensado para realzar tu estilo personal.
                  </p>
                </div>

                {/* Card de Servicios con Agendamiento */}
                <div className="w-full my-8">
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    {serviciosBarberia.map((servicio) => (
                      <div 
                        key={servicio.id} 
                        className={`
                          bg-white p-5 
                          rounded 
                          shadow-lg 
                          border
                          text-center
                          w-full sm:w-[45%] md:w-[30%] 
                          flex flex-col items-center
                          mb-4
                        `}
                      >
                        <div className="mb-4 p-3 bg-stone-500 rounded-full">
                          <Scissors className="h-6 w-6 text-neutral-200" />
                        </div>
                        
                        
                        <h3 className="text-slate-800 font-semibold text-lg mb-2">{servicio.titulo}</h3>
                        <p className="text-stone-500 mb-4 text-sm">{servicio.descripcion}</p>
                        
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                <ButtonGeneral
                    as={generalConfig.Home.Wellcome.ButtonGeneralAs}
                    href={generalConfig.Home.Wellcome.ButtonGeneralHref}
                    className={generalConfig.Home.Wellcome.ButtonGeneralClass}
                    children={generalConfig.Home.Wellcome.ButtonGeneralName}
                    iconActive={generalConfig.Home.Wellcome.ButtonGeneralIconActive}
                />
                </div>
              </div>
          </div>
        </div>
    )
}

export default ServiciosConAgendamientoInicio


