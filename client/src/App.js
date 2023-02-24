import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';

import { BrowserRouter,Routes,Route,useNavigate,Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth.js';
import PostsDetail from './components/PostDetails/PostDetails'

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact  element={<Navigate to='/posts' /> }/>
          <Route path="/posts" exact   element={<Home /> }/> 
          <Route path="/posts/search" exact   element={<Home /> }/> 
          <Route path="/posts/:id" exact   element={<PostsDetail /> }/>
          <Route path={['/creators/:name', '/tags/:name']} element={CreatorOrTag} />
          <Route path="/auth" exact   element={()=>(!user ? <Auth /> :<Navigate to='/posts' />)}/>

        </Routes>
        
      </Container>
    </BrowserRouter>
  );
};

export default App;
