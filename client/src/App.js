import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
   return (
      <BrowserRouter>
         <Container maxwidth="lg">
            <Navbar />
            <Switch>
               <Route path="/auth" component={Auth} />
               <Route path="/" component={Home} />
            </Switch>
         </Container>
      </BrowserRouter>
   );
};
export default App;
