import {useState} from 'react'
import {firebaseAppAuth} from '../../firebase/firebaseActions'



const LoginForm = () => {

    const [formInput, setFormInput] = useState ({})

    const inputValueToState = (e) => {
        let toAddToState = formInput
        toAddToState[e.target.type] = e.target.value;
        setFormInput(toAddToState);
    }

    const signInWithEmailAndPasswordHandler = (formInput) => {
        const {
            email,
            password
        } = formInput
        firebaseAppAuth.signInWithEmailAndPassword(email, password).catch(error => {
          console.error("Error signing in with password and email", error);
        });
      };

    return(
            <div className="login">
        <input 
            className="material input login_input" 
            id="txtEmail" 
            type="email" 
            placeholder="email"
            onChange={(e) => { inputValueToState(e) }}
            />
        <input 
            className="material input login_input" 
            id="txtPassword" 
            type="password" 
            placeholder="email"
            onChange={(e) => { inputValueToState(e) }}
            />
        <button 
            className="button material material-black" 
            id="btnLogin"
            onClick={()=>{signInWithEmailAndPasswordHandler(formInput)}}
            > 
            Log In
        </button>
     </div>
    )
}


export default LoginForm