import { useContext, useEffect, useState } from "react";
;

import { validateUser } from "../../api";
import UserContext from "../contexts/userContext";

function Login (){

  const [testUser, setTestUser] = useState("");
  const { user, setUser } = useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();
    setTestUser(event.target.username.value);
  }

  useEffect(() => {
    validateUser(testUser)
      .then((result) => {
        setUser(testUser);
      })
      .catch((error) => {
        if (error.status === 401) {
          alert("invalid user");
        } else alert(error);
      });
  }, [testUser]);

  if (user) {
    return (
      <>
        <h2>Welcome back, {user}!</h2>
      </>
    );
  }
  if (!user)
  return (
    <>
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
    </>
  );
}

export default Login