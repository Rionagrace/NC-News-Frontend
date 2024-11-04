import { useEffect, useState } from "react"
import { getCategories } from "../../api"

function Header (){

  const [categories, setCategories] = useState([])
  const [loaded, setLoaded] = useState(false)

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
    <h1>NC-NEWS</h1>
    <nav className="catNav">
      {categories.map((category) =>{
        return <button className="catButton" key={category.slug}>{category.slug}</button>
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