import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';

import Footer from './components/Footer';
import Home from './components/Home'
import MainNav from './components/MainNav';
import LoginForm from './components/LoginForm';
import Listing from './components/Listing';

import firebaseConfig from './firebase/firebaseConfig';
import { auth} from './firebase/firebaseActions';
import { asyncGetFriends } from './firebase/firebaseActions';

firebase.initializeApp(firebaseConfig);

function App({user, signOut, signInWithGoogle}) {

  //const user = useContext(UserContext);
  const [friendData, setFriendData] = useState([]);
  useEffect(() => {
      (async () => {
        const friends = await asyncGetFriends();
        setFriendData(friends);
      })();
    }, []
  );
  
  return (
    <>
      <MainNav user={user}/>
          <div className="content">
          <LoginForm />
  
  
           <Router>
            <Switch>
              <Route path="/profile" component={Home}/>
              <Route path="/" render={() => <Listing friendData={friendData} setFriendData={setFriendData}/>}/>
            </Switch>
            </Router>

  
          
            
          </div>
        <Footer user={user}/>
    </>
  );
}

export default App;
