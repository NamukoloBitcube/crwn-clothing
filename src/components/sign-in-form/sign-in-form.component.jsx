import './sign-in-form.styles.scss';
import { useState } from 'react';
import {  signInWithGooglePopup, signInUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { createUserDocumentFromAuth, } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';


const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {

    
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    // const resetFormFields = setFormFields(defaultFormFields);

    const signInWithGoogle =  async () => {
         await signInWithGooglePopup();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { email, password } = event.target
      
        //try catch when interfacing with APIs as I dont have control over implementation of said API and any changes shouldn't break my app
        try {
            const { user } =  await signInUserWithEmailAndPassword(email.value, password.value)
            // setCurrentUser(user)
            alert('Sign in successful')
        } catch(error){
            if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found'){
                alert('Email or password incorrect');
            } else {
                alert(error.message);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]: value })
    }

    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={ handleSubmit }>

                <FormInput
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange}
                    name="email"
                    value={email}
                />

                <FormInput
                    label="Password" 
                    type="password" 
                    required 
                    onChange={handleChange}
                    name="password"
                    value={password}
                />

                <div className='buttons-container'>
                    <Button  type="submit"> Sign In</Button>   
                    <Button type="button" onClick={signInWithGoogle} buttonType='google'> Google Sign In</Button> 
                </div>    
            </form>
        </div>
    );
}

export default SignInForm