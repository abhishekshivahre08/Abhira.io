import React, { use, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import { serverUrl } from "../../App";
import { Monitor, Rocket, Send } from 'lucide-react';
import { Code2 } from 'lucide-react';



function Editor() {
    const { id } = useParams();
    const [website, setWebsite] = useState(null);
    const [error, setError] = useState(null);
    const [code, setcode] = useState("");
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState("");
    const iframeRef = useRef(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [thinkingIndex, setThinkingIndex] = useState(0);
    
    const thinkingStep = [
        "Understanding Your request...",
        "Planning layout changes...",
        "improving resposiveness...",
        "Optimizing performance...",
        "applying animations...",
        "finalizing updates..."
    ]


    const handleUpdate = async () => {
        setUpdateLoading(true);
        setMessages((m) => [...m, {
            role: "user",
            content: prompt
        }])
        try {
            const result = await axios.post(`${serverUrl}/api/website/update/${id}`, {prompt}, { withCredentials: true });
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
                     disabled={updateLoading}       onClick={handleUpdate}
                        ><Send size={14} /></button>
                    </div>
                </div>
            </>
        </aside>

            {/* webiste preview */ }
    <div className='flex-1 flex flex-col'>
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
            <span className='text-xs text-zinc-400'>Live Preview</span>
            {/* <button className='text-xs text-blue-500 hover:underline' onClick={() => window.open(`/preview/${website._id}`, "_blank")}>Open in new tab</button> */}
            <div className='flex gap-2'>
                <button className='flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500
                     to-purple-500 text-sm font-semibold hover:scale-105 transition'><Rocket size={14} />Deploy</button>
                <button className='p-2 hover:bg-gray-700 rounded-lg'><Code2 size={18} /></button>
                <button className='p-2 hover:bg-gray-700 rounded-lg'><Monitor size={18} /></button>
            </div>
        </div>
        <iframe ref={iframeRef} className='flex-1 w-full border-0 bg-white' />
    </div>

        </div >

    );

    function Header() {
        return (
            <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
                <span className='font-semibold truncate'>{website.title}</span>
            </div>
        );
    }


}







export default Editor;