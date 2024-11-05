function Vote (props) {
  const {article} = props
  return (
    <section className="vote">
    <button>+</button>
    <button>-</button>
    <p>{article.votes}</p>
    </section>
  )
}

export default Vote