import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../../../../lib/api";

export function BiometricAuthenticationModal({ closeModal }) {
    const [message, setMessage] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const canvasRef = useRef();
    const imageRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        startCapture();
    }, []);

    useEffect(() => {
        if (isVerified) {
            stopCapture();
            return navigate('/dashboard');
        }
    }, [isVerified]);

    const startCapture = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        stream.onremovetrack = () => console.log("Stream ended");

        videoRef.current.srcObject = stream;
        videoRef.current.play();
    }

    const validate = async (data) => {
        const response = await api.post('/comparar', data, { withCredentials: true })
        const { verified } = response.data;
        
        setIsVerified(verified);
        console.log(verified);
   }

    const takeScreenshot = async () => {
        videoRef.current.pause();
        
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0);

        const screenshot = canvasRef.current.toDataURL('image/webp');
        imageRef.current.src = screenshot;

        setMessage('Validando biometria...');
        
        canvasRef.current.toBlob(async (blob) => {
            if (!blob) {
                console.log('sem imagem');
                return;
            }
            
            const formData = new FormData();
            formData.append('imagem', blob, `screenshot-${Date.now()}.webp`);

            try {

                await validate(formData);
                
                if(!isVerified) {
                    setMessage('Biometria inválida, tente novamente.');
                    videoRef.current.play();
                }

            } catch (error) {
                console.log(error);
                setMessage('Biometria inválida, tente novamente.');
                videoRef.current.play();
            }

        }, 'image/webp');
    }

    const stopCapture = () => {
        navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
        });

        videoRef.current.load();
        closeModal();
    }

    return isVerified ? <Navigate to="/dashboard" /> : (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
            
            <div className="bg-white p-5 rounded-md space-y-3">
                <h1 className="text-xl font-medium">Autenticação Biométrica</h1>
                <span>{ message }</span>               
                <div className='flex justify-center'>
                    <video className='border rounded-md w-full' ref={videoRef} src=""></video>
                </div>
                
                <div className='flex justify-end gap-2'>           
                    <button 
                        className='border py-1.5 px-2 rounded-md hover:bg-stone-100 cursor-pointer transition-colors'
                        onClick={stopCapture}
                    >
                        Fechar
                    </button>
                    <button 
                    className='bg-green-600 text-white border py-1.5 px-2 rounded-md cursor-pointer hover:bg-green-500 transition-colors'
                    onClick={takeScreenshot}
                    >
                        Take a photo
                    </button>
                </div>
            </div>

            <canvas className="hidden" ref={canvasRef}></canvas>
            <img className="hidden" ref={imageRef} />
        </div>
    );
}