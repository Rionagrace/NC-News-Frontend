import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from './componants/Header'
import Home from './componants/Home';
import Article from './componants/Article';
import categoryContext from './contexts/categoryContexts';
import Login from './componants/Login';
import UserContext from './contexts/userContext';

function App() {

  const [category, setCategory] = useState('')

  const [user, setUser] = useState('')

  return (
    <categoryContext.Provider value={{category, setCategory}}>
      <UserContext.Provider value={{user, setUser}}>
    
      <Header/>
      <section>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/articles/:article_id" element={<Article/>}/>
          <Route path="/log-in" element={<Login/>}/>
        </Routes>
      </section>
    
    </UserContext.Provider>
    </categoryContext.Provider>
  )
}

export default App
