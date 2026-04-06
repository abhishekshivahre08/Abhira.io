import { motion } from "motion/react";
import React from 'react'
import { useState } from "react";
import LoginModel from "../../components/LoginModel";

function Hero() {
    const highlights = [
        "AI-Powered Website Generation",
        "Fully Responsive Layouts",
        "Production-Ready Output",
    ]
const [openLogin , setOpenLogin] = useState(false);

    return (
        <div className='min-h-screen bg-[#040404] text-white overflow-hidden '>
            {/* navber section */}
 <motion.div
            initial={{y: -40, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 1}}
                className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 '>
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center ">
                    {/* left side content */}
                    <div className="text-2xl font-bold cursor-pointer" >
                        <img src="/logo1.png" alt="logo" className="h-10"/>
                        Abhira.<span style={{color:"#05BEBF"}}>io</span>
                    </div >
                    {/* right side content */}
                    <div className='flex items-center gap-5'>
                        <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer">
                            Pricing
                        </div>
                        <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm "  onClick={()=>setOpenLogin(true)} >
                            Get Started
                        </button>
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
                <button className=' mt-4 px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition' 
                onClick={()=>setOpenLogin(true)}>Get Started</button>
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
                            className='rounded-xl bg-white/5 border border-white/10 p-8'>
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

