import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../api";
import categoryContext from "../contexts/categoryContexts";
import Comments from "./Comments";
import Vote from "./Vote";

function Article() {
	const { article_id } = useParams();
	const [article, setArticle] = useState({});
	const { setCategory } = useContext(categoryContext);
	const [viewComments, setViewComments] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	function handleComments() {
		if (viewComments) {
			setViewComments(false);
		} else setViewComments(true);
	}

	useEffect(() => {
		getArticleById(article_id)
			.then((results) => {
				setArticle(results);
				setCategory(results.topic);
				setLoaded(true);
			})
			.catch((error) => {
				setError(true);
			});
	}, []);

	if (error) {
		return <h2>This article does not exist</h2>;
	}
	if (loaded) {
		return (
			<>
				<section className="articlePage">
					<h1 className="articleTitle">
						{article.title}
					</h1>
          <section className="byLine">
					<p>Topic: {article.topic}</p>
          <p>Written by: {article.author}</p>
          </section>
					<section className="articleContents">
						<img className="articleImage" src={article.article_img_url} />
						<p className="articleBody">{article.body}</p>
					</section>
					<section className="articleButtons">
						<Vote article={article} />
						<button className="articleViewComments" onClick={handleComments}>
							{viewComments
								? "hide comments"
								: `View Comments:  ${article.comment_count}`}
						</button>
					</section>
          </section>
				{viewComments ? <Comments article_id={article.article_id} /> : null}
			</>
		);
	}
	if (!loaded) return <div class="loader"></div>
}

export default Article;
