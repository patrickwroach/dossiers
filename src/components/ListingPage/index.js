import { useState } from 'react';
import { asyncGetFriends, addFriend,  deleteFriend  } from '../../firebase/firebaseActions';

import FriendDashboard from './components/friend-dashboard'
import Modal from '../Modal'



const ListingPage = ({ friendData, setFriendData, }) => /**/ {
  const defaultNewFriend = {
    firstName: "first-name",
    lastName: "last-name"
  }
  const defaultActiveFriend = {
    id:"",
    modalOpen:false
  }

  const [newFriend, setNewFriend] = useState(defaultNewFriend);
  const [activeFriend, setActiveFriend] = useState(defaultActiveFriend);


  //TODO: make this a blanket helper function 
  const inputToState = (e) => {
    let toAddToState = newFriend;
    toAddToState[e.target.name] = e.target.value;
    setNewFriend(toAddToState);
  }

  const refreshFriends = () => {
    (async () => {
      const friends = await asyncGetFriends();
      setFriendData(friends);
    })()
  }

  const addFriendRefreshList = () => {
    console.log(newFriend)
    if (newFriend.firstName && 
        newFriend.lastName 
        )
         {
      addFriend(newFriend.firstName, newFriend.lastName);
      const firstNameInput = document.getElementById("first-name-input");
      firstNameInput.value = firstNameInput.placeholder
      const lastNameInput = document.getElementById("last-name-input");
      lastNameInput.value = lastNameInput.placeholder
      setNewFriend(defaultNewFriend);
      setTimeout(refreshFriends, 100)
    } else {
      alert("Your friend needs a first and last name")
    }


  };

  const removeFriendRefreshList = (friend) => {
    const {
      id,
      firstName
    } = friend
    var person = prompt(`Are you sure you want to delete ${firstName}, type out their first name to confirm`);
    if (person === firstName) {
    deleteFriend(id);
      } else {
    alert(`Whew, that was a close one. Glad you are keeping ${firstName} around`)
  }
 
    setTimeout(refreshFriends, 100)
  }

  const openFriendDetails = (id)=>{
    const friend = friendData.filter(friend => {
      return friend.id === id
        }  )
    friend[0].modalOpen = true
    setActiveFriend(...friend);
  }
/* 
  const whoMyOnionBois=(category, preferenceId) => (  friendData.filter(friend => {
  
      if(friend[category]){
        return friend[category].includes(preferenceId)
      }else {
        return null;
      }  
    })
  ) */
 //console.log(whoMyOnionBois("favoriteFoods", "onion"))

  const renderFriendsList = () => (
    friendData.map((friend, i) => (
      <li key={friend.id} className="listing_friend">
        <button className="listing_friend-name button material" onClick={() => {openFriendDetails(friend.id)}}>
          {friend.lastName}, {friend.firstName}
        </button>
        <button className="button material material-black" onClick={() => {removeFriendRefreshList(friend)}}>X</button>
      </li>
    ))
  )

  return (
    <>
      <h1 className="listing_heading">Friends</h1>

      <h2 className="listing_subheading">Add a Friend</h2>
      <div className="listing_form">
        <div className="listing_inputs-wrapper">
          <input className="listing_input material" type="text" id="first-name-input" name="firstName" placeholder="first name" onChange={(e) => { inputToState(e) }} onFocus={(e) => { e.target.value = "" }} />
          <input className="listing_input  material" type="text" id="last-name-input" name="lastName" placeholder="last name" onChange={(e) => { inputToState(e) }} onFocus={(e) => { e.target.value = "" }} />
        </div>
        <button className="button material material-black" onClick={() => { addFriendRefreshList() }}>Add 'em</button>
      </div>

      <h2 className="listing_subheading">All Friends</h2>
      <ul className="listing_friends">
        {renderFriendsList()}
      </ul>
      {activeFriend && activeFriend.modalOpen ?
            <Modal open={activeFriend.modalOpen} toggle={()=>{setActiveFriend(defaultActiveFriend)}}>
               <FriendDashboard friend={activeFriend} setFriendData={setFriendData} friendData={friendData}/>
            </Modal> : "" }
    </>
  );

};
export default ListingPage;