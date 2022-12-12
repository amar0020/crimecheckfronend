import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { URL } from '../config'
export const User = ()=>{

    const ref = useRef()
    const navigate = useNavigate()

    const handleSubmit = ()=>{
  
      let RegEx = /^[a-z0-9]+$/i
      if(RegEx.test(ref.current.value)){
        const body = JSON.stringify({
          user:ref.current.value
        })
        fetch(`${URL}/user`,{
          method:"POST",
          body:body,
          headers:{
            'Content-Type': 'application/json'
          }
        }).then((r)=>{
          return r.json()
      })
        
        .then((r)=>{
          console.log(r)
          localStorage.setItem('token',r.token)
          navigate("/notice")
        })
      }
      else alert("Enter alphanumeric Character")
    }
    return (
    <div>
        <h1>Create a Username</h1>
        <div className='user'>
            <input ref={ref} type="text" />
        </div>
        <button onClick={handleSubmit} className='submituser'>Submit</button>
    </div>
    )
}