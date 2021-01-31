import  { useState, useEffect, createContext } from 'react';
import { firebaseAppAuth  } from '../../firebase/firebaseActions'

export const UserContext = createContext({ user: null });
const UserProvider = ({children}) => {
    const [user, setUser ] = useState(null);

    useEffect(() => {
        (async () => {
            firebaseAppAuth.onAuthStateChanged(userAuth => {
                setUser({ user: userAuth});
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