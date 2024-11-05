import { useContext, useEffect, useState } from "react";
import { getArticleById, getArticles, getRandomArticleId } from "../../api";

import {ArticleCard, RandomArticleCard}from "./ArticleCard";
import { useParams } from "react-router-dom";
import { useCol } from "react-bootstrap/esm/Col";
import categoryContext from "../contexts/categoryContexts";

function Articles() {
	const [articles, setArticles] = useState([]);
	const [randomArticle, setRandomArticle] = useState({});
  const {topic} = useParams()
  const [loaded, setLoaded] = useState(false)
  const {setCategory} = useContext(categoryContext)

	useEffect(() => {
    if(topic){
      setCategory(topic)
    }
		getArticles(topic)
			.then((results) => {
				setArticles(results);
        setLoaded(true)
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
	}, [topic]);

if(loaded){
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
else return <p>Loading...</p>
}

export default Articles;
