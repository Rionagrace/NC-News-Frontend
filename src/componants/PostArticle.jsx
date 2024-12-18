import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/userContext";
import { Link, redirect } from "react-router-dom";
import { postArticle } from "../../api";
import Login from "./Login";
import categoryContext from "../contexts/categoryContexts";



function PostArticle() {
	const { user } = useContext(UserContext);
  const {category, setCategory} = useContext(categoryContext)
  const [article, setArticle] = useState({})
  const [postedArticle, setPostedArticle] = useState({})

  function handleSubmit(event){
    event.preventDefault()
    setArticle({
      author: user,
      title: event.target.title.value,
      body: event.target.body.value,
      topic: event.target.itemCategory.value
    })

  }

  useEffect(() => {
    setCategory("post article")
    if(article.title){
    postArticle(article)
    .then((result) => {
      setPostedArticle(result)
    })
    }
  }, [article])

  if(postedArticle.title){
    return(
      <>
      <h2>Your article has been posted</h2>
      <Link to={`/articles/${postedArticle.article_id}`}><button>Go to your article</button></Link>
      </>
    )
  }

	if (user) {
		return (
			<section className="submit">
				<form
					onSubmit={handleSubmit}
					action=""
					method="post"
					className="form"
					id="postForm"
				>
					<label htmlFor="title">Title:</label>
					<input id="title" type="text" required></input>
					<br />
					<label htmlFor="body" >Body:</label>
					<input id="body" type="text" size="20" required></input>
					<br></br>
					
					<label htmlFor="itemCategory">Category:</label>
					<select id="itemCategory" size="1" required>
						<option value="coding">coding</option>
						<option value="football">football</option>
						<option value="cooking">cooking</option>
					</select>
					<br></br>
					<br />
					<button type="submit">Post your article!</button>
				</form>
			</section>
		);
	}
  
  else {
		return (
			<>
				<h2>Oops! You're not logged in!</h2>
				<Login/>
			</>
		);
	}
}

export default PostArticle;
