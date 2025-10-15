import { ButtonGeneral } from '@globals';
import { generalConfig } from '@util/generalConfig';
import { Scissors } from 'lucide-react';
import React from 'react'

// Constante con los servicios de barbería
const serviciosBarberia = [
  {
    id: 1,
    titulo: "Primero",
    descripcion: "Aplicar 1 ml (6 a 7 gotas) directamente en el cuero cabelludo seco.",
    duracion: "",
    calificacion: 5.0
  },
  {
    id: 2,
    titulo: "Segundo",
    descripcion: "Masajear suavemente para favorecer la absorción.",
    duracion: "",
    calificacion: 5.0
  },
  {
    id: 3,
    titulo: "Tercero",
    descripcion: "Usar dos veces al día (mañana y noche).",
    duracion: "45 min",
    calificacion: 5.0
  },
  {
    id: 4,
    titulo: "Cuarto",
    descripcion: "No enjuagar; dejar actuar. ⚠️ La constancia es clave para ver resultados.",
    duracion: "45 min",
    calificacion: 5.0
  },
  {
    id: 5,
    titulo: "Quinto",
    descripcion: "5. Resultados esperados: 3-4 meses: reducción de la caída, 6 meses: aparición de nuevos cabellos, 12 meses: resultados visibles y consolidados, Importante: los resultados pueden variar según la persona.",
    duracion: "40 min",
    calificacion: 5.0
  }
];

const ServiciosConAgendamientoInicio = () => {
    return (
        <div>
            
          <div className="p-10">
            <div className="w-full mt-2 flex flex-col justify-center items-center text-center">
              <h1 className={generalConfig.classTitlesGeneral}>
              Modo de uso
              </h1>
            </div>

            {/* Layout para múltiples cards */}
              <div className="flex flex-col items-center justify-center w-full">
                {/* <div className="w-[90%] pb-1 flex flex-col items-center justify-center text-center">
                  <p className={generalConfig.classParagraphGeneral}>
                  Descubre una experiencia de barbería donde cada servicio está pensado para realzar tu estilo personal.
                  </p>
                </div> */}

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


