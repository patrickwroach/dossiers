import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from './components/Footer';
import MainNav from './components/MainNav';
import LoginForm from './components/LoginForm';
import Listing from './components/Listing';
import { useState, useEffect } from 'react';

import { asyncGetFriends } from './firebase/firebaseActions';

function App() {
  const [friendData, setFriendData] = useState([]);
  
  useEffect(() => {
      (async () => {
        const friends = await asyncGetFriends();
        setFriendData(friends);
      })();
    }, [],
  );
  
  return (
    <Router>
      <div className="App">
        <MainNav/>
        <div className="content">
          <Switch>
            <Route exact path="/" component={LoginForm}/>
            <Route path="/listing" render={() => <Listing friendData={friendData} setFriendData={setFriendData}/>}/>
          </Switch>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
