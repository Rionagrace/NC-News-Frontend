import { useContext, useEffect, useState } from "react"
import { getCommentsByArticleId } from "../../api"
import CommentCard from "./CommentCard"
import UserContext from "../contexts/userContext"
import CommentForm from "./CommentForm"
import { Link } from "react-router-dom"

function Comments (props){

  const {user} = useContext(UserContext)

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
  {user ? <CommentForm/> : <Link to="/log-in"><button>Log in to post a comment</button></Link>}
  <h2>Comments:</h2>
  {comments.map((comment) =>{
    return <CommentCard key={comment.comment_id} comment={comment}/>
  })}
  </>
)
}

export default Comments