import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from './pages/Main';
import Movie from './pages/Movie';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Main} />
      <Route path="/movie/:id" component={Movie} />
    </BrowserRouter>
  );
}
