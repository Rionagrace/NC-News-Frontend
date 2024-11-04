import axios from "axios";

export function getCategories() {
	return axios
		.get(`https://nc-news-2e8v.onrender.com/api/topics`)
		.then((results) => {
			return results.data.topics;
		});
}

export function getArticles() {
	return axios
		.get(`https://nc-news-2e8v.onrender.com/api/articles`)
		.then((results) => {
			return results.data.articles;
		});
}


export function getRandomArticleId(arrayLength) {
  return Math.floor(Math.random() * ( arrayLength-1));
}

export function getArticleById(id) {
	return axios
		.get(`https://nc-news-2e8v.onrender.com/api/articles/${id}`)
		.then((results) => {
			return results.data.article;
		});
}


