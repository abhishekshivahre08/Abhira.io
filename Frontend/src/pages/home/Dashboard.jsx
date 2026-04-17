import React from 'react'
import { ArrowLeft, Check, Rocket, Share2 } from 'lucide-react';
import { motion } from "motion/react"
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../../App';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';


function Dashboard() {
    const { userData } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [websites, setWebsites] = useState([null]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copiedId, setCopiedId] = useState(null);

    const handleDeploy = async (id) => {
        try {
            const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`, { withCredentials: true });
            console.log(result);
            window.open(`${result.data.url}`, "_blank");
            setWebsites((prev) =>
                prev.map((website) =>
                    website._id === id ? { ...website, deployed: true, deployedUrl: result.data.url } : website
                ))
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        const handelGetAllWebsites = async () => {
            setLoading(true);
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-all`, { withCredentials: true })
                console.log(result.data);
                setWebsites(result.data || []);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.response.data.message || "something went wrong");
                setLoading(false);
            }
        }
        handelGetAllWebsites();
    }, [])

    const handleCopy = async (e, site) => {
        e.stopPropagation();
        await navigator.clipboard.writeText(site.deployedUrl);
        setCopiedId(site._id);
        toast.success('Link copied to clipboard!', {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
            iconTheme: {
                primary: '#4ade80',
                secondary: '#FFFAEE',
            },
        });
        setTimeout(() => {
            setCopiedId(null);
        }, 2000);
    };

    return (
        <div className='min-h-screen bg-[#050505] text-white'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {/* navber */}
            <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4 ">

                        <button className='relative z-10 flex items-center justify-center text-sm text-zinc-400 
        hover:text-white transition-all duration-300 border border-zinc-700 
        hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] 
        rounded-lg w-10 h-9 active:scale-95' onClick={() => navigate("/")}>
                            <ArrowLeft size={16} />
                        </button>
                        <h1 className='text-lg font-semibold'>Dashboard</h1>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition" onClick={() => navigate("/genrate")}>
                        + New Website
                    </button>
                </div>
            </div>

            {/* hero */}
            <div className='max-w-7xl mx-auto px-6 py-10 '>
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10">
                    <p className="text-sm text-zinc-400 mb-1">Welcome Back</p>
                    <h1 className='text-3xl font-bold'>{userData.user.name}</h1>
                </motion.div>

                {loading && (
                    <div className='mt-24 text-center text-zinc-400'>Loading your Websites..</div>
                )}

                {error && !loading && (
                    <div className='bg-red-500/10 text-red-500 px-4 py-3 rounded-lg'>
                        {error}
                    </div>
                )}

                {websites?.length === 0 && (
                    <div className='mt-24 text-center text-zinc-400'>You haven't created any websites yet.</div>
                )}

                {!loading && !error && websites?.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {websites?.map((website, index) => {
                            const copied = copiedId === website?._id;

                            return <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -6 }}
                                onClick={() => navigate(`/editor/${website._id}`)}
                                className="rounded-2xl bg-white/5 border border-white/10
                                overflow-hidden hover:bg-white/10 transition flex flex-col "
                            >
                                <div className="relative h-40 bg-black cursor-pointer">
                                    <iframe srcDoc={website?.latestCode} className='absolute inset-0 w-[140%] h-[140%] scale-[0.72]
        origin-top-left pointer-events-none bg-white'></iframe>
                                    <div className='absolute inset-0 bg-black/30' />


                                </div>
                                <div className="p-5 flex flex-col gap-4 flex-1">
                                    <h3 className='text-base font-semibold line-clamp-2'>{website?.title}</h3>
                                    <p>Last Updated {""}:- {new Date(website?.updatedAt).toLocaleDateString()}</p>

                                    {!website?.deployed ? (
                                        <button className='mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500
                hover:scale-105 transition '
                                            onClick={() => handleDeploy(website._id)}
                                        >
                                            <Rocket size={16} /> Deploy</button>) : (
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={(e) => handleCopy(e, website)}
                                            className={`mt-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
    transition-all cursor-pointer
    ${copied ? "bg-green-500 text-white" : "bg-white/10 text-white hover:bg-white/20"}`}

                                        >
                                            {copied ? (
                                                <>
                                                    <Check /> Link Copied
                                                </>
                                            ) : <>
                                                <Share2 size={16} /> Share
                                            </>}

                                        </motion.button>
                                    )}
                                </div>



                            </motion.div>
                        })}
                    </div>
                )}
            </div>

        </div>
    )
}
export default Dashboard;
