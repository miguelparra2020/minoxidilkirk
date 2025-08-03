import React from 'react'
import { Scissors, Star } from 'lucide-react'
import { ButtonGeneral } from '@globals'
import { generalConfig } from '@util/generalConfig'
import Barber1Img from '@img/TeamWork/Barbero1.jpg'
import Barber2Img from '@img/TeamWork/Barbero2.jpg'
import Barber3Img from '@img/TeamWork/Barbero3.jpg'
import Barber4Img from '@img/TeamWork/Barbero4.jpg'
import Barber5Img from '@img/TeamWork/Barbero5.jpg'
const Badge = ({ children, className, variant = "default" }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  const variantClasses = variant === "secondary" 
    ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
    : "bg-amber-600 hover:bg-amber-700 text-white border-0";
  
  return (
    <span className={`${baseClasses} ${variantClasses} ${className || ""}`}>
      {children}
    </span>
  )
}
const Card = ({ children, className }) => {
  return (
    <div className={`rounded-lg ${className || ""}`}>
      {children}
    </div>
  )
}

const CardContent = ({ children, className }) => {
  return (
    <div className={className || ""}>
      {children}
    </div>
  )
}


const TeamWork = () => {
  const teamMembers = [
    {
      name: "Carlos",
      role: "Barbero Profesional",
      image: Barber1Img,
      experience: "10+ años",
      specialties: ["Cortes exclusivos", "Fade", "Barba"],
    },
    {
      name: "Elkin",
      role: "Barbero Profesional",
      image: Barber2Img, 
      experience: "10+ años",
      specialties: ["Cortes exclusivos", "Fade", "Barba"],
    },
    {
      name: "Andres",
      role: "Barbero Profesional",
      image: Barber3Img, 
      experience: "10+ años",
      specialties: ["Cortes exclusivos", "Fade", "Barba"],
    },
    {
      name: "Alex",
      role: "Barbero Profesional",
      image: Barber4Img, 
      experience: "10+ años",
      specialties: ["Cortes exclusivos", "Fade", "Barba"],
    },
    {
      name: "Sebas",
      role: "Barbero Profesional",
      image: Barber5Img, 
      experience: "10+ años",
      specialties: ["Cortes exclusivos", "Fade", "Barba"],
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Scissors className="h-8 w-8 text-stone-600" />
            <h2 className={generalConfig.classTitlesGeneral}>
              Nuestro Equipo
            </h2>
          </div>
          <p className={generalConfig.classParagraphGeneral}>
            Profesionales apasionados con años de experiencia, dedicados a brindarte el mejor servicio
          </p>
        </div>

        <div className="flex flex-row flex-wrap justify-center items-center gap-20">
            {teamMembers.map((member, index) => (
                <Card
                key={index}
                className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm"
                >
                <CardContent className="p-0">
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                    <div className="aspect-[1/1] relative w-[300px]">
                        <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Experience Badge */}
                        <Badge className="absolute top-4 right-4 bg-slate-600 hover:bg-slate-700 text-white border-0">
                        <Star className="h-3 w-3 mr-1" />
                        {member.experience}
                        </Badge>
                    </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
                        <p className="text-slate-600 font-semibold text-lg">{member.role}</p>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {member.specialties.map((specialty, idx) => (
                        <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-slate-100 text-slate-700 hover:bg-slate-200"
                        >
                            {specialty}
                        </Badge>
                        ))}
                    </div>
                    </div>
                </CardContent>
                </Card>
            ))}
        </div>


        {/* Description */}
        <div className="mt-16 text-center">
          <div className="bg-white/60  backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <p className="text-lg text-stone-500  leading-relaxed max-w-4xl mx-auto mb-8">
              Somos más que barberos: somos artistas de la imagen.
Con más de 10 años de experiencia, nuestro equipo está formado por profesionales apasionados que dominan tanto las técnicas tradicionales como las más innovadoras del mundo de la barbería.
Cada corte, cada detalle, está pensado para que vivas una experiencia única, personalizada y con el más alto nivel de calidad.
            </p>
            <div className='max-w-sm d-flex justify-center mx-auto'>
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
    </section>
  );
};

export default TeamWork;