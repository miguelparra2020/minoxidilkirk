import React, { useState, useEffect } from 'react'
import { servicioAgendadoStore, establecerFechaHora } from '../../../stores/ServicesScheduling'
import { generalConfig } from '@util/generalConfig'
import { ToastContainer, toast } from 'react-toastify'
import { ServicioAgendadoInfo } from '@globals'
import TimeScheduler from './TimeScheduler'
import axios from 'axios'

interface DateOption {
  date: Date
  available: boolean
  slots?: number
}

const DAYS_OF_WEEK = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"]
const MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"]

const ServiciosAgendamientoFecha = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date())
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + 30)
  const [storeState, setStoreState] = useState(servicioAgendadoStore.get())
  useEffect(() => {
    setSelectedDate(null)
    establecerFechaHora('', '')
    setCurrentWeekStart(new Date())
  }, [])
  
  // Efecto para navegar cuando se selecciona una hora
  useEffect(() => {
    if (selectedTime) {
      // Navegar a la página de finalización cuando se selecciona una hora
      window.location.href = '/ServiciosAgendamientoFinalUser'
    }
  }, [selectedTime])
  useEffect(() => {
    const unsubscribe = servicioAgendadoStore.listen(state => {
      setStoreState(state)
    })
    return () => unsubscribe()
  }, [])
  const generateDateOptions = (): DateOption[] => {
    const options: DateOption[] = []
    const startDate = new Date(currentWeekStart)
    const personaSeleccionada = servicioAgendadoStore.get().data.persona
    const dayNotWork = personaSeleccionada?.dayNotWork?.toLowerCase() || null
    const daysMap: Record<string, number> = {
      'domingo': 0,
      'lunes': 1,
      'martes': 2,
      'miércoles': 3,
      'miercoles': 3,
      'jueves': 4,
      'viernes': 5,
      'sábado': 6,
      'sabado': 6
    }
    const dayOffNumber = dayNotWork ? daysMap[dayNotWork] : -1
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const isDayOff = dayOffNumber !== -1 && date.getDay() === dayOffNumber
      const isAvailable = date >= today && date <= maxDate && !isDayOff
      options.push({
        date,
        available: isAvailable,
        slots: isAvailable ? Math.floor(Math.random() * 10) + 1 : 0
      })
    }
    return options
  }
  const [weekDates, setWeekDates] = useState(generateDateOptions())
  const navigateWeek = (direction: "prev" | "next") => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(currentWeekStart.getDate() + (direction === "next" ? 5 : -5))
    if (direction === "prev") {
      const compareDate = new Date(newStart)
      compareDate.setDate(newStart.getDate())
      if (compareDate < today) {
        newStart.setTime(today.getTime())
      }
    }
    if (direction === "next") {
      const lastDayOfNewRange = new Date(newStart)
      lastDayOfNewRange.setDate(newStart.getDate() + 4)
      if (lastDayOfNewRange > maxDate) {
        newStart.setTime(maxDate.getTime())
        newStart.setDate(maxDate.getDate() - 4)
      }
    }
    
    setCurrentWeekStart(newStart)
    setWeekDates(generateDateOptions())
  }
  const formatDate = (date: Date) => {
    return {
      month: MONTHS[date.getMonth()],
      day: date.getDate().toString().padStart(2, "0"),
      dayOfWeek: DAYS_OF_WEEK[date.getDay()],
    }
  }
  const isSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString()
  }
  // Estado para almacenar los eventos del calendario
  const [calendarEvents, setCalendarEvents] = useState<any[]>([])
  // Estado específico para horarios ocupados
  const [horariosOcupados, setHorariosOcupados] = useState<Array<{start: string, end: string}>>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(false)

  // Función para obtener los eventos del calendario
  const fetchCalendarEvents = async (date: Date, calendarId: string) => {
    // Al inicio de cada consulta: marcamos como cargando y reiniciamos horarios ocupados
    setIsLoadingEvents(true)
    setHorariosOcupados([])
    try {
      // Formatear fecha para crear periodo del día completo (00:00:00 a 23:59:59)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      
      // Usar la fecha seleccionada para la consulta a la API
    // Si hay problemas con fechas futuras, ajustar lógica según sea necesario
    const useCurrentDateAsWorkaround = false
      
      // Si usamos fecha actual como workaround (para evitar errores con fechas futuras)
      let periodStart, periodEnd
      if (useCurrentDateAsWorkaround) {
        const now = new Date()
        const currentYear = now.getFullYear()
        const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0')
        const currentDay = now.getDate().toString().padStart(2, '0')
        
        periodStart = `${currentYear}-${currentMonth}-${currentDay}T00:00:00.000Z`
        periodEnd = `${currentYear}-${currentMonth}-${currentDay}T23:59:59.999Z`
        console.log('Usando fecha actual como workaround temporal para la consulta API')
      } else {
        periodStart = `${year}-${month}-${day}T00:00:00.000Z`
        periodEnd = `${year}-${month}-${day}T23:59:59.999Z`
      }
      
      const url = `https://backend-Minoxidil Kirkland.vercel.app/api/calendar/events?calendarId=${encodeURIComponent(calendarId)}&periodStart=${periodStart}&periodEnd=${periodEnd}`

      const response = await axios.get(url)
      
      // Verificación de la estructura de respuesta
    if (response.data) {
      
      let eventsToProcess = [];
      
      // Si la respuesta tiene el formato correcto con campo events y total
      if (response.data.events && Array.isArray(response.data.events) && response.data.total !== undefined) {
        eventsToProcess = response.data.events
        // Pasamos toda la respuesta para que TimeScheduler pueda procesar tanto el total como los events
        setCalendarEvents(response.data)
      }
      // Si la respuesta es directamente un array de eventos
      else if (Array.isArray(response.data)) {
        eventsToProcess = response.data
        setCalendarEvents(response.data)
      }
      // Cualquier otro formato que no reconocemos
      else {
        toast.warning('La información de disponibilidad podría estar incompleta')
        setCalendarEvents([])
      }
      
      // Procesamos los eventos para obtener las horas en el formato requerido
      if (eventsToProcess.length > 0) {
        const horasRegistradas = eventsToProcess.map(event => {
          // Extraer solo la hora de las fechas (formato 'HH:MM:SS')
          const startDateTime = event.start.dateTime
          const endDateTime = event.end.dateTime
          
          // Extraemos solo la hora que está entre T y + en la fecha ISO
          const startTime = startDateTime.split('T')[1].split('+')[0]
          const endTime = endDateTime.split('T')[1].split('+')[0]
          
          // Creamos un objeto con el formato de propiedades start y end
          return {
            start: startTime,
            end: endTime
          }
        })
        
        
        // Actualizamos el estado de horarios ocupados
        setHorariosOcupados(horasRegistradas)
      }
    } else {
      setCalendarEvents([])
    }
  } catch (error: any) {
    console.error('Error al obtener eventos del calendario:', error)
    
    // Mostrar mensaje con detalles del error
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Error del servidor:', error.response.status, error.response.data)
      toast.error(`Error del servidor: ${error.response.status}. Usando horarios por defecto.`)
    } else if (error.request) {
      // No se recibió respuesta
      console.error('No hubo respuesta del servidor')
      toast.error('No se pudo conectar con el servidor. Usando horarios por defecto.')
    } else {
      // Error en la configuración de la solicitud
      toast.error(`Error: ${error.message}. Usando horarios por defecto.`)
    }
    
    setCalendarEvents([])
  } finally {
    setIsLoadingEvents(false)
  }
}

  const handleDateSelect = (date: Date, available: boolean) => {    
    if (!available) return
    setSelectedDate(date)
    setSelectedTime(null)
    
    // Formatear la fecha para mostrar
    const formattedDate = date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    // Actualizar la fecha en el store
    establecerFechaHora(formattedDate, '')
    
    // Obtener el calendarId de la persona seleccionada
    const personaSeleccionada = servicioAgendadoStore.get().data.persona
    
    if (personaSeleccionada?.calendarId) {
      // Consultar eventos del calendario para esta fecha y persona
      fetchCalendarEvents(date, personaSeleccionada.calendarId)
    } else {
      console.warn('No hay calendarId disponible para la persona seleccionada')
      setCalendarEvents([])
    }
  }
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    const currentState = servicioAgendadoStore.get()
    
    // Obtenemos la duración del servicio seleccionado
    const servicio = currentState.data.servicio
    const duracionServicio = servicio?.duracion || 30 // duración en minutos, por defecto 30 min
    
    // Calcular la hora de fin basada en la hora de inicio y la duración del servicio
    const startHour = time // Formato "HH:MM:SS"
    
    try {
      // Separar horas, minutos y segundos y convertirlos a números
      const timeParts = startHour.split(':')
      if (timeParts.length < 3) {
        throw new Error('Formato de hora no válido')
      }
      
      const hours = parseInt(timeParts[0], 10)
      const minutes = parseInt(timeParts[1], 10)
      const seconds = parseInt(timeParts[2], 10)
      
      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        throw new Error('Valores de hora no válidos')
      }
      
      // Crear un objeto Date para facilitar los cálculos (usar una fecha arbitraria)
      const startDate = new Date(2023, 0, 1, hours, minutes, seconds)
      const endDate = new Date(startDate.getTime() + duracionServicio * 60000) // convertir minutos a milisegundos
      
      // Formatear la hora de fin como "HH:MM:SS" asegurándose de usar padStart para tener siempre 2 dígitos
      const endHours = endDate.getHours().toString().padStart(2, '0')
      const endMinutes = endDate.getMinutes().toString().padStart(2, '0')
      const endSeconds = endDate.getSeconds().toString().padStart(2, '0')
      const endHour = `${endHours}:${endMinutes}:${endSeconds}`
      
      // Guardar en el store tanto la hora seleccionada como las horas de inicio y fin
      establecerFechaHora(currentState.data.fecha, time, startHour, endHour)
      
    } catch (error) {
      console.error('Error al calcular la hora de finalización:', error)
      // En caso de error, al menos guardamos la fecha y hora seleccionada
      establecerFechaHora(currentState.data.fecha, time)
    }
  }

  const handleContinuar = () => {
    // Ya no necesitamos navegar aquí, el useEffect se encarga de ello
    const currentState = servicioAgendadoStore.get()
  }

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Contenedor de notificaciones */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ pointerEvents: 'none' }}>
        <div className="mx-auto max-w-screen-md pt-24">
          <ToastContainer 
            position="top-center"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            style={{ position: 'relative', top: '0', left: '0', margin: '0 auto', pointerEvents: 'auto' }}
          />
        </div>
      </div>
      {/* Título del componente */}
      <div className="w-full mt-2 flex flex-col justify-center items-center text-center gap-2">
        <h1 className={generalConfig.classTitlesGeneral}>
        Selección de Fecha y Hora
        </h1>
        <p className={generalConfig.classParagraphGeneral}>
          Escoge la fecha y hora en la que deseas agendar tu servicio
        </p>
      </div>
      <br />
      <div className='flex flex-col gap-4 justify-center items-center'>
        <div className='max-w-lg'>
      {/* Date Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => navigateWeek("prev")} 
          className="px-3 py-1 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </button>

        <div className="text-sm font-medium text-gray-600">
          {formatDate(currentWeekStart).month} {currentWeekStart.getFullYear()}
        </div>

        <button 
          onClick={() => navigateWeek("next")} 
          className="px-3 py-1 border border-gray-300 rounded-md flex items-center gap-2 hover:bg-gray-50"
        >
          Siguiente
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-5 gap-3">
        {weekDates.map((dateOption, index) => {
          const { month, day, dayOfWeek } = formatDate(dateOption.date)
          const selected = isSelected(dateOption.date)

          return (
            <div
              key={index}
              className={`
                border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md
                ${selected
                  ? "ring-2 ring-primary bg-gray-800 text-white" 
                  : dateOption.available
                    ? "hover:bg-gray-50 border-gray-200"
                    : "opacity-50 cursor-not-allowed bg-gray-50"
                }
              `}
              onClick={() => handleDateSelect(dateOption.date, dateOption.available)}
            >
              <div className="p-4 text-center space-y-2">
                <div className="text-xs font-medium opacity-80">{month}</div>
                <div className="text-2xl font-bold">{day}</div>
                <div className="text-xs font-medium">{dayOfWeek}</div>
              </div>
            </div>
          )
        })}
      </div>
      </div>
      {/* Selected Date Info */}
      {selectedDate && (
        <div>
        <div className="bg-primary/5 border border-primary/20 rounded-lg">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-primary">Fecha seleccionada</h3>
                <p className="text-sm text-gray-600">
                  {selectedDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Selector de Horarios */}
        <div className="mt-4">
          {isLoadingEvents ? (
            <div className="p-8 border border-gray-200 rounded-lg bg-white flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-3"></div>
              <p className="text-gray-700 font-medium">Cargando disponibilidad...</p>
              <p className="text-gray-500 text-sm mt-2">Estamos consultando la disponibilidad para esta fecha.</p>
            </div>
          ) : (
            <TimeScheduler 
              selectedDate={selectedDate} 
              onTimeSelect={handleTimeSelect} 
              selectedTime={selectedTime} 
              calendarEvents={calendarEvents}
              isLoadingEvents={false}
              horariosOcupados={horariosOcupados}
            />
          )}
        </div>
        
        </div>
      )}
      </div>
      
      <ServicioAgendadoInfo/>
    </div>
  )
}

export default ServiciosAgendamientoFecha