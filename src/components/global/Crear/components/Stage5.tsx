import React from "react"
import { useState } from "react"
import {
    HandPlatter,
    ArrowBigLeftDash,
    ArrowBigRightDash,
    Sparkles,
    Square,
    CircleDashed,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Type,
    FileText,
    Layers,
    ImageIcon,
    ShoppingCart,
    Check,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Card, CardContent } from "./ui/card"
import CardGeneral from "./CardGeneral"
import { ColorSettings, StageProps } from "../interfaces/models"

type CustomizationStep =
  | "initial-question"
  | "areas-list"
  | "card-customization"
  | "intro-customization"
  | "product-card-customization"
  | "product-detail-customization"
  | "cart-item-customization"
  | "complete"
  | "finaly-process"

interface CardSettings {
    // Bordes
    hasBorder: boolean
    borderColor: string
    borderShade: number
    borderWidth: string
  
    // Esquinas
    rounded: string
  
    // Sombra
    shadow: string
  
    // Alineación del texto
    textAlign: "text-left" | "text-center" | "text-right"
  
    // Contenido editable para la vista previa
    title: string
    description: string
    icon: string
  
    // Opción para mostrar imagen
    showImage: boolean
  }

const Stage5: React.FC<StageProps> = ({ totalStages, currentStage, handleNext, handlePrev }) => {
  // Opciones de iconos
const iconOptions = [
    { name: "Estrella", value: "star" },
    { name: "Corazón", value: "heart" },
    { name: "Pulgar arriba", value: "thumbs-up" },
    { name: "Verificado", value: "check-circle" },
    { name: "Bombilla", value: "lightbulb" },
    { name: "Regalo", value: "gift" },
    { name: "Calendario", value: "calendar" },
    { name: "Gráfico", value: "bar-chart" },
  ]
  
  // Definición de colores con sus valores de Tailwind
  const colorOptions = [
    { name: "Red", value: "red" },
    { name: "Orange", value: "orange" },
    { name: "Amber", value: "amber" },
    { name: "blue", value: "blue" },
    { name: "Lime", value: "lime" },
    { name: "Green", value: "green" },
    { name: "Emerald", value: "emerald" },
    { name: "Teal", value: "teal" },
    { name: "Cyan", value: "cyan" },
    { name: "Sky", value: "sky" },
    { name: "Blue", value: "blue" },
    { name: "Indigo", value: "indigo" },
    { name: "Violet", value: "violet" },
    { name: "Purple", value: "purple" },
    { name: "Fuchsia", value: "fuchsia" },
    { name: "Pink", value: "pink" },
    { name: "Rose", value: "rose" },
    { name: "Slate", value: "slate" },
    { name: "Zinc", value: "zinc" },
    { name: "Gray", value: "gray" },
    { name: "Neutral", value: "neutral" },
    { name: "Stone", value: "stone" },
  ]
  
  // Opciones de intensidad de color
  const colorShadeOptions = [
    { name: "100", value: 100 },
    { name: "200", value: 200 },
    { name: "300", value: 300 },
    { name: "400", value: 400 },
    { name: "500", value: 500 },
    { name: "600", value: 600 },
    { name: "700", value: 700 },
    { name: "800", value: 800 },
    { name: "900", value: 900 },
  ]
  
  // Opciones de border radius
  const roundedOptions = [
    { name: "None", value: "rounded-none" },
    { name: "Small", value: "rounded-sm" },
    { name: "Default", value: "rounded" },
    { name: "Medium", value: "rounded-md" },
    { name: "Large", value: "rounded-lg" },
    { name: "Extra Large", value: "rounded-xl" },
    { name: "2XL", value: "rounded-2xl" },
    { name: "3XL", value: "rounded-3xl" },
  ]

  // Opciones de ancho de borde
const borderWidthOptions = [
    { name: "1px", value: "border" },
    { name: "2px", value: "border-2" },
    { name: "4px", value: "border-4" },
    { name: "8px", value: "border-8" },
  ]
  
  // Opciones de sombra
  const shadowOptions = [
    { name: "None", value: "shadow-none" },
    { name: "Small", value: "shadow-sm" },
    { name: "Default", value: "shadow" },
    { name: "Medium", value: "shadow-md" },
    { name: "Large", value: "shadow-lg" },
    { name: "Extra Large", value: "shadow-xl" },
    { name: "2XL", value: "shadow-2xl" },
  ]


  const progressPorcent = Math.floor((currentStage / totalStages) * 100)
  const [currentStep, setCurrentStep] = useState<CustomizationStep>("initial-question")
  console.log("currentStep", currentStep)
  const [isLoading, setIsLoading] = useState(false)
  const [cardSettings, setCardSettings] = useState<CardSettings>({
    hasBorder: true,
    borderColor: "gray",
    borderShade: 200,
    borderWidth: "border",
    rounded: "rounded-xl",
    shadow: "shadow-md",
    textAlign: "text-left",
    title: "Nuestros Productos",
    description: "Descubra nuestra selección de productos de alta calidad diseñados para satisfacer sus necesidades.",
    icon: "shopping-cart",
    showImage: true,
  })




  const handleSettingsChange = <K extends keyof CardSettings>(key: K, value: CardSettings[K]) => {
    setCardSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

   // Renderizar el icono seleccionado
   const renderIcon = () => {
    switch (cardSettings.icon) {
      case "star":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        )
      case "heart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </svg>
        )
      case "thumbs-up":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M7 10v12"></path>
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
          </svg>
        )
      case "check-circle":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        )
      case "lightbulb":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
            <path d="M9 18h6"></path>
            <path d="M10 22h4"></path>
          </svg>
        )
      case "gift":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
          </svg>
        )
      case "calendar":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        )
      case "bar-chart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        )
      case "shopping-cart":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8"
          >
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
        )
    }
  }

  // Generar clases para la card de vista previa
  const cardClasses = `
    overflow-hidden
    ${cardSettings.rounded}
    ${cardSettings.shadow}
    ${cardSettings.hasBorder ? `${cardSettings.borderWidth} border-${cardSettings.borderColor}-${cardSettings.borderShade}` : ""}
    bg-white  w-[340px]
  `

  // Generar clases para el texto
  const textClasses = `${cardSettings.textAlign}`

  // Renderizar la pregunta inicial
  const renderInitialQuestion = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-8">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
        <HandPlatter className="w-8 h-8" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-zinc-900">
          ¿Va a prestar servicios a sus usuarios?
        </h3>
        <p className="text-sm text-zinc-500  max-w-xs">
          Esta información nos ayudará a personalizar su experiencia de comercio electrónico.
        </p>
      </div>

      <div className="w-full max-w-xs">
        <Select
          onValueChange={(value) => {
            if (value === "si") {
              setCurrentStep("areas-list")
            }else{
             setCurrentStep("finaly-process")
            }
          }}
        >
          <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
            <SelectValue placeholder="Seleccione una opción" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="si">Sí, prestaré servicios a mis clientes</SelectItem>
            <SelectItem value="no">No, no prestaré servicios a mis clientes</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-row items-center justify-center gap-2">
        <button
        type="button"
        onClick={() => handlePrev()}
        className="w-full h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
      >
        <ArrowBigLeftDash className="w-4 h-4" />
        atrás
      </button>
        </div>
      </div>
      
    </div>
  )

  // Renderizar la lista de áreas a personalizar
  const renderAreasList = () => (
    <div className="flex flex-col p-6 space-y-6">
      <div className="text-center space-y-2 mb-4">
        <h3 className="text-lg font-medium text-zinc-900 ">Áreas de personalización</h3>
        <p className="text-sm text-zinc-500 ">
          Vamos a personalizar las siguientes áreas de su tienda en línea:
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 border border-blue-200  rounded-xl bg-blue-50  flex items-start gap-3">
          <div className="mt-0.5 bg-blue-100  rounded-full p-1">
            <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-medium">
              1
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-900 ">
              Personalización de introducción a la compra de productos
            </h4>
            <p className="text-xs text-zinc-500  mt-1">
              Personalice la sección de introducción que aparecerá al inicio de su página de productos.
            </p>
          </div>
        </div>

        <div className="p-4 border border-blue-200  rounded-xl bg-blue-50 flex items-start gap-3">
          <div className="mt-0.5 bg-blue-100  rounded-full p-1">
            <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-medium">
              2
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-900 ">
              Personalización de la card de productos
            </h4>
            <p className="text-xs text-zinc-500  mt-1">
              Defina cómo se mostrarán sus productos en el catálogo de su tienda.
            </p>
          </div>
        </div>

        <div className="p-4 border border-blue-200  rounded-xl bg-blue-50  flex items-start gap-3">
          <div className="mt-0.5 bg-blue-100  rounded-full p-1">
            <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-medium">
              3
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-900 ">
              Personalización del detalle de producto
            </h4>
            <p className="text-xs text-zinc-500  mt-1">
              Configure la página de detalle donde los clientes verán toda la información de cada producto.
            </p>
          </div>
        </div>

        <div className="p-4 border border-blue-200  rounded-xl bg-blue-50  flex items-start gap-3">
          <div className="mt-0.5 bg-blue-100  rounded-full p-1">
            <span className="flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-medium">
              4
            </span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-zinc-900 ">
              Personalización del item en el carrito de compras
            </h4>
            <p className="text-xs text-zinc-500  mt-1">
              Personalice cómo se verán los productos añadidos al carrito de compras.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
<button
        type="button"
        onClick={() => setCurrentStep("initial-question")}
        className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
      >
        <ArrowBigLeftDash className="w-4 h-4" />
        atrás
      </button>
      <button
        type="button"
        onClick={() => setCurrentStep("card-customization")}
        className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        Comenzar personalización
      </button>
      </div>
    </div>
  )

  // Renderizar la personalización de la card
  const renderCardCustomization = () => (
    <form  className="flex flex-col gap-4 flex-1 p-4 justify-between items-center">
<div className="space-y-4 p-4 rounded-xl bg-zinc-50  ">
        <div className="text-sm text-zinc-700 ">
          <p className="font-medium mb-2">Personzalización de card informativa</p>
          Esta tarjeta o la cantidad seleccionada aparecerá en la página de inicio de la plataforma, permitiendo a los clientes visualizar las características principales de sus productos o explorar las categorías disponibles. Estas tarjetas iniciales están diseñadas para motivar al usuario a visitar la sección de productos y descubrir más detalles.
        </div>
      </div>

      <div className="space-y-6  ">
        {/* Vista previa de la card */}
        <div className={cardClasses }>
          {cardSettings.showImage && (
            <div className="relative h-48">
              <img
                src="https://flowbite.com/docs/images/examples/image-3@2x.jpg"
                alt="Card preview"
                className="object-cover"
              />
            </div>
          )}
          <div className={`p-5 ${textClasses}`}>
            <div className="flex flex-col items-start gap-4">
              {cardSettings.textAlign === "text-center" ? (
                <div className="mx-auto">{renderIcon()}</div>
              ) : cardSettings.textAlign === "text-right" ? (
                <div className="ml-auto">{renderIcon()}</div>
              ) : (
                renderIcon()
              )}
              <h5 className="text-xl font-bold tracking-tight text-gray-900 ">{cardSettings.title}</h5>
              <p className="font-normal text-gray-700 ">{cardSettings.description}</p>
            </div>
          </div>
        </div>

        {/* Contenido de la card */}
        <div className="space-y-4 p-4 rounded-xl bg-zinc-50 ">
          <h4 className="text-sm font-medium text-zinc-900 ">Contenido de la card</h4>

          {/* Opción para mostrar imagen */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-zinc-500" />
                <span className="text-sm text-zinc-500">Mostrar imagen</span>
              </div>
              <Switch
                checked={cardSettings.showImage}
                onCheckedChange={(checked) => handleSettingsChange("showImage", checked)}
              />
            </div>
          </div>

          {/* Color del icono */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Color del icono</span>
            </div>
            <Select value={cardSettings.icon} onValueChange={(value) => handleSettingsChange("icon", value)}>
              <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200 rounded-xl">
                <SelectValue placeholder="Seleccionar icono" />
              </SelectTrigger>
              <SelectContent>
                {[...iconOptions, { name: "Carrito de compras", value: "shopping-cart" }].map((icon) => (
                  <SelectItem key={icon.value} value={icon.value}>
                    {icon.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
                {/* Color del titulo de la card */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Color titulo de la card</span>
            </div>
            <Select value={cardSettings.icon} onValueChange={(value) => handleSettingsChange("icon", value)}>
              <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200 rounded-xl">
                <SelectValue placeholder="Seleccionar icono" />
              </SelectTrigger>
              <SelectContent>
                {[...iconOptions, { name: "Carrito de compras", value: "shopping-cart" }].map((icon) => (
                  <SelectItem key={icon.value} value={icon.value}>
                    {icon.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color del titulo de la card */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Color detalle de la card</span>
            </div>
            <Select value={cardSettings.icon} onValueChange={(value) => handleSettingsChange("icon", value)}>
              <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200 rounded-xl">
                <SelectValue placeholder="Seleccionar icono" />
              </SelectTrigger>
              <SelectContent>
                {[...iconOptions, { name: "Carrito de compras", value: "shopping-cart" }].map((icon) => (
                  <SelectItem key={icon.value} value={icon.value}>
                    {icon.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Título */}
          {/* <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Título</span>
            </div>
            <input
              type="text"
              value={cardSettings.title}
              onChange={(e) => handleSettingsChange("title", e.target.value)}
              className="w-full h-10 px-3 py-2 bg-zinc-100  border border-zinc-200  rounded-xl text-sm"
              placeholder="Título de la card"
            />
          </div> */}

          {/* Descripción */}
          {/* <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Descripción</span>
            </div>
            <textarea
              value={cardSettings.description}
              onChange={(e) => handleSettingsChange("description", e.target.value)}
              className="w-full px-3 py-2 bg-zinc-100  border border-zinc-200  rounded-xl text-sm min-h-[80px]"
              placeholder="Descripción de la card"
            />
          </div> */}
        </div>

        {/* Alineación del texto */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <AlignLeft className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-500">Alineación del texto</span>
          </div>
          <RadioGroup
            value={cardSettings.textAlign}
            onValueChange={(value) => handleSettingsChange("textAlign", value as CardSettings["textAlign"])}
            className="flex space-x-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text-left" id="text-left" />
              <Label htmlFor="text-left" className="flex items-center">
                <AlignLeft className="w-4 h-4 mr-1" /> Izquierda
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text-center" id="text-center" />
              <Label htmlFor="text-center" className="flex items-center">
                <AlignCenter className="w-4 h-4 mr-1" /> Centro
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="text-right" id="text-right" />
              <Label htmlFor="text-right" className="flex items-center">
                <AlignRight className="w-4 h-4 mr-1" /> Derecha
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Border radius */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CircleDashed className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-500">Redondeo de esquinas</span>
          </div>
          <Select value={cardSettings.rounded} onValueChange={(value) => handleSettingsChange("rounded", value)}>
            <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
              <SelectValue placeholder="Redondeo" />
            </SelectTrigger>
            <SelectContent>
              {roundedOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sombra */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-zinc-500" />
            <span className="text-sm text-zinc-500">Sombra</span>
          </div>
          <Select value={cardSettings.shadow} onValueChange={(value) => handleSettingsChange("shadow", value)}>
            <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200 rounded-xl">
              <SelectValue placeholder="Sombra" />
            </SelectTrigger>
            <SelectContent>
              {shadowOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Borde */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-500">Borde</span>
            </div>
            <Switch
              checked={cardSettings.hasBorder}
              onCheckedChange={(checked) => handleSettingsChange("hasBorder", checked)}
            />
          </div>

          {cardSettings.hasBorder && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <Select
                value={cardSettings.borderWidth}
                onValueChange={(value) => handleSettingsChange("borderWidth", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                  <SelectValue placeholder="Grosor" />
                </SelectTrigger>
                <SelectContent>
                  {borderWidthOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={cardSettings.borderColor}
                onValueChange={(value) => handleSettingsChange("borderColor", value)}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full bg-${cardSettings.borderColor}-${cardSettings.borderShade}`}
                    ></div>
                    <SelectValue placeholder="Color" />
                  </div>
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full bg-${color.value}-${cardSettings.borderShade}`}></div>
                        <span>{color.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={cardSettings.borderShade.toString()}
                onValueChange={(value) => handleSettingsChange("borderShade", Number.parseInt(value))}
              >
                <SelectTrigger className="w-full h-10 bg-zinc-100  border-zinc-200  rounded-xl">
                  <SelectValue placeholder="Intensidad" />
                </SelectTrigger>
                <SelectContent>
                  {colorShadeOptions.map((shade) => (
                    <SelectItem key={shade.value} value={shade.value.toString()}>
                      {shade.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 p-4 rounded-xl bg-zinc-50 ">
        <div className="text-sm text-zinc-700 ">
          <p className="font-medium mb-2">Consejos para cards de productos efectivas</p>
          <ul className="space-y-1 text-xs text-zinc-500 ">
            <li className="flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
              Use imágenes de alta calidad que muestren claramente el producto
            </li>
            <li className="flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
              Mantenga los títulos concisos y descriptivos
            </li>
            <li className="flex items-center gap-1">
              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
              La descripción debe destacar los beneficios principales del producto
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => setCurrentStep("initial-question")}
        className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
      >
        <ArrowBigLeftDash className="w-4 h-4" />
        atrás
      </button>
        <button
          type="button"
          onClick={() => handleNext()}
          className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
        >
            <ArrowBigRightDash className="w-4 h-4" />
            Siguiente personalización
        </button>
        </div>
    </form>
  )

  // Renderizar la pantalla de completado con botón de continuar
  const renderComplete = () => (
    <div className="flex flex-col h-full p-6">
      <div className="flex-1 flex flex-col items-center justify-center gap-4 py-6">
        <div className="w-16 h-16 bg-green-100  rounded-full flex items-center justify-center text-green-600 ">
          <Check className="w-8 h-8" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-zinc-900  mb-1">¡Personalización guardada!</h3>
          <p className="text-sm text-zinc-500  max-w-xs">
            La personalización de la card informativa ha sido guardada correctamente.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 space-y-2 bg-zinc-50  rounded-xl">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Imagen</span>
            <span className="font-medium text-zinc-900 ">
              {cardSettings.showImage ? "Visible" : "Oculta"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Redondeo</span>
            <span className="font-medium text-zinc-900 ">
              {roundedOptions.find((r) => r.value === cardSettings.rounded)?.name}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Sombra</span>
            <span className="font-medium text-zinc-900 ">
              {shadowOptions.find((s) => s.value === cardSettings.shadow)?.name}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="w-full h-10 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
        >
          Continuar con la siguiente personalización
        </button>
      </div>
    </div>
  )

  const renderFinalyProcess =() =>(
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-8">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
        <HandPlatter className="w-8 h-8" />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium text-zinc-900">
        No, no prestaré servicios a mis clientes
        </h3>
      </div>

      <div className="w-full max-w-xs">
        <div className="flex flex-row items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => setCurrentStep("initial-question")}
        className="w-[30%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
      >
        <ArrowBigLeftDash className="w-4 h-4" />
        atrás
      </button>
        <button
          type="button"
          onClick={() => handleNext()}
          className="w-[70%] h-10 mt-4 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800  text-white text-sm font-medium rounded-xl transition-colors"
        >
            <ArrowBigRightDash className="w-4 h-4" />
            Siguiente personalización
        </button>
        </div>
      </div>
      
    </div>
    
  )


  const divChildren = (
    <div>
        {currentStep === "initial-question" && renderInitialQuestion()}
        {currentStep === "areas-list" && renderAreasList()}
        {currentStep === "card-customization" && renderCardCustomization()}
        {currentStep === "complete" && renderComplete()}
        {currentStep === "finaly-process" && renderFinalyProcess()}
        {isLoading && (
          <div className="absolute inset-0 bg-white/80  flex items-center justify-center">
            <Card className="w-full max-w-md border-0 shadow-none bg-transparent">
              <CardContent className="flex flex-col items-center gap-4 p-6">
                <div className="relative w-12 h-12">
                  <div className="w-full h-full animate-spin text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-blue-500/10 rounded-full animate-spin-slow"></div>
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-sm font-medium text-zinc-700 ">
                    Guardando su personalización...
                  </p>
                  <p className="text-xs text-zinc-500 ">Esto puede tomar unos segundos</p>
                </div>
                <div className="w-full h-1.5 bg-zinc-200  rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 transition-all duration-300 ease-linear w-[60%]"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <br />
    </div>
  )

  return (
    <CardGeneral 
      title={`${currentStage} - Personalización de prestación de servicios`} 
      subtitle={"Transforme su tienda online con un diseño único que impulse sus ventas"} 
      progress={progressPorcent} 
      children={divChildren}
    />
  )
}

export default Stage5