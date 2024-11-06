import { useContext, useEffect, useState } from "react";
import { getCategories } from "../../api";
import { Link } from "react-router-dom";
import categoryContext from "../contexts/categoryContexts";
import UserContext from "../contexts/userContext";
import { useSearchParams } from "react-router-dom";

function Header() {
	const [categories, setCategories] = useState([]);
	const [loaded, setLoaded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

	const { category } = useContext(categoryContext);

	const { user, setUser } = useContext(UserContext);

	useEffect(() => {
		getCategories().then((results) => {
			setCategories(results);
			setLoaded(true);
		});
	}, []);

	if (loaded) {
		return (
			<>
				<nav>
					{user ? <><Link to="/"><button onClick={()=> {setUser("") ; sessionStorage.clear()}}>log out</button></Link> <p>Logged in as: {user}</p></>
					: 
						<Link to={"/log-in"}>
							<button>{"log in"}</button>
						</Link>
					}
				</nav>
				<Link to={"/"} reloadDocument >
					<h1>NORTHCODERS NEWS</h1>
				</Link>
				<nav className="catNav">
					{categories.map((Acategory) => {
						if (category === Acategory.slug) {
							return (
                <Link to={`/${Acategory.slug}`} key={Acategory.slug} reloadDocument >
								<button className="highlightedcatButton" >
									{Acategory.slug}
								</button>
                </Link>
							);
						}
						return (
              <Link to={`/${Acategory.slug}`} key={Acategory.slug} reloadDocument >
							<button className="catButton" >
								{Acategory.slug}
							</button>
              </Link>
						);
					})}
				</nav>
			</>
		);
	} else return <h2>Loading...</h2>;
}

export default Header;
