import { useState } from 'react'
import { Link } from "react-router-dom";
import { BiometricAuthenticationModal } from "./modal/biometric-authentication-modal";
import { api } from '../../../lib/api';

export function Login() {
    const [biometricModal, setBiometricModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('senha', password);

        const response = await api.post('/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true 
        });

        return response.data;
    }

    const submit = async(event) => {
        event.preventDefault();

        const response = await login();
        if(response.login) {
            setMessage('');
            openBiometricModal();
        } else {
            setMessage('Credenciais inválidas.');
        }
    };

    const closeBiometricModal = () => {
        setBiometricModal(false);
    }
    
    const openBiometricModal = () => {
        setBiometricModal(true);
    }

    return (
        <div className="flex justify-center items-center h-screen w-full bg-stone-100">

            {biometricModal && 
                <BiometricAuthenticationModal 
                    closeModal={closeBiometricModal} 
                />
            }

            <div className="flex flex-col items-center space-y-3 border p-5 rounded-md bg-white shadow-sm">
                <h1 className="text-2xl">Login</h1>

                <span className='text-red-600'>{message}</span>
                <form onSubmit={submit} className="min-w-96 space-y-2">
                    <div className="flex flex-col gap-3 py-2">
                        <label htmlFor="email">Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)}
                            className="border py-1.5 px-2 rounded-md outline-none"
                            type="email" 
                            id="email" 
                            placeholder="Seu email"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-3 py-2">
                        <label htmlFor="password">Senha</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            className="border py-1.5 px-2 rounded-md outline-none"
                            type="password" 
                            id="password" 
                            placeholder="Sua senha"
                        />
                    </div>
                    
                    <div className="flex gap-5 justify-between items-center">
                        <Link 
                            className="text-indigo-800" 
                            to="/register"
                        >
                            Don't have an account yet? Register!
                        </Link>
                        <button
                            className="border py-1.5 px-2 rounded-md hover:bg-stone-100 outline-none"
                        >
                            Log in
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );

}