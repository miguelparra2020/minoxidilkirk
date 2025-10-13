import React from 'react'
import { useStore } from "@nanostores/react"
import { languajePage } from "src/stores/languajePage"
import { generalConfig } from "@util/generalConfig"
const TituloInicioBienvenida = () => {
    const { data: dataLanguaje} = useStore(languajePage)
    return (<>
    <h1 className={generalConfig.classTitlesGeneral}>
         {generalConfig.Home.Wellcome.Company}
    </h1>
    </>)
}

export default TituloInicioBienvenida