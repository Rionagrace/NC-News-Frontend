import { useContext, useEffect, useState } from "react";
import { getCategories, validateUser } from "../../api";
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
	const [profilePhoto, setProfilePhoto] = useState("");

	useEffect(() => {
		getCategories().then((results) => {
			results.push({slug: "all articles"})
			setCategories(results);
			setLoaded(true);
		});
	}, []);

	useEffect(() => {
		if(user){
		validateUser(user).then((results) => {
			setProfilePhoto(results.data.user.avatar_url);
		})
	};
	}, [user]);

	if (loaded) {
		return (
			<section className="header">
				<nav>
					{user ? (
						<section className="loggedin">
							<Link to="/">
								<button
									onClick={() => {
										setUser("");
										sessionStorage.clear();
									}}
								>
									log out
								</button>
							</Link>{" "}
							<section className="profileInfo">
							<p>{user}</p>
							<img className="profilePic" src={profilePhoto} />
							</section>
						</section>
					) : (
						<Link to={"/log-in"}>
							<button>{"log in"}</button>
						</Link>
					)}
				</nav>
				<Link to={"/"} reloadDocument>
					<h1>NORTHCODERS NEWS</h1>
				</Link>
				<nav className="catNav">
					{categories.map((Acategory) => {
						if (category === Acategory.slug) {
							return (
								<Link
									to={`/${Acategory.slug}`}
									key={Acategory.slug}
									reloadDocument
								>
									<button >
										{Acategory.slug}
									</button>
								</Link>
							);
						}
						return (
							<Link
								to={`/${Acategory.slug}`}
								key={Acategory.slug}
								reloadDocument
							>
								<button className="highlightedcatButton">{Acategory.slug}</button>
							</Link>
						);
					})}
				</nav>
			</section>
		);
	} else return <div className="loader"></div>
}

export default Header;
