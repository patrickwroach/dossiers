import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const addFriend = (firstName, lastName) => {
  const docId = `${lastName}-${firstName}`;
  var friendsRef = db.collection('friends');
  var docRef = friendsRef.doc(docId);
  docRef.get().then(function (doc) {
    if (doc.exists) {
      alert('already have this friend');
    } else {
      friendsRef.doc(docId).set({
        firstName: firstName,
        lastName: lastName,
      });
    }
  }).catch(function (error) {
    console.log('Error getting document:', error);
  });
};

const deleteFriend = (id) =>{
  db.collection("friends").doc(id).delete()
}

const getFriends = () => {
  let allFriends = [];
  db.collection('friends').get().then(function (querySnapshot) {
    
    querySnapshot.forEach(function (doc) {
      let aFriend = doc.data();
      aFriend.id = doc.id;
      allFriends.push(aFriend);
      
    });
    
  });
  return allFriends;
};


const asyncGetFriends = async () => {
  const { docs } = await db.collection('friends').get();
  return docs.map((friend) => ({
    ...friend.data(),
    id: friend.id,
  }));
}

export { db, getFriends, addFriend, asyncGetFriends, deleteFriend };
