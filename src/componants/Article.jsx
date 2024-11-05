import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../../api"
import categoryContext from "../contexts/categoryContexts"
import Comments from "./Comments"
import Vote from "./Vote"

function Article (){
  const {article_id} = useParams()
  const [article, setArticle] = useState({})
  const {setCategory} = useContext(categoryContext)
  const [viewComments, setViewComments] = useState(false)
  const [loaded, setLoaded] = useState(false)


  function handleComments (){
    if(viewComments){
      setViewComments(false)
    }else
    setViewComments(true)
  }

  useEffect(() => {
    getArticleById(article_id)
    .then((results) => {
      setArticle(results)
      setCategory(results.topic)
      setLoaded(true)
    })
  }, [])

  if(loaded){
  return (
    <>
    <section className="articlePage">
    <h1 className="articleTitle">{article.title}, by {article.author}</h1>
    <p>Topic: {article.topic}</p>
    <section className="articleContents">
    <img className="articleImage" src={article.article_img_url}/>
    <p className="articleBody">{article.body}</p>
    </section>
    <section className="articleButtons">
    <Vote article={article}/>
    <button className="articleViewComments" onClick={handleComments}>{viewComments ? "hide comments" : `View Comments:  ${article.comment_count}`}</button>
    </section>
    </section>
    {viewComments ? <Comments article_id={article.article_id}/> : null}
    </>
  )
}
if(!loaded)
  return <p>Loading....</p>
}

export default Article