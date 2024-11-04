import { useEffect, useState } from "react";
import { getArticleById, getArticles, getRandomArticleId } from "../../api";

import {ArticleCard, RandomArticleCard}from "./ArticleCard";

function Articles() {
	const [articles, setArticles] = useState([]);
	const [randomArticle, setRandomArticle] = useState({});

	useEffect(() => {
		getArticles()
			.then((results) => {
				setArticles(results);
        return results
			})
			// .then((results) => {
			// return	getRandomArticleId(results.length);
			// })
			// .then((result) => {
      //   console.log(result)
      //   console.log(articles)
			// return	getArticleById(articles[result].article_id);
			// })
			// .then((result) => {
			// 	setRandomArticle(result);
      //   console.log(randomArticle)
			// });
	}, []);

	return (
		<>
			<section className="resultsFlex">
				{articles.map((article) => {
					return <ArticleCard article={article} key={article.article_id} />;
				})}
			</section>
		</>
	);
}

export default Articles;
