import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import {firebaseAppAuth} from "../../firebase/firebaseActions";
const ProfilePage = () => {
  const user = useContext(UserContext);
  const {displayName, email} = user;
  return (
    <>
        <h2>{displayName}</h2>
        <h3>{email}</h3>
      <button className = "material material-black button" onClick = {() => {firebaseAppAuth.signOut()}}>Sign out</button>
    </>
  ) 
};
export default ProfilePage;