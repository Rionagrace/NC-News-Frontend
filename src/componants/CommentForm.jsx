import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import { useParams } from "react-router-dom";
import { postComment } from "../../api";
import CommentCard from "./CommentCard";

function CommentForm (){

  const {user} = useContext(UserContext)
  const {article_id} = useParams()
  const [comment, setComment] = useState({})
  const [loaded, setLoaded] = useState(false);
  const [loadedComment, setLoadedComment] = useState({})
  const [error, setError] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)

function handleSubmit(event) {
  event.preventDefault();

  const comment = {
    username: user,
    body: event.target.commentBody.value
  }
setComment(comment)
setLoaded(true);


}

useEffect(() => {
  if (loaded) {
    postComment(article_id, comment).then((results) => {
      document.getElementById("postForm").reset()
      setLoadedComment(results.data.comment)
      setButtonDisabled(true)
    })
    .catch((err) => {
      setLoadedComment({});
      setError("Your comment was not successful. Please try again!");
    })
  }
}, [comment]);

  return (
    <>
    <h2>Have your say, {user}!</h2>
    <form onSubmit={handleSubmit} action=""
    method="post"
    className="form"
    id="postForm"
    disabled={buttonDisabled}>
<label htmlFor="commentBody">Comment:</label>
<input id="commentBody" type="text" required></input>
<button disabled={buttonDisabled} type="submit">Post</button>
    </form>
    {loaded ? <CommentCard comment={loadedComment}/> : null}
    {error ? <p>{error}</p> : null}
    </>
  )
}

export default CommentForm