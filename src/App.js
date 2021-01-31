import './App.css';
import {useContext} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from "./components/providers/UserProvider";

import Footer from './components/Footer';
import MainNav from './components/MainNav';
import ProfilePage from './components/ProfilePage';
import ListingPage from './components/ListingPage';
import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';

import { 
  asyncGetFriends,
 } from './firebase/firebaseActions';


const App = () => {
  
  const user = useContext(UserContext);
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
        {user ? 
          <Switch>
            <Route exact path="/" render={() => <ListingPage friendData={friendData} setFriendData={setFriendData}/>}/>
            <Route path="/profile" component={ProfilePage}/>
          </Switch>
        :
        <LoginForm/>
       }
        </div>
      
        <Footer user={user}/>
    </Router>
  );
}

export default App;
