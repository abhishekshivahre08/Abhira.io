import React, { use, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import { serverUrl } from "../../App";
import { Monitor, Rocket, Send, X ,MessageSquare} from 'lucide-react';
import { Code2 } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import Editor from '@monaco-editor/react';
import { motion } from 'framer-motion';




function Editors() {
    const { id } = useParams();
    const [website, setWebsite] = useState(null);
    const [error, setError] = useState(null);
    const [code, setcode] = useState("");
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const iframeRef = useRef(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [thinkingIndex, setThinkingIndex] = useState(0);
    const [showCode, setShowCode] = useState(false);
    const [showcodePreview, setShowcodePreview] = useState(false);
    const [showChat, setShowChat] = useState(false);

    const thinkingStep = [
        "Understanding Your request...",
        "Planning layout changes...",
        "improving resposiveness...",
        "Optimizing performance...",
        "applying animations...",
        "finalizing updates..."
    ]


    const handleUpdate = async () => {
        if (!prompt) return;
        setUpdateLoading(true);
        const text = prompt
        setPrompt("");
        setMessages((m) => [...m, {
            role: "user",
            content: prompt
        }])
        try {
            const result = await axios.post(`${serverUrl}/api/website/update/${id}`, { prompt: text }, { withCredentials: true });
            console.log(result);
            setUpdateLoading(false);
            setMessages((m) => [...m, {
                role: "ai",
                content: result.data.message,
            }])
            setcode(result.data.code);
        } catch (error) {
            console.log(error);
            setUpdateLoading(false);

        }
    }

       const handleDeploy = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/website/deploy/${website._id}`, { withCredentials: true });
            console.log(result);
            window.open(`${result.data.url}`, "_blank");
          
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!updateLoading) return;
        const i = setInterval(() => {
            setThinkingIndex((i) => (i + 1) % thinkingStep.length);
        }, 1200)
        return () => clearInterval(i);
    }, [updateLoading])






    useEffect(() => {
        const handleGetWebsiteById = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`, { withCredentials: true });
                console.log(result);
                setWebsite(result.data);
                setcode(result.data.latestCode);
                setMessages(result.data.conversation);
            } catch (error) {
                console.log(error)
                setError("Failed to load website data. Please try again later.", error.response.data.message);
            }
        }
        handleGetWebsiteById();
    }, [id])

    useEffect(() => {
        if (!iframeRef.current || !code) return;
        const blob = new Blob([code], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        iframeRef.current.src = url;
        return () => {
            URL.revokeObjectURL(url);
        }
    }, [code])

    if (error) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-red-400'>
                {error}
            </div>
        );
    }

    if (!website) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-white'>
                Loading...
            </div>
        );
    }


    return (
        <div className='h-screen w-screen flex bg-black text-white overflow-hidden'>
            <aside className='hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80'>
                <Header />
                <>
                    <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`max-w-[85%] ${message.role === "user" ? "ml-auto" : "mr-auto"}`}>
                                <div className={`max-w-xs px-4 py-2 rounded-2xl ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-800 text-white"}`}>
                                    {message.content}
                                </div>
                            </div>
                        ))}

                        {updateLoading && (
                            <div className='max-w-[85%] mr-auto'>
                                <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10
                text-zinc-400 italic ">
                                    {thinkingStep[thinkingIndex]}
                                </div>

                            </div>
                        )}
                    </div>
                    <div className="p-3 border-t border-white/10 ">
                        <div className="flex gap-2">
                            <input name="message" row="1" id="" placeholder="Describe Changes..."
                                className='flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-outline-none'
                                onChange={(e) => setPrompt(e.target.value)} />
                            <button className='px-4 py-3 rounded-2xl bg-white text-black'
                                disabled={updateLoading} onClick={handleUpdate}
                            ><Send size={14} /></button>
                        </div>
                    </div>
                </>
            </aside>

            {/* webiste preview */}
            <div className='flex-1 flex flex-col'>
                <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
                    <span className='text-xs text-zinc-400'>Live Preview</span>
                    {/* <button className='text-xs text-blue-500 hover:underline' onClick={() => window.open(`/preview/${website._id}`, "_blank")}>Open in new tab</button> */}
                    <div className='flex gap-2'>
                      {website.deployedUrl ? "" : <button className='flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500
                     to-purple-500 text-sm font-semibold hover:scale-105 transition' onClick={() => handleDeploy()}>
                            <Rocket size={14} />Deploy</button>}
                     <button className='p-2 hover:bg-gray-700 rounded-lg lg:hidden'
                     onClick={()=>setShowChat(true)}><MessageSquare size={18} /></button>
                
                        <button className='p-2 hover:bg-gray-700 rounded-lg' onClick={() => setShowCode(true)}><Code2 size={18} /></button>
                        <button className='p-2 hover:bg-gray-700 rounded-lg' onClick={() => setShowcodePreview(true)}><Monitor size={18} /></button>
                    </div>
                </div>
                <iframe ref={iframeRef} className='flex-1 w-full border-0 bg-white' sandbox='allow-scripts allow-same-origin allow-forms' />
            </div>

        {/* showing chat on mobile */}
        <AnimatePresence>
            {showChat && (
                <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="fixed inset-0  w-full  z-[9999] bg-[#1e1e1e] flex flex-col"
                >
                    <Header onclose={()=>setShowChat(false)}/>
                       <>
                    <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`max-w-[85%] ${message.role === "user" ? "ml-auto" : "mr-auto"}`}>
                                <div className={`max-w-xs px-4 py-2 rounded-2xl ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-800 text-white"}`}>
                                    {message.content}
                                </div>
                            </div>
                        ))}

                        {updateLoading && (
                            <div className='max-w-[85%] mr-auto'>
                                <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10
                text-zinc-400 italic ">
                                    {thinkingStep[thinkingIndex]}
                                </div>

                            </div>
                        )}
                    </div>
                    <div className="p-3 border-t border-white/10 ">
                        <div className="flex gap-2">
                            <input name="message" row="1" id="" placeholder="Describe Changes..."
                                className='flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border border-white/10 text-outline-none'
                                onChange={(e) => setPrompt(e.target.value)} />
                            <button className='px-4 py-3 rounded-2xl bg-white text-black'
                                disabled={updateLoading} onClick={handleUpdate}
                            ><Send size={14} /></button>
                        </div>
                    </div>
                </>

                </motion.div>
            )}
        </AnimatePresence>
                    
