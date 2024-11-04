
import Card from "react-bootstrap/Card";

export function ArticleCard (props) {

const {article} = props
  return (
    <Card className="flexItem" >
    <Card.Header>{article.title}</Card.Header>
    <Card.Body>
      <Card.Text>Written by: {article.author}</Card.Text>
      <Card.Text>Topic: {article.topic}</Card.Text>
    </Card.Body>
    <Card.Img variant="bottom" src={article.article_img_url} />
  </Card>
  )
}

export function RandomArticleCard (props) {
  const {article} = props
  return (
    <Card >
    <Card.Header>{article.title}</Card.Header>
    <Card.Img variant="top" src={article.article_img_url} />
    <Card.Body>
      <Card.Text>Written by: {article.author}</Card.Text>
      <Card.Text>Topic: {article.topic}</Card.Text>
      <Card.Text>{article.body}</Card.Text>
    </Card.Body>
  </Card>
  )

}

