import { useContext, useEffect, useState } from "react"
import { getCategories } from "../../api"
import { Link } from "react-router-dom"
import categoryContext from "../contexts/categoryContexts"

function Header (){

  const [categories, setCategories] = useState([])
  const [loaded, setLoaded] = useState(false)

  const {category} = useContext(categoryContext)

  useEffect(() => {
    getCategories().then((results) => {
      setCategories(results)
      setLoaded(true)
    })
  }, [])

  if(loaded){
  return (
    <>
    <nav>
      <button>Log in</button>
    </nav>
    <Link to={"/"}>
    <h1>NC-NEWS</h1>
    </Link>
    <nav className="catNav">
      {categories.map((Acategory) =>{
        if(category === Acategory.slug){
          return <button className="highlightedcatButton" key={Acategory.slug}>{Acategory.slug}</button>
        }
        return <button className="catButton" key={Acategory.slug}>{Acategory.slug}</button>
      })}
    </nav>
    </>
  )
}
else return (
  <h2>Loading...</h2>
)
}

export default Header