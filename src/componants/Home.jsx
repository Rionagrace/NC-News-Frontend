import { useContext, useEffect } from "react"
import Articles from "./Articles"
import categoryContext from "../contexts/categoryContexts"

function Home (){

  const {setCategory} = useContext(categoryContext)

  useEffect(() => {
    setCategory("")
  })

  return (
    <Articles/>
  )
}

export default Home