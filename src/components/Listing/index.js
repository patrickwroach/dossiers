import { useState, useEffect } from 'react';
import { asyncGetFriends, addFriend, getFriends } from '../../firebase/firebaseActions';

const Listing = ({ friendData, setFriendData, }) => /**/ {
  const [newFriend, setNewFriend] = useState({});
  
  const inputToState = (e) => {
    let toAddToState = newFriend;
    toAddToState[e.target.name] = e.target.value;
    setNewFriend(toAddToState);
  }
  
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  const addAndUpdateFriend = () => {

   console.log("new bud", newFriend)
   addFriend(newFriend.firstName, newFriend.lastName);
  
    (async () => {
      const friends = await asyncGetFriends();
      setFriendData(friends);
    })(); 
  };
  //
  // const listfriendData = () => {
  //   console.log('checking on list');
  //   let compiledList = 'Waiting on list friendData';
  //   console.log(friendData);
  //   if (friendData) {
  //     console.log('i got em');
  //     compiledList = loadedfriendData.map((item, i) => {
  //       return <li key={item.id}>{item.firstName}</li>;
  //     });
  //   }
  //   return compiledList;
  // };
  
  const renderFriendsList = () => (
    friendData.map((friend, i) => (
      <li key={i}>
        {friend.id}
      </li>
    ))
  )
  
  
  return (
    <>
      <h1>Friends</h1>

      <h2>Add a Friend</h2>
        <input id="first-name-input" type="text" name="firstName" placeholder="first name" onChange={(e)=>{inputToState(e)}}/>
        <input id="last-name-input" type="text" name="lastName" placeholder="last name" onChange={(e)=>{inputToState(e)}} />
        <button onClick={()=>{addAndUpdateFriend()}}>Add 'em</button>

      <h2>All Friends</h2>
      <ul>
        { renderFriendsList() }
      </ul>
    </>
  );
  
};
export default Listing;