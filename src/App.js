import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app'
import Footer from './components/Footer';
import MainNav from './components/MainNav';
import Home from './components/Home';
import Listing from './components/Listing';
import { useState, useEffect } from 'react';

import { 
  asyncGetFriends,
 } from './firebase/firebaseActions';

const App = ({  user, signOut,signInWithGoogle,}) => {
  
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
        <MainNav/>
        <div className="content">
          <Switch>
            <Route exact path="/" render={() => <Listing friendData={friendData} setFriendData={setFriendData}/>}/>
            <Route path="/profile" component={Home}/>
          </Switch>
        </div>
        <Footer/>
    </Router>
  );
}

export default App;