{/* showing code editor sidebar */}
            <AnimatePresence>
                {showCode && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#1e1e1e] flex flex-col"
                    >
                        <div className='h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]'>
                            <span className='text-sm font-medium'>index.html</span>
                            <button onClick={() => setShowCode(false)}> <X size={18} /></button>
                        </div>
                        <Editor
                            theme='vs-dark'
                            value={code}
                            height="90vh"
                            language='html'
                            defaultValue="// some comment"
                            onChange={(v) => setcode(v)}

                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* for showing website full preview */}
            <AnimatePresence>
                {showcodePreview && (
                    <motion.div

                        className='fixed inset-0 z-[9999] bg-black'
                    >
                        <iframe className='w-full h-full bg-white' srcDoc={code} sandbox='allow-scripts allow-same-origin allow-forms'/>
                        <button className='absolute top-4 right-4 p-2 bg-black rounded-lg' onClick={() => setShowcodePreview(false)}><X /></button>


                    </motion.div>

                )}
            </AnimatePresence>

        </div >

    );

    function Header({onclose}) {
        return (
            <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
                <span className='font-semibold truncate'>{website.title}</span>
                {onclose && (
                    <button className='lg:hidden p-2 hover:bg-gray-700 rounded-lg ' onClick={onclose} >
                        <X  />
                    </button>
                )}
            </div>
        );
    }


}







export default Editors;