import { useEffect, useRef, useState } from "react";

export function PhotoModal({ setPhoto, closeModal }) {

    const [message, setMessage] = useState('');

    const canvasRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        const mediaDevices = navigator.mediaDevices;

        mediaDevices.getUserMedia({video: true})
        .then((stream) => {
            videoRef.current.srcObject = stream
            videoRef.current.play();
        })
        .catch(alert);
    }, []);

    const takeScreenshot = () => {
        videoRef.current.pause();
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        
        canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0);

        canvasRef.current.toBlob(async (blob) => {
            if (!blob) {
                console.log('sem imagem');
                return;
            }
            
            setPhoto(blob);
        }, 'image/webp');

        setMessage('Salvando foto...');
        setTimeout(() => {
            closeModal();
        }, 2000);
    }

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">

            <div className="bg-white max-w-xl flex flex-col p-5 rounded-md gap-3">
                <span>{ message }</span>
                <div className='flex justify-center'>
                    <video 
                    className='border rounded-md w-full'
                    ref={videoRef} src=""></video>
                </div>
                
                <div className='flex justify-end gap-2'>           
                    <button 
                        className='border py-1.5 px-2 rounded-md hover:bg-stone-100 transition-colors'
                        onClick={closeModal}
                    >
                        Fechar
                    </button>
                    <button 
                    className='bg-green-600 text-white border py-1.5 px-2 rounded-md hover:bg-green-500 transition-colors'
                    onClick={takeScreenshot}
                    >
                        Take a photo
                    </button>
                </div>
            </div>

            <canvas className="hidden" ref={canvasRef}></canvas>
        </div>
    );
}