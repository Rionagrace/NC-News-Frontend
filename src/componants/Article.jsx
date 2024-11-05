import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../../api"
import categoryContext from "../contexts/categoryContexts"

function Article (){
  const {article_id} = useParams()
  const [article, setArticle] = useState({})
  const {setCategory} = useContext(categoryContext)

  useEffect(() => {

    getArticleById(article_id)
    .then((results) => {
      setArticle(results)
      setCategory(results.topic)
    })
  })
  return (
    <>
    <section className="articlePage">
    <h1 className="articleTitle">{article.title}, by {article.author}</h1>
    <section className="articleContents">
    <img className="articleImage" src={article.article_img_url}/>
    <p className="articleBody">{article.body}</p>
    </section>
    <section className="articleButtons">
    <section className="vote">
    <button>+</button>
    <button>-</button>
    <p>{article.votes}</p>
    </section>
    <button className="articleViewComments">View Comments: {article.comment_count}</button>
    </section>
    </section>
    </>
  )
}

export default Article