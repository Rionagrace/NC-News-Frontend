import { useEffect, useState } from "react";
import { updateCommentVotes, updateVotes } from "../../api";
import ErrorPage from "./ErrorPage";

function Vote(props) {
	const { article, comment } = props;

	const [likesCount, setLikesCount] = useState(0);
	const [error, setError] = useState("");
	const itemId = article ? article.article_id : comment.comment_id;
	const itemType = article ? "article" : "comment";

	const [itemVoted, setItemVoted] = useState(Boolean(sessionStorage.getItem(`${itemType}Voted_${itemId}`)))

	useEffect(() => {
		if (article) {
			setLikesCount(article.votes);
		}
		if (comment) {
			setLikesCount(comment.votes);
		}
	}, []);

	function handleVote(voteChange) {
		setLikesCount((currentLikesCount) => currentLikesCount + voteChange);
		setItemVoted(true)
		const updateVoteFn = article ? updateVotes : updateCommentVotes;
		updateVoteFn(itemId, voteChange)
			.then(() => {
				sessionStorage.setItem(`${itemType}Voted_${itemId}`, true);
			})
			.catch((err) => {
				setLikesCount((currentLikesCount) => currentLikesCount - voteChange);
				setError("Your vote was not successful. Please try again!");
				setItemVoted(false)
			});
	}

	

	return (
		<section className="vote">
			<button disabled={itemVoted} onClick={(() => {handleVote(1)})}>
				+
			</button>
			<button disabled={itemVoted} onClick={(() => {handleVote(-1)})}>
				-
			</button>
			<p>{likesCount}</p>
			{error ? <ErrorPage error={error} /> : null}
		</section>
	);
}

export default Vote;
