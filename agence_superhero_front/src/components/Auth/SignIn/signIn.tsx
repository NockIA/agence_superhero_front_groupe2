import '../auth_style.css'
import '../../../styles/index.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../../../utils/constants'

export const SignIn: React.FC = () => {
    const [emailController, setEmailController] = useState("");
    const [passwordController, setPasswordController] = useState("");
    const [errorMessage, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const signIn = async () => {
        try {
            const result = await axios.post(apiUrl + "isvaliduser", { email: emailController, password: passwordController });
            if (result.data === true) {
                navigate("/");
                setErrorMsg('');
            } else {
                setErrorMsg("User doesn't exit");
            }
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
            <button onClick={() => signIn} className='sign_button'>Login</button>
            <p className='switch_sign_text'>Don't you already have an account? <Link to={'/signup'} className='link_sign'>Sign Up</Link></p>
        </main>
    )
}