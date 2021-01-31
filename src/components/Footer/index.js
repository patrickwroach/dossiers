import { signOutUser } from '../../firebase/firebaseActions';

const Footer = ({user}) => {
    //  console.log(signOutUser)
    let getUserDisplay = () => {
        let name;
        if(user) { 
          name =  user.userDisplayName ? user.DisplayName : user.email;
        }
        return name
    }  
    return (
        <footer className="footer material material-black">
            {user ? 
            <>
                <p>signed in as {getUserDisplay()}</p>
                <button 
                    className="footer_sign-out button material"
                    onClick={()=>{signOutUser()}}>
                    Sign Out
                </button>
            </>
            : ""}
        </footer>
    )
}
export default Footer