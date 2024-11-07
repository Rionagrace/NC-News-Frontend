import { useEffect, useState } from "react";
import { getArticles } from "../../api";
import Card from "react-bootstrap/Card";
import { Badge, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
Badge


function Top5Articles() {
	const [sortedArticles, setSortedArticles] = useState([]);

	useEffect(() => {
		getArticles("all articles", "votes", "desc").then((results) => {
			const slicedResults = results.slice(0, 5);
			setSortedArticles(slicedResults);
		});
	}, []);


	return (
		<Card className="top5Articles">
			<Card.Header className="cardTitle">Trending articles this week </Card.Header>
			<ListGroup variant="flush">
				{sortedArticles.map((article, i)=> {
					return (
						<Link  key={article.article_id} to={`/articles/${article.article_id}`} ><ListGroup.Item className="flexItem">
							{i +1}. {article.title} <Badge className="badge" pill>
          Votes: {article.votes}
        </Badge>
						</ListGroup.Item>
            </Link>
					);
				})}
			</ListGroup>
		</Card>
	);
}

export default Top5Articles;


