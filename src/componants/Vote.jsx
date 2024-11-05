import { useEffect, useState } from "react";
import { updateVotes } from "../../api";

function Vote(props) {
	const { article, comment } = props;

	const [likesCount, setLikesCount] = useState(0);
  const [error, setError] = useState('')

	useEffect(() => {
		if (article) {
			setLikesCount(article.votes);
		}
		if (comment) {
			setLikesCount(comment.votes);
		}
	}, []);

	function handleLike() {
		setLikesCount((currentLikesCount) => currentLikesCount + 1);
		if (article) {
			updateVotes(article.article_id, 1)
      .catch((err) => {
        setLikesCount((currentLikesCount) => currentLikesCount - 1);
        setError("Your like was not successful. Please try again!");
      });
		}

		// if (comment) {
		// 	updateVotes("comments", comment.comment_id, 1);
		// }
	}
	function handleDislike() {
		setLikesCount((currentLikesCount) => currentLikesCount - 1);
		if (article) {
			updateVotes(article.article_id, -1);
		}
		// if (comment) {
		// 	updateVotes("comments", comment.comment_id, -1);
		// }
	}

	return (
		<section className="vote">
			<button onClick={handleLike}>+</button>
			<button onClick={handleDislike}>-</button>
			<p>{likesCount}</p>
      {error ? <p>{error}</p> : null}
		</section>
	);
}

export default Vote;
