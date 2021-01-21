import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from './components/Footer';
import MainNav from './components/MainNav';
import Home from './components/home';
import Listing from './components/Listing';
import { useState, useEffect } from 'react';


import { getFriends } from './firebase/firebaseActions';


function App() {

  const [friendData, setFriendData] = useState(getFriends());
  useEffect(() => {
    setFriendData(getFriends())
  },
    []
  )


  return (
    <Router>
      <div className="App">
        <MainNav />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/listing" render={() => <Listing friendData={friendData} setFriendData={setFriendData} />} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>


  );
}

export default App;
