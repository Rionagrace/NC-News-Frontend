import { useEffect, useState } from "react"
import { getCommentsByArticleId } from "../../api"
import CommentCard from "./CommentCard"

function Comments (props){

  const [comments, setComments] = useState([])
  const {article_id} = props
  useEffect(()=> {
    getCommentsByArticleId(article_id)
    .then((results) => {
      setComments(results)
    })
  }, [])


  
return (
  <>
  <h2>Comments:</h2>
  {comments.map((comment) =>{
    return <CommentCard key={comment.comment_id} comment={comment}/>
  })}
  </>
)
}

export default Comments