import  { useState, useEffect, createContext } from 'react';
import { firebaseAppAuth, generateUserDocument } from '../../firebase/firebaseActions'

export const UserContext = createContext({ user: null });
const UserProvider = ({children}) => {
    const [user, setUser ] = useState(null);

    useEffect(() => {
        (async () => {
            firebaseAppAuth.onAuthStateChanged(async userAuth => {
                const currentUser = await generateUserDocument(userAuth);
                setUser(currentUser);
            })
            })();
        }, [],
    );

    return (
        <UserContext.Provider value={user}>
        {children}
      </UserContext.Provider>
    )
}
export default UserProvider;