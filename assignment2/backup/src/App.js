import Sales from './Sales'
import Sale from './Sale';
import NotFound from './NotFound'
import Navigation from './Navigation'
import './App.css';
import {useEffect, useState} from 'react';
import {Switch, Route} from 'react-router-dom';
function App() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    console.log("app component")
    console.log(recentlyViewed)
  },[recentlyViewed])

  const updateView = (newView) => {
      setRecentlyViewed(newView)
    };

  return (
    <Switch>
      <Route  path="/sale/:id">
        <Sale handleView={updateView} rv={recentlyViewed}/>
      </Route> 
      <Route exact path="/sales" >
        <Sales handleView={updateView} rv={recentlyViewed}/>
      </Route>
      <Route exact path="/" >
        <Sales handleView={updateView} rv={recentlyViewed}/>
      </Route>

      <Route>
        <NotFound handleView={updateView} rv={recentlyViewed}/>
      </Route>
    </Switch>

  );
}

export default App;
