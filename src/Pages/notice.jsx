import { useEffect, useRef, useState } from "react"
import { URL } from "../config"
import { NoticeCard } from "../components/noticecard"

export const Notice = ()=>{
    const ref = useRef()

    const [data,setData] = useState([])

    const fetchAllNotice = ()=>{
        return fetch(`${URL}/all`).then((r)=>r.json())
        .then((r)=>{
            console.log(r)
            return r
        })
    }

    const handleSubmit = ()=>{
        console.log(ref.current.value)

        const token = localStorage.getItem("token") || ""

        if(ref.current.value.length>100 && token){
            const body = JSON.stringify({
                notice:ref.current.value
            })
            fetch(`${URL}/post`,{
                method:"POST",
                body:body,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }

            }).then((r)=>r.json())
            .then((r)=>{
                console.log(r)
                fetchAllNotice().then((r)=>setData(r))
            }).catch((err)=>{
                alert("not authorize")
            })
        }
        else {
            alert("Type atleast 100 character")
        }
    }

    useEffect(()=>{
        fetchAllNotice().then((r)=>setData(r))
    },[])
    return <div>
        <h2>Notice Board</h2>
        <div className="noticearea">
            <p>Submit a Notice:</p>
            <div>
                <textarea ref={ref} name="" id="" cols="30" rows="3"></textarea>
            </div>
            <button onClick={handleSubmit} className="post">Post</button>
        </div>

        <div className="all">
            {data?.map((ele)=><NoticeCard key={ele._id} ele={ele}></NoticeCard>)}
        </div>
    </div>
}