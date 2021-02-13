import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { FetchDataPareto } from './components/FetchDataPareto';
import { Counter } from './components/Counter';

import './custom.css'
import { Dashboard } from './components/Dashboard';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Dashboard} />
        <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchDataPareto} />
      </Layout>
    );
  }
}
