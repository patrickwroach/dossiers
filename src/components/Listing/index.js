import { useState, useEffect } from 'react';
import  { addFriend, getFriends }  from '../../firebase/firebaseActions';

const Listing = ({friendData, setFriendData})=> {
    const [loadedfriendData, setLoadedfriendData] = useState(friendData)
    let newPers;
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
      
    const addAndUpdateFriend = () => {
      newPers = makeid(3)
      addFriend(newPers, newPers);
      setFriendData(getFriends());
    }
    

    const listfriendData = () => {
        console.log("checking on list")
        let compiledList = "Waiting on list friendData";
        console.log(friendData)
        if (friendData) {
            console.log("i got em")
            compiledList = loadedfriendData.map((item, i) => {
          return <li  key={item.id}>{item.firstName}</li>      
        })} 
        return compiledList
    }


    return (
        <>
        <h1>Friends</h1>
        <button onClick={() => {addAndUpdateFriend()}} className="button material material-black">Submit</button>
        <ul className="list">
          {listfriendData()}
        </ul>
        </>
    )

}
export default Listing;