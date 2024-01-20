import '../auth_style.css'
import '../../../styles/index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

import AuthService from '../../../services/auth_services'
import { apiUrl } from '../../../utils/api'

export const SignIn: React.FC = () => {
    const _authService = new AuthService();
    const [emailController, setEmailController] = useState("");
    const [passwordController, setPasswordController] = useState("");
    const [errorMessage, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const signIn = async () => {
        try {
            await axios.post(apiUrl + "login", { email: emailController, password: passwordController }).then((response)=> {
                if (response.data.token) {
                    _authService.setCookie(response.data.token)
                    navigate("/");
                    setErrorMsg('');
                }
            }).catch((error)=>{
                setErrorMsg(error.message)
            })
        } catch (error: any) {
            throw new Error("Error while trying to check if user is valid :")
        }
    }

    return (
        <main className='columnContainer container_signup_form'>
            <div className='container_logo_sign'>
                <img className='form_logo ' src="/logo.png" alt="logo" />
            </div>
            <h2 className='title_form'>Login</h2>
            <p className='subtitle_form'>Join our Subscription League and become a super-contributor by sharing your knowledge of the superhero universe. </p>
            <div className='columnContainer container_inputs_field'>
                <input required onChange={(e) => { setEmailController(e.target.value) }} placeholder='Email' className='sign_input' type="email" />
                <input required onChange={(e) => { setPasswordController(e.target.value) }} placeholder='Password' className='sign_input' type="password" />
            </div>
            {errorMessage && <p className='text_sign_error'>{errorMessage}</p>}
            <button onClick={signIn} className='sign_button'>Login</button>
            <p className='switch_sign_text'>Don't you already have an account? <Link to={'/signup'} className='link_sign'>Sign Up</Link></p>
        </main>
    )
}