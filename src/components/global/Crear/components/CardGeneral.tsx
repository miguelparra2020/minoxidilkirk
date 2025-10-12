import React from "react"
interface CardProps {
    title: string
    subtitle: string
    progress: number
    children: React.ReactNode
  }

const CardGeneral: React.FC<CardProps> = ({ title, subtitle, progress, children }) => {
    return (
        <div className="mt-4 group relative overflow-hidden w-[96%] max-w-md bg-white  border border-zinc-200  rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]  min-h-[600px] flex flex-col gap-2">
        <div className="p-4 flex items-center justify-between border-b border-zinc-200 ">
            <div className="flex items-center gap-3">
                <div>
                <h3 className="text-sm font-medium text-zinc-900 ">{title}</h3>
                <p className="text-xs text-zinc-500  mb-2">{subtitle}</p>
                <div
                className={`${progress >= 0 && progress <= 25 ? "bg-gray-400" : progress > 25 && progress <= 50 ? "bg-blue-400" : progress > 50 && progress <= 70 ? "bg-blue-400" : "bg-green-400"}  text-xs font-medium text-gray-100 text-center p-0.5 leading-none rounded-full`}
                style={{ width: `${progress}%` }}
            >
                {progress}%
                </div>
                </div>
            </div>                        
          </div>
          {children}
        </div>
    )
  }

  export default CardGeneral