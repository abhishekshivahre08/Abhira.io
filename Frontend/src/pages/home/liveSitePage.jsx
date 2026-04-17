import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { serverUrl } from '../../App';




function LiveSitePage() {
const {id} = useParams();
const [html, sethtml] = useState("")
const [error, setError] = useState("");

    useEffect(() => {
        const handleGetWebsiteById = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-slug/${id}`, { withCredentials: true });
          // 1. Console mein check karein ki 'latest' kahan hai
            console.log("Full Response:", result.data);
                sethtml(result.data.latestCode);
               
            } catch (error) {
                console.log(error)
             setError(error.response.data.message || "something went wrong");
            }
        }
        handleGetWebsiteById();
    }, [id])

   if(error) {
    return (
        <div className='h-screen flex items-center justify-center bg-[#050505] text-white'>
            <h1 className='text-lg font-semibold'>{error}</h1>
        </div>
    )
   }

    return ( 
       
<iframe title='Live site' srcDoc={html} className='w-full h-screen border-none'
sandbox='allow-scripts allow-same-origin allow-forms'
 />
       
     );
}

export default LiveSitePage;