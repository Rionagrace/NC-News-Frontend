import { useContext, useEffect, useState } from "react";
import { getCommentsByArticleId } from "../../api";
import CommentCard from "./CommentCard";
import UserContext from "../contexts/userContext";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
import Login from "./Login";

function Comments(props) {
	const { user } = useContext(UserContext);

	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(false);
	const { article_id } = props;
	useEffect(() => {
		setLoading(true);
		getCommentsByArticleId(article_id).then((results) => {
			setComments(results);
			setLoading(false);
		});
	}, []);

	return (
		<section className="commentForm">
			{user ? (
				<CommentForm />
			) : (
				<>
					<h2>Log in to have your say:</h2>
					<Login />
				</>
			)}
			{loading ? (
				<div className="loader"></div>
			) : (
				<>
					<h2>Comments:</h2>
					{comments.map((comment) => {
						return <CommentCard key={comment.comment_id} comment={comment} />;
					})}
				</>
			)}
		</section>
	);
}

export default Comments;
