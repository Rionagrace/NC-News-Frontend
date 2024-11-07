import { useContext, useEffect, useState } from "react";
;

import { validateUser } from "../../api";
import UserContext from "../contexts/userContext";
import categoryContext from "../contexts/categoryContexts";

function Login (){

  const [testUser, setTestUser] = useState("");
  const { user, setUser } = useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();
    validateUser(event.target.username.value)
    .then((result) => {
      setUser(event.target.username.value);
      sessionStorage.setItem("user", result.data.user.username)
    })
    .catch((error) => {
      if (error.status === 401) {
        alert("invalid user");
      } else alert("hi");
    });
  }

  const {setCategory} = useContext(categoryContext)



  useEffect(() => {
    setCategory("")
    if(!user){
      return
    }
    validateUser(user)
      .then((result) => {
        setUser(user);
        sessionStorage.setItem("user", result.data.user.username)
      })
      .catch((error) => {
        if (error.status === 401) {
          alert("invalid user");
        } else alert("hi");
      });
  }, [user]);

  if (user) {
    return (
      <><section className="logIn">
        <h2>Welcome back, {user}!</h2>
        </section>
      </>
    );
  }
  if (!user)
  return (
    <>
    <section className="logIn">
      <form
        onSubmit={handleSubmit}
        action=""
        method="get"
        className="form"
        id="logIn"
      >
        <label htmlFor="username">username:</label>
        <input id="username" type="text"></input>
        <button type="submit">Log In</button>
      </form>
      </section>
    </>
  );
}

export default Login