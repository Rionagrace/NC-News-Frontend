import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getArticleById, getArticles, getRandomArticleId } from '../../api';
import { Card } from 'react-bootstrap';

function SpotlightArticle (){

  const [randomArticle, setRandomArticle] = useState({})

  useEffect(() => {
    getArticles()
    .then((results) =>{
     return getRandomArticleId(results)
    })
    .then((id) => {
 return getArticleById(id)
    })
    .then((article) => {
      setRandomArticle(article)
    })
    
  }, [])

  return (
    <section className='spotlightTitle'>
    <h2>Spotlight on:</h2>
    <Card className='spotlightArticle'>
        <Card.Header className="cardTitle">{randomArticle.title}</Card.Header>
        <Card.Img variant="top" src={randomArticle.article_img_url} />
       <Card.Body>
          <Card.Text>
            {randomArticle.body}
          </Card.Text>
        </Card.Body>
    </Card>
    </section>
  )
}


export default SpotlightArticle