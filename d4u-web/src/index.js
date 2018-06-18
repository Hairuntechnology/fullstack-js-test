import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { 
  BrowserRouter as Router,
  HashRouter,
  Route, 
  Link,
} from 'react-router-dom'
import Employer  from './components/employerPage'
import Experience  from './components/experiencePage'
import { Switch } from 'react-router'
const client = new ApolloClient({
  uri: 'http://localhost:4001'
})

ReactDOM.render(
 
    
     <ApolloProvider client={client}>
     <HashRouter>
      <Switch>
          <Route exact path="/" component={Employer} />
          <Route path="/emp" component={Employer} />
          <Route path="/exp" component={Experience} />
      </Switch> 
       </HashRouter>
     </ApolloProvider>
  
 , 
  document.getElementById('root')
);
registerServiceWorker();
