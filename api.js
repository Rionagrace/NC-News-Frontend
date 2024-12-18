import axios from "axios";

export function getCategories() {
	return axios
		.get(`https://nc-news-2e8v.onrender.com/api/topics`)
		.then((results) => {
			return results.data.topics;
		});
}

export function getArticles(category, sort_by, order) {
	if (category === "articles") {
		category = undefined;
	}
	return axios
		.get(`https://nc-news-2e8v.onrender.com/api/articles`, {
			params: {
				topic: category,
				sort_by: sort_by,
				order: order,
			},
		})
		.then((results) => {
			return results.data.articles;
		});
}

export function getRandomArticleId(array) {
	return Math.floor(Math.random() * (array.length));
}

export function getArticleById(id) {
	return axios
		.get(`https://nc-news-2e8v.onrender.com/api/articles/${id}`)
		.then((results) => {
			return results.data.article;
		});
}

export function validateUser(user) {
	return axios
		.get(`https://nc-news-2e8v.onrender.com/api/users/${user}`)
		.then((results) => {
			return results;
		});
}

export function getCommentsByArticleId(article_id) {
	return axios
		.get(
			`https://nc-news-2e8v.onrender.com/api/articles/${article_id}/comments`
		)
		.then((results) => {
			return results.data.comments;
		});
}

export function updateVotes(id, vote) {
	return axios.patch(`https://nc-news-2e8v.onrender.com/api/articles/${id}`, {
		inc_votes: vote,
	});
}
export function updateCommentVotes(id, vote) {
	return axios.patch(`https://nc-news-2e8v.onrender.com/api/comments/${id}`, {
		inc_votes: vote,
	});
}

export function postComment(id, comment) {
	return axios.post(
		`https://nc-news-2e8v.onrender.com/api/articles/${id}/comments`,
		comment
	);
}

export function deleteComment(id) {
	return axios.delete(`https://nc-news-2e8v.onrender.com/api/comments/${id}`);
}
export function deleteArticle(id) {
	return axios.delete(`https://nc-news-2e8v.onrender.com/api/articles/${id}`);
}

export function postArticle(body){
  return axios.post(`https://nc-news-2e8v.onrender.com/api/articles`, body)
  .then((result) => {
    return result.data.article
  })
}