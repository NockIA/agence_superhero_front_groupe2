import '../auth_style.css'
import '../../../styles/index.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../../../utils/constants'

export const SignUp: React.FC = () => {
    const [emailController, setEmailController] = useState("");
    const [firstnameController, setFirstnameController] = useState("");
    const [lastnameController, setLastnameController] = useState("");
    const [passwordController, setPasswordController] = useState("");

    const signUp = async () => {
        try {
            await axios.post(apiUrl + "adduser", { email: emailController, firstname: firstnameController, lastname: lastnameController, password: passwordController })
        } catch (error: any) {
            throw new Error("Error while trying to add user to database");
        }
    }
    return (
        <main className='columnContainer container_signup_form'>
            <div className='container_logo_sign'>
                <img className='form_logo ' src="/logo.png" alt="logo" />
            </div>
            <h2 className='title_form'>Créez un compte</h2>
            <p className='subtitle_form'>Rejoignez notre Ligue des Inscriptions et devenez un super contributeur en partageant vos connaissances sur l'univers des super-héros. </p>
            <div className='columnContainer container_inputs_field'>
                <div className='rowContainer container_name'>
                    <input onChange={(e) => setLastnameController(e.target.value)} placeholder='Nom' className='sign_input sign_input_name' type="text" />
                    <input onChange={(e) => setFirstnameController(e.target.value)} placeholder='Prénom' className='sign_input sign_input_name' type="text" />
                </div>
                <input onChange={(e) => setEmailController(e.target.value)} placeholder='Email' className='sign_input' type="email" />
                <input onChange={(e) => setPasswordController(e.target.value)} placeholder='Password' className='sign_input' type="password" />
            </div>
            <button onClick={() => signUp} className='sign_button'>S'incrire</button>
            <p className='switch_sign_text'>Vous avez déjà un compte ? <Link to={'/signin'} className='link_sign'>Se connecter</Link></p>
        </main>
    )
}