import { useEffect, useState } from "react"
import { getArticles } from "../../api"
import ErrorPage from "./ErrorPage"


function TickerTape (){

  const [headlines, setHeadlines] = useState([])
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getArticles()
    .then((result) => {
      setHeadlines(result.slice(0,4))
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setError(error)
      setLoading(false)
    })
  }, [])

  if(loading){
    return <div className="loader"></div>
  }

  if(error.status){
    return <ErrorPage error={error}/>
  }

  return(
<section className="ticker-wrap">
<section className="ticker">
  {headlines.map((article) =>{
    return   <p className="ticker__item" key={article.article_id}>{article.title}</p>
  })}
  </section>
  </section>)
}

  export default TickerTape