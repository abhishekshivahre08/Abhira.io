import { AnimatePresence, motion } from "motion/react";
import React from 'react'
import { useState } from "react";
import LoginModel from "../../components/LoginModel";
import { useSelector, useDispatch } from "react-redux";
import { Coins } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../../App";
import { setUserData } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Hero() {
    const highlights = [
        "AI-Powered Website Generation",
        "Fully Responsive Layouts",
        "Production-Ready Output",
    ]
    const [openLogin, setOpenLogin] = useState(false);
    const { userData } = useSelector(state => state.user);
    const [openProfile, setOpenProfile] = useState(false);
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const handleLogOut=async()=>{
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
            dispatch(setUserData(null));
            setOpenProfile(false);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }


    return (
        <div className='min-h-screen bg-[#040404] text-white overflow-hidden '>
            {/* navber section */}
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 '>
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center ">
                    {/* left side content */}
                    <div className="text-2xl font-bold cursor-pointer" >
                        <img src="/logo1.png" alt="logo" className="h-10" />
                        Abhira.<span style={{ color: "#05BEBF" }}>io</span>
                    </div >
                    {/* right side content */}
                    <div className='flex items-center gap-5'>
                        <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer">
                            Pricing
                        </div>
                        {userData && <div className=" hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full
bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 
transition">
                            <Coins size={14} className="text-yellow-400" />
                            <span>Credits</span>
                            <span>{userData.user.credits}</span>
                            <span>+</span>
                        </div>}




                        {!userData ?
                            <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm  shadow-lg shadow-blue-500/20  " onClick={() => setOpenLogin(true)} >
                                Get Started
                            </button>
                            :
                            <div className="relative">
                                <button className="flex items-center gap-3 cursor-pointer" onClick={() => setOpenProfile(!openProfile)}>
                                    <img src={userData.user?.avatar || `https://ui-avatars.com/api/?name=${userData.user?.name}`} referrerPolicy="no-referrer" alt="Avatar" className="w-9 h-9 rounded-full border border-white/20 object-cover" />
                                    {/* <span className="text-sm">{userData.user.name}</span> */}
                                </button>

                                <AnimatePresence>
                                    {openProfile && (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden" >
                                                <div className="px-4 py-3 border border-white/10">
                                                    <p className="text-sm font-medium truncate">{userData.user.name}</p>
                                                    <p className="text-xs text-zinc-500 truncate">{userData.user.email}</p>
                                                </div>

                                                <button className="md:hidden  w-full flex items-center gap-2  px-4 py-3 text-sm border border-white/10 hover:bg-white/5">
                                                    <Coins size={14} className="text-yellow-400" />
                                                    <span>Credits</span>
                                                    <span>{userData.user.credits}</span>
                                                    <span>+</span>
                                                </button>

                                                 <button className="  w-full flex items-center gap-2  px-5 py-3 text-sm border border-white/10 hover:bg-white/5" onClick={()=>navigate("/dashboard")} >Dashboard</button>
                                                   <button className="  w-full flex items-center gap-2  px-5 py-3 text-sm text-red-500 border border-white/10 hover:bg-white/5"
                                                   onClick={handleLogOut}>LogOut</button>


                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>

                        }
                    </div>
                </div>



            </motion.div>


            {/* hero section */}
            <section className="pt-44 pb-32 px-6 text-center">
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className='text-5xl md-text-7xl font-bold tracking-tight'
                >
                    Build Stunning Websites
                    <br />
                    <span className='bg-gradient-to-r from-[#013E7D] via-[#008ECC] to-[#05BEBF] bg-clip-text text-transparent'>with AI</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className='mt-8 max-w-2xl mx-auto text-zinc-400 text-lg'>
                    Describe your vision and Let AI genrate a modern, responsive, production-ready website in seconds.
                </motion.p>
                <button className=' mt-4 px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition  '
                onClick={()=>navigate("/dashboard")}    >{userData ? "Go to Dashboard" :"Get Started" } </button>
            </section>

            {/* card Section  */}
            <section className='max-w-7xl mx-auto px-6 pb-32 mt-12'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                    {highlights.map((highlights, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            duration={0.5}
                            className='rounded-xl shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] bg-white/5 border border-white/10 p-8'>
                            <h1 className='text-xl font-semibold mb-3'>{highlights}</h1>
                            <p className='text-zinc-400 text-sm'>
                                Abhira.io builds real websites - clean code, animations, responsiveness, and scalable structure. Just describe your vision, and let AI generate a modern, responsive, production-ready website in seconds.
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* login form  */}
            {openLogin && <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />}


        </div>
    );
}

export default Hero;

