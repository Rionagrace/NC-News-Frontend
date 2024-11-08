import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { getArticleById, getArticles, getRandomArticleId } from "../../api";
import { Card } from "react-bootstrap";
import ErrorPage from "./ErrorPage";
import { Link } from "react-router-dom";

function SpotlightArticle() {
	const [randomArticle, setRandomArticle] = useState({});

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState({});

	useEffect(() => {
		setLoading(true);
		getArticles()
			.then((results) => {
				return { random: getRandomArticleId(results), all: results };
			})
			.then((results) => {
				const { random, all } = results;
				return getArticleById(all[random].article_id);
			})
			.then((article) => {
				setRandomArticle(article);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
			});
	}, []);

	if (error.status) {
		return <ErrorPage error={error} />;
	}

	if (loading) {
		return <div className="loader"></div>;
	} else
		return (
			<section className="spotlightTitle">
				<h2>Spotlight on:</h2>
				<Link to={`/articles/${randomArticle.article_id}`}>
					<Card className="spotlightArticle">
						<Card.Header className="cardTitle">
							{randomArticle.title}
						</Card.Header>
						<Card.Img
							variant="top"
							src={randomArticle.article_img_url}
							alt={randomArticle.title}
						/>
						<Card.Body>
							<Card.Text>{randomArticle.body}</Card.Text>
						</Card.Body>
					</Card>
				</Link>
			</section>
		);
}

export default SpotlightArticle;
