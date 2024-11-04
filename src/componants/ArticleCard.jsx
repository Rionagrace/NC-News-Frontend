
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export function ArticleCard (props) {

const {article} = props
  return (
    <Link to={`articles/${article.article_id}`}>
    <Card className="flexItem" >
    <Card.Header>{article.title}</Card.Header>
    <Card.Body>
      <Card.Text>Written by: {article.author}</Card.Text>
      <Card.Text>Topic: {article.topic}</Card.Text>
    </Card.Body>
    <Card.Img variant="bottom" src={article.article_img_url} />
  </Card>
  </Link>
  )
}

export function RandomArticleCard (props) {
  const {article} = props
  return (
    <Link to={`articles/${article.article_id}`}>
    <Card>
    <Card.Header>{article.title}</Card.Header>
    <Card.Img variant="top" src={article.article_img_url} />
    <Card.Body>
      <Card.Text>Written by: {article.author}</Card.Text>
      <Card.Text>Topic: {article.topic}</Card.Text>
      <Card.Text>{article.body}</Card.Text>
    </Card.Body>
  </Card>
  </Link>
  )

}

