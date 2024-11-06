import { Card } from "react-bootstrap"
import Vote from "./Vote"
import { useContext, useEffect, useState } from "react"
import UserContext from "../contexts/userContext"
import { deleteComment } from "../../api"

function CommentCard (props) {

  const {comment} = props
  const {user} = useContext(UserContext)
  const [commentId, setCommentId] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [error, setError] = useState('')
  const {setCommentDeleted} = props

  function handleDelete (event){
    event.preventDefault();
    setCommentId(comment.comment_id)
    setLoaded(true)
  }

  useEffect(() => {
    if(loaded){
      setCommentDeleted(true)
      setDeleted(true)
      deleteComment(commentId)
      .catch((err) => {
        setError("Your comment was not successful. Please try again!");
      })
    }
  }, [commentId])

if(deleted){
  return <p>Comment has been deleted</p>
}
if(error)
  {return <p>{error}</p>}


else
  return <Card>
    <Card.Title>{comment.author}</Card.Title>
    <Card.Body>
      <Card.Text>{comment.body}</Card.Text>
      <Card.Text>{comment.created_at}</Card.Text>
      <Vote comment={comment}/>
      {comment.author === user ? <button onClick={handleDelete}>Delete comment</button> : null}
      </Card.Body>
  </Card>

 
}

export default CommentCard