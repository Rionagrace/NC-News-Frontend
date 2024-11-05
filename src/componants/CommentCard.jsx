import { Card } from "react-bootstrap"
import Vote from "./Vote"

function CommentCard (props) {

  const {comment} = props


  return <Card>
    <Card.Title>{comment.author}</Card.Title>
    <Card.Body>
      <Card.Text>{comment.body}</Card.Text>
      <Card.Text>{comment.created_at}</Card.Text>
      <Vote comment={comment}/>
      </Card.Body>
  </Card>

}

export default CommentCard