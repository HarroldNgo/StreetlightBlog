import '../css/login.css'
import { useRef, useState, useEffect, useContext } from 'react';
import useAuth from '../useHooks/useAuth'
import axios from "../axios"
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const { setAuth } = useAuth()

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/api/auth",JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })

      setAuth({ user, pwd });
      setUser('')
      setPwd('')
      navigate("/admin")
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      }
      else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      }
      else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  }

  return (

    <div className="login-wrapper">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username:</p>
          <input type="text"
            id="username"
            style={{color: "#000"}}
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required />
        </label>
        <label>
          <p>Password:</p>
          <input type="password"
            id="password"
            style={{color: "#000"}}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required />
        </label>
        <div>
          <button style={{color: "#000"}} type="submit">Submit</button>
        </div>
      </form>
    </div>

  )
}
