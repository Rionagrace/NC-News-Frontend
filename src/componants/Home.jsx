import { useContext, useEffect } from "react"
import Articles from "./Articles"
import categoryContext from "../contexts/categoryContexts"
import Top5Articles from "./Top5Articles"

function Home (){

  const {setCategory} = useContext(categoryContext)

  useEffect(() => {
    setCategory("")
  })

  return (
    <>
    <Top5Articles/>
    </>
  )
}

export default Home