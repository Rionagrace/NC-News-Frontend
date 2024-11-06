import { useContext, useEffect, useState } from "react";
import { getArticleById, getArticles, getRandomArticleId } from "../../api";

import { ArticleCard, RandomArticleCard } from "./ArticleCard";
import { useParams } from "react-router-dom";
import { useCol } from "react-bootstrap/esm/Col";
import categoryContext from "../contexts/categoryContexts";
import { useSearchParams } from "react-router-dom";
import * as React from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";


function Articles() {
	const [articles, setArticles] = useState([]);
	const { topic } = useParams();
	const [loaded, setLoaded] = useState(false);
	const { setCategory } = useContext(categoryContext);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("")
  const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
    const searchObject = {}
		if (topic) {
			setCategory(topic);
		}
    if(sortBy !== ''){
      searchObject.sort_by = sortBy
    }
    if(order !== ''){
      searchObject.order = order
    }
		getArticles(topic, sortBy === '' ? undefined : sortBy, order === '' ? undefined : order).then((results) => {
			setArticles(results);
			setLoaded(true);
      setSearchParams(searchObject)
		});
	}, [topic, sortBy, order]); 



  function handleSortBySubmit(param) {
    setSortBy(param)
  }

  function handleOrderSubmit(param){
    setOrder(param)
  }



	if (loaded) {
		return (
			<>
      <section className="searchParams">
				<DropdownButton id="dropdown-basic-button" title="Sort by">
					<Dropdown.Item onClick={(()=> {handleSortBySubmit("author")})}>author</Dropdown.Item>
					<Dropdown.Item onClick={(()=> {handleSortBySubmit("topic")})}>topic</Dropdown.Item>
					<Dropdown.Item onClick={(()=> {handleSortBySubmit("title")})}>Title</Dropdown.Item>
          <Dropdown.Item onClick={(()=> {handleSortBySubmit("article_id")})}>Article ID</Dropdown.Item>
          <Dropdown.Item onClick={(()=> {handleSortBySubmit("created_at")})}>Created At</Dropdown.Item>
          <Dropdown.Item onClick={(()=> {handleSortBySubmit("votes")})}>Votes</Dropdown.Item>
          <Dropdown.Item onClick={(()=> {handleSortBySubmit("topic")})}>Comment Count</Dropdown.Item>
				</DropdownButton>
				<DropdownButton id="dropdown-basic-button" title="Sort direction">
					<Dropdown.Item onClick={(()=> {handleOrderSubmit("asc")})}>ascending</Dropdown.Item>
					<Dropdown.Item onClick={(()=> {handleOrderSubmit("desc")})}>Descending</Dropdown.Item>
				</DropdownButton>
        </section>
				<section className="resultsFlex">
					{articles.map((article) => {
						return <ArticleCard article={article} key={article.article_id} />;
					})}
				</section>
			</>
		);
	} else return <p>Loading...</p>;
}

export default Articles;
