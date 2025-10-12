import React from 'react'
import { ArrowBigLeftDash, ArrowBigRightDash, Calendar, MapPin, Star } from "lucide-react"
import { Badge } from "../../../../../ui/badge"
import { Button } from "../../../../../ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../../../../../ui/card"
import { RenderInitialQuestionComponentProps } from "../../../interfaces/modelsStage4"
import { useStore } from '@nanostores/react'
import { crearStore } from 'src/stores/crearStore'

interface ServiceCardProps {
  id: string
  name: string
  category: string
  description: string
  rating: number
  location: string
  imageUrl: string
  isPopular?: boolean
  availableFrom?: string
  availableTo?: string
}

function ServiceCard({
  id = "1",
  name = "Casa de Playa Familiar",
  category = "Alquiler de Casas",
  description = "Hermosa casa de playa para vacaciones familiares, totalmente equipada y cerca del mar.",
  rating = 4.7,
  location = "Cartagena, Colombia",
  imageUrl = "/placeholder.svg?height=200&width=400",
  isPopular = false,
  availableFrom = "2024-07-01",
  availableTo = "2024-07-15",
}: ServiceCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg w-full max-w-sm">
      <div className="relative">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={name}
          className="h-48 w-full object-cover"
        />
        {isPopular && <Badge className="absolute right-2 top-2 bg-blue-500 hover:bg-blue-600">Popular</Badge>}
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              {category}
            </Badge>
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-blue-400 text-blue-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center text-sm mb-1">
          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{location}</span>
        </div>
        {(availableFrom && availableTo) && (
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              Disponible: {availableFrom} al {availableTo}
            </span>
          </div>
        )}
      </CardContent>    

      <CardFooter className="bg-muted/20 pt-2">
        <div className="flex w-full gap-2">
          <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white flex gap-2 px-4 py-2 rounded-lg">
            <Calendar className="h-4 w-4" />
            Reservar
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export const RenderCardSearchInCategory4 = ({ setCurrentStep, handlePrev }: 
    RenderInitialQuestionComponentProps) => {
      const store = useStore(crearStore)
    const services = [
        {
          id: "1",
          name: "Casa de Playa Familiar",
          category: "Alquiler de Casas",
          description: "Hermosa casa de playa para vacaciones familiares, totalmente equipada y cerca del mar.",
          rating: 4.7,
          location: "Cartagena, Colombia",
          imageUrl: "https://flowbite.com/docs/images/examples/image-3@2x.jpg",
          isPopular: true,
          availableFrom: "2024-07-01",
          availableTo: "2024-07-15",
        }
    ]

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center">
                {services.map((service) => (
                    <ServiceCard key={service.id} {...service} />
                ))}
            </div>
            <div className="flex flex-row items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setCurrentStep("cards-inicio-web")}
          className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
        >
          <ArrowBigLeftDash className="w-4 h-4" />
          atrás
        </button>
          <button
            type="button"
            onClick={() => setCurrentStep("cards-search-in-category")}
            className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
          >
              <ArrowBigRightDash className="w-4 h-4" />
              Siguiente personalización
          </button>
        </div>
        </div>
    )
}