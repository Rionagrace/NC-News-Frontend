import { useContext, useEffect } from "react"
import Articles from "./Articles"
import categoryContext from "../contexts/categoryContexts"
import Top5Articles from "./Top5Articles"
import SpotlightArticle from "./SpotlightArticle"
import TickerTape from "./TickerTape"

function Home (){

  const {setCategory} = useContext(categoryContext)

  useEffect(() => {
    setCategory("")
  })

  return (
    <>
    <TickerTape/>
    <section className="homePage">
    <SpotlightArticle/>
    <Top5Articles/>
    </section>
    </>
  )
}

export default Home