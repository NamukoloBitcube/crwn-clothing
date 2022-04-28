import './sign-up-form.styles.scss';
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {

    
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    // const resetFormFields = setFormFields(defaultFormFields);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { email, password, confirmPassword } = event.target
        // confirm that the passwords match 
        if( password.value !== confirmPassword.value ){
            alert('Your passwords must match');
            return;
        }

        //try catch when interfacing with APIs as I dont have control over implementation of said API and any changes shouldn't break my app
        try {
            const { user } =  await createAuthUserWithEmailAndPassword(email.value, password.value);
            await createUserDocumentFromAuth(user, { displayName });
            // resetFormFields();
        } catch(error){
            if(error.code === 'auth/email-already-in-use')
            {
                alert(`Error: email already exists`)
            } else{
                console.log("Failed to create user: ", error)

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
                    label="Display Name" 
                    type="text" 
                    required 
                    onChange={handleChange}
                    name="displayName" 
                    value={displayName}
                />

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

                <FormInput
                    label="Confirm Password"
                    type="password" 
                    required 
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />

                <Button type="submit" children='Sign Up' buttonType='google'></Button>      
            </form>
        </div>
    );
}

export default SignUpForm