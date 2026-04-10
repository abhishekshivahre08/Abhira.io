import React from 'react'
import { AnimatePresence, motion } from 'motion/react';
import googlelog from "../assets/google-icon-logo-svgrepo-com.svg";
import { signInWithPopup, } from "firebase/auth";
import { auth, provider } from '../firebase';
import axios from 'axios';
import  {serverUrl }from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function LoginModel({ open, onClose }) {
      const dispatch = useDispatch();
    // faching the Google Authentication
const handleGoogleAuth = async()=>{
    try{
        const result=await signInWithPopup(auth, provider);
      const {data} = await axios.post(`${serverUrl}/api/auth/google`,{
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
     
    }, {withCredentials: true});

    dispatch(setUserData(data));
onClose();
    } catch(error){
        console.error("Google Authentication Error:", error);
    }
};

    return (
        <AnimatePresence>
            {open && <motion.div className='fixed inset-0 z-100 flex items-center justify-center
        bg-black/80 backdrop-blur-xl px-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.88, y: 60, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 40, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className='relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br form-purpla-500/40 via-blue-500/30 to-transparent'
                    onClick={(e) => {
                        e.stopPropagation();

                    }}>

                    <div className="relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_30px_120px-rgba(0,0,0,0.8)] overflow-hidden">
                        <motion.div
                            animate={{ opacity: [0.25, 0.4, 0.25] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className='absolute -top-32 -left-32 w-80 bg-purple-500/30 blur-[140px]'
                        />

                        <motion.div animate={{ opacity: [0.25, 0.4, 0.25] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className='absolute -top-32 -left-32 w-80 bg-purple-500/30 blur-[140px]'
                        />

                        <button className='absolute top-5 right-5 z-20 text-Zinc-400 hover:text-white transition text-lg ' onClick={onClose}>X</button>
                        <div className="relative px-8 py-14 pb-10 text-center">
                            <h1 className="inline-block mb-6 px-4 py-1 5 rounded-full bg-white/5 boder border-white/10 text-xs text-zinc-300">AI-powerd website builder</h1>
                            <h2 className="text-3xl font-semibold leading-tight mb-3 space-x-2">
                                <span>Welcome to</span>
                                <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Abhira.io</span>
                            </h2>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className=" group relative w-full h-13 rounded-xl bg-white text-black font-smeibold shadow-lg shadow-blue-500 overflow-hidden"
                         onClick={handleGoogleAuth}   >

                                <div className="relative flex items-center justify-center gap-3">
                                    <img src={googlelog} alt="Google Logo" style={{ width: "10%" }} /> Continue with Google
                                </div>

                            </motion.button>

                            <div className="flex items-center gap-4 my-10">
                                <div className='h-px flex-1 bg-white/10' />
                                <span className="text-xs text-zinc-500 traking-wide">Secure Login</span>
                                <div className='h-px flex-1 bg-white/10' />
                            </div>

                            <p className='text-xs text-zinc-500 leading-relaxed'>
                                By continunig, you agree to our <span className="underline cursor-pointer hover:text-zinc-300">Terms of Service</span> {" "} and {" "} <span className="underline cursor-pointer hover:text-zinc-300">Privacy Policy</span>.
                            </p>
                        </div>

                    </div>
                </motion.div>



            </motion.div>}
        </AnimatePresence>

    );
}


export default LoginModel;