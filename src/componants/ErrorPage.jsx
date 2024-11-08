function ErrorPage (props){
const {error} = props

console.log(error)

return (
  <section className="error">
  <h2>{error.status} </h2>
  <p>{error.response.data.msg}</p>
  </section>
)
}


export default ErrorPage