import React from 'react'
import { useState } from "react"
import { generalConfig } from "@util/generalConfig"
import { MessageSquareText, Menu } from 'lucide-react'

const MenuView = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }
  const toggleChat = () => {
    setOpenChat(!openChat)
  }

  return (
    <div>
      {/* WhatsApp Button - Bottom Left */}
      <div className="fixed bottom-20 left-4 z-50">
        <a 
          href="https://wa.me/34622653681?text=Hola%20MAT%20Barber%20Shop" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-12 h-12 
          font-medium bg-green-500 rounded-full hover:bg-green-600 group ring-4 focus:ring-4 ring-green-200 focus:ring-green-400
          focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
          </svg>
        </a>
      </div>

      {/* Menu Button - Bottom Right */}
      {!openChat && (
        <div className="fixed bottom-20 right-4 z-50" >
      <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center w-12 h-12 
      font-medium bg-gray-600 rounded-full hover:bg-gray-700 group ring-4 focus:ring-4 ring-gray-200  focus:ring-gray-500
      focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl">
        <Menu className="w-6 h-6 text-white" />
      </button>
      </div>
      )}
      
    {/* {!openMenu && (
    <div>    
      <div className="fixed bottom-20 left-4 z-50">
        <button
          onClick={toggleChat}
          type="button"
          className="inline-flex items-center justify-center w-12 h-12 
          font-medium bg-gray-600 rounded-full hover:bg-gray-700 group ring-4 focus:ring-4 ring-gray-200 
          focus:ring-gray-500 focus:outline-none transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <MessageSquareText className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>)} */}

{openMenu && (
    <div id="menu-content" className="fixed inset-0 z-[3000] flex items-center justify-center bg-black bg-opacity-50">
    <div id="drawer-navigation" className="h-[88vh] md:h-[80vh] p-4 overflow-y-auto transition-transform bg-white 
    w-[95%] max-w-md mx-auto rounded-lg shadow-xl" aria-labelledby="drawer-navigation-label">
        <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase ">Menu</h5>
        <button onClick={toggleMenu} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" 
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 
        absolute top-2.5 end-2.5 inline-flex items-center justify-center">
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium mb-10">

            {generalConfig.GeneralMenu.linksPages.map((item) => (
                <>
                {item.active && 
                    <li>
                    <a href={item.href} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-all duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                      className={['bi', item.icon].join(' ')} viewBox="0 0 16 16">

                            <path d={item.path1}/>
                            <path d={item.path2}/>
                        </svg>
                        <span className="ms-3">{item.text}</span>
                    </a>
                    </li>
                } 
                    
                </>
            ))}
        
        </ul>
    </div>
    </div>
</div>  
)}
    {openChat && (
    <div id="menu-content" className="fixed inset-0 z-[3000] flex items-center justify-center bg-black bg-opacity-50">
    <div id="drawer-navigation" className="h-[88vh] md:h-[80vh] p-4 overflow-y-auto transition-transform bg-white 
    w-[95%] max-w-md mx-auto rounded-lg shadow-xl" aria-labelledby="drawer-navigation-label">
        <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase ">Chat</h5>
        <button onClick={toggleChat} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" 
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 
        absolute top-2.5 end-2.5 inline-flex items-center justify-center">
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span className="sr-only">Close menu</span>
        </button>
        <iframe src="https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/01/22/23/20250122234411-45T0QKRT.json" title="Botpress Webchat"
          
          style={{width: "100%", height: "400px"}}
          
          ></iframe>
        <div className="py-4 overflow-y-auto">
        
        <ul className="space-y-2 font-medium flex items-center justify-end">
                    <li>
                    <a href="/contacto" className="bg-slate-400 p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-all duration-200">
                        <span className="ms-3">Contactar con la empresa </span>
                    </a>
                    </li>
        
        </ul>
    </div>
    </div>
</div>  
)}   

    </div>
  )
}

export default MenuView
