import { useState } from 'react';
import { asyncGetFriends, addFriend, deleteFriend } from '../../firebase/firebaseActions';

const Listing = ({ friendData, setFriendData, }) => /**/ {
  const defaultState = {
    firstName: "first-name",
    lastName: "last-name"
  }
  const [newFriend, setNewFriend] = useState(defaultState);

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
    if (newFriend.firstName && newFriend.lastName) {
      addFriend(newFriend.firstName, newFriend.lastName);
      const firstNameInput = document.getElementById("first-name-input");
      firstNameInput.value = firstNameInput.placeholder
      const lastNameInput = document.getElementById("last-name-input");
      lastNameInput.value = lastNameInput.placeholder
      setNewFriend({ defaultState });
      setTimeout(refreshFriends, 100)
    } else {
      alert("Your friend needs a first and last name")
    }


  };

  const removeFriendRefreshList = (id) => {
    deleteFriend(id);
    setTimeout(refreshFriends, 100)
  }


  const renderFriendsList = () => (
    friendData.map((friend, i) => (
      <li key={friend.id} className="listing_friend">
        <div class="listing_friend-name">
          {friend.lastName}, {friend.firstName}
        </div>
        <button className="button material material-black" onClick={() => { removeFriendRefreshList(friend.id) }}>X</button>
      </li>
    ))
  )



  return (
    <>
      <h1>Friends</h1>

      <h2 class="listing_subheading">Add a Friend</h2>
      <div class="listing_form">
        <div class="listing_inputs-wrapper">
          <input className="listing_input material" type="text" id="first-name-input" name="firstName" placeholder="first name" onChange={(e) => { inputToState(e) }} onFocus={(e) => { e.target.value = "" }} />
          <input className="listing_input  material" type="text" id="last-name-input" name="lastName" placeholder="last name" onChange={(e) => { inputToState(e) }} onFocus={(e) => { e.target.value = "" }} />
        </div>
        <button className="button material material-black" onClick={() => { addFriendRefreshList() }}>Add 'em</button>
      </div>

      <h2 class="listing_subheading">All Friends</h2>
      <ul class="listing_friends">
        {renderFriendsList()}
      </ul>
    </>
  );

};
export default Listing;