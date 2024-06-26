import './App.css';

//import components
import AllPosts from './pages/AllPosts'
import Form from './pages/Form'
import SinglePost from './pages/SinglePost'

import Error404 from './components/Error404';

//import hooks
import { useState, useEffect } from 'react'

//import components React Router
import { Route, Routes } from 'react-router-dom'


//Our API URL
const API_URL = "https://ils-ga-blog-0a36edf3ea1e.herokuapp.com" //'http://localhost:8000'

function App() {
  
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const response = await fetch (`${API_URL}/blog/`)
    const data = await response.json()

    console.log(data)

    setPosts(data)
  }

  const handleFormSubmission = async (data, type) => {
    if(type === "new"){ //create
      const response = await fetch (`${API_URL}/blog/`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      getPosts()
    }else{ //edit
      const response = await fetch (`${API_URL}/blog/${data.id}/`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      getPosts()
    }
  }


  const deletePost = async (id) => {
    const response = await fetch(`${API_URL}/blog/${id}`, {
      method: 'delete'
    })
    getPosts()
  }

  useEffect(()=>{
    getPosts()
  }, [])

  return (
    <div className="App">
      {/* <h1>My Blog</h1> */}
     
      <Routes>
        <Route
          exact
          path="/"
          element={<AllPosts posts={posts} deletePost={deletePost} />}
        />
        <Route
          exact
          path="/post/:id"
          element={<SinglePost posts={posts} />}
        />
        <Route
          exact
          path="/new"
          element={<Form
            posts={posts}
            handleSubmit={handleFormSubmission}
            buttonLabel="Add Post"
            formType ="new"/>}
        />
        <Route
          exact
          path="/edit/:id"
          element={<Form 
            posts={posts}
            handleSubmit={handleFormSubmission}
            buttonLabel="Edit Post"
            formType ="edit" />}
        />
        <Route
          path="*"
          element={<Error404 />} status={404} 
        />
      </Routes>
    </div>
  );
}

export default App;