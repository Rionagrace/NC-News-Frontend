import { useEffect, useState } from "react";
import { updateCommentVotes, updateVotes } from "../../api";
import ErrorPage from "./ErrorPage";

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
        setError(err);
      });
		}

		if (comment) {
			updateCommentVotes( comment.comment_id, 1)
      .catch((err) => {
        setLikesCount((currentLikesCount) => currentLikesCount - 1);
        setError(err);
      });
		}
	}
	function handleDislike() {
		setLikesCount((currentLikesCount) => currentLikesCount - 1);
		if (article) {
			updateVotes(article.article_id, -1)
      .catch((err) => {
        setLikesCount((currentLikesCount) => currentLikesCount - 1);
        setError("Your like was not successful. Please try again!");
      });
		}
		if (comment) {
			updateCommentVotes( comment.comment_id, -1)
      .catch((err) => {
        setLikesCount((currentLikesCount) => currentLikesCount - 1);
        setError("Your like was not successful. Please try again!");
      });
		}
	}

	return (
		<section className="vote">
			<button onClick={handleLike}>+</button>
			<button onClick={handleDislike}>-</button>
			<p>{likesCount}</p>
      {error ? <ErrorPage error={error}/> : null}
		</section>
	);
}

export default Vote;
