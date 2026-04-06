import React from 'react'
import { AnimatePresence, motion } from 'motion/react';

function LoginModel({ open, onClose }) {
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
                    className='relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br form-purpla-500/40 via-blue-500/30 to-transparent'>

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

                        <button className='absolute top-5 right-5 z-20 text-'></button>

                    </div>

                </motion.div>



            </motion.div>}
        </AnimatePresence>

    );
}

export default LoginModel;