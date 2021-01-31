import {useState} from 'react'
import {signInWithEmailAndPassword} from '../../firebase/firebaseActions'



const LoginForm = () => {

    const [formInput, setFormInput] = useState ({})

    const inputValueToState = (e) => {
        let toAddToState = formInput
        toAddToState[e.target.type] = e.target.value;
        setFormInput(toAddToState);
    }
    const handleSignIn = () => {
        signInWithEmailAndPassword(formInput);
      //  promise.catch(e =>console.log(e.message))
    }
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
            onClick={()=>{handleSignIn()}}
            > Log In</button>
        <button className="button material material-black" id="btnSignUp"> Sign up</button>
    </div>
    )
}


export default LoginForm