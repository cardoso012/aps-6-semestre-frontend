import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { PhotoModal } from './modal/photo-modal';

export function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photo, setPhoto] = useState('');
    const [photoModal, setPhotoModal] = useState(false);

    const closePhotoModal = () => {
        setPhotoModal(false);
    }
    
    const openPhotoModal = () => {
        setPhotoModal(true);
    }

    const submit = async (event) => {
        event.preventDefault();

        const body = {
            name, 
            email, 
            password, 
            file: photo
        }
        console.log(body);

        const response = await fetch('http://localhost:3000/user-create', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await response.json();
        
        navigate('/login');
    }

    return (
        <div className="flex justify-center items-center h-screen w-full bg-stone-100">

            { photoModal && 
                <PhotoModal 
                    setPhoto={setPhoto} 
                    closeModal={closePhotoModal}
                />
            }

            <div className="flex flex-col items-center space-y-3 border p-5 rounded-md bg-white shadow-sm">
                <h1 className="text-2xl">Register</h1>

                <form onSubmit={submit} className="min-w-96 space-y-2">
                    <div className="flex flex-col gap-3 py-2">
                        <label htmlFor="name">Nome</label>
                        <input 
                            onChange={(event) => setName(event.target.value)}
                            className="border py-1.5 px-2 rounded-md outline-none"
                            type="text" 
                            id="name" 
                            placeholder="Seu nome"
                        />
                    </div>

                    <div className="flex flex-col gap-3 py-2">
                        <label htmlFor="email">Email</label>
                        <input 
                            onChange={(event) => setEmail(event.target.value)}
                            className="border py-1.5 px-2 rounded-md outline-none"
                            type="email" 
                            id="email" 
                            placeholder="Seu email"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-3 py-2">
                        <label htmlFor="password">Senha</label>
                        <input 
                            onChange={(event) => setPassword(event.target.value)}
                            className="border py-1.5 px-2 rounded-md outline-none"
                            type="password" 
                            id="password" 
                            placeholder="Sua senha"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-3 py-2">
                        <label htmlFor="photo">Foto</label>
                        <button 
                            onClick={openPhotoModal}
                            className="border py-1.5 px-2 rounded-md hover:bg-stone-100 outline-none" 
                            type="button" 
                            id="photo"
                        >
                            Tirar foto
                        </button>
                    </div>
                                        
                    <div className="flex gap-5 justify-end items-center">
                        <Link
                            className="bg-red-500 text-white border py-1.5 px-2 rounded-md hover:bg-red-400 outline-none"
                            to="/login"
                        >
                            Go back
                        </Link>
                        <button
                            className="border py-1.5 px-2 rounded-md hover:bg-stone-100 outline-none"
                        >
                            Register
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );

}