import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const blankResponses = {
    
  favoriteFoods:{
    displayName: 'Favorite Foods',
    items:[]
  },
  hatedFoods: { 
    displayName: 'Hated Foods',
    items:[]
  },
  favoriteDrinks:{
    displayName: 'Favorite Drinks',
    items:[]
  },
  favoriteScents:{
    displayName: 'Favorite Scents',
    items:[]
  }

}
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
        responses: blankResponses
      });
    }
  }).catch(function (error) {
    console.log('Error getting document:', error);
  });
};

const addPreference = (newPreference, friend) => {
  console.log("in action", newPreference, friend)
  //Add pref to Friend
  const friendDocId = `${friend.lastName}-${friend.firstName}`;
  var friendsRef = db.collection('friends');
  var friendDocRef = friendsRef.doc(friendDocId);
  friendDocRef.get().then(function (doc) {
      friendsRef.doc(friendDocId).update({
        [`responses.${newPreference.category}.items`]: firebase.firestore.FieldValue.arrayUnion(newPreference.value)
      });
  }).catch(function (error) {
    console.log('Error getting document:', error);
  });
  //add Prefrence to Preference collection
  const prefDocId = newPreference.value;
  var prefRef = db.collection('preferences');
  var newPrefDocRef = prefRef.doc(prefDocId);
  newPrefDocRef.get().then(function (doc) {
    if (!doc.exists) {
        prefRef.doc(prefDocId).set({
        [`${newPreference.category}.items`]: blankResponses
      });
      prefRef.doc(prefDocId).update({
        [`${newPreference.category}.items`]: firebase.firestore.FieldValue.arrayUnion(friendDocId)
      });
    } else {
        prefRef.doc(prefDocId).update({
        [`${newPreference.category}.items`]: firebase.firestore.FieldValue.arrayUnion(friendDocId)
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
      console.log(aFriend)
      if(aFriend.favoriteFoods){
      }
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


export { db, getFriends, addFriend, asyncGetFriends, deleteFriend, addPreference  };
