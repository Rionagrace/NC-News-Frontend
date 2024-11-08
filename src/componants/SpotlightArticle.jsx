import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getArticleById, getArticles, getRandomArticleId } from '../../api';
import { Card } from 'react-bootstrap';
import ErrorPage from './ErrorPage';

function SpotlightArticle (){

  const [randomArticle, setRandomArticle] = useState({})

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState({})

  useEffect(() => {
    setLoading(true)
    getArticles()
    .then((results) =>{
     return getRandomArticleId(results)
    })
    .then((id) => {
 return getArticleById(id)
    })
    .then((article) => {
      setRandomArticle(article)
      setLoading(false)
    })
    .catch((error) => {
      setError(error)
    })
    
  }, [])

  if(error.status){
    return <ErrorPage error={error}/>
  }

  if(loading){
    return <div className="loader"></div>
  }
else
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