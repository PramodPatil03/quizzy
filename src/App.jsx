import React, { useEffect, useState } from 'react'
import Problems from './components/Problems'
import Alert from './components/Alert';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('isLoggedIn'))
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState(window.localStorage.getItem('userArray') || [])
  const [passwords, setPasswords] = useState(window.localStorage.getItem('passArray') || [])


  window.onbeforeunload = (event) => {
    const e = event || window.event
    e.preventDefault();
    if (e) {
      e.returnValue = '';
    }
    return ''; 
  };
  

useEffect(()=>{
  
  if(isLoggedIn){
        document.getElementById('logout-btn').style.display = 'block'
  }
})
const logout =()=>{
  setIsLoggedIn(false);
  window.localStorage.removeItem('isLoggedIn')
  setMessage("Logged out Successfully.")
  document.getElementById('alert-container').style.display = 'flex'
  document.getElementById('logout-btn').style.display = 'none'

}

const closeAlert = ()=>{
  document.getElementById("alert-container").style.display = 'none'
}
  const handleSubmit = (e) => {
    e.preventDefault()
    setUsername("")
    setPassword("")

    if(users.includes(username)){
      console.log("User Array"+users)
      console.log("Pass Array"+passwords)
        let u = users.indexOf(username);
        let storedUser = users.at(u)
        let storedPass = passwords.at(u);
        console.log("Stored: "+storedUser+" & "+storedPass )
        console.log("Input: "+username+" & "+password )
        if(username === storedUser && password === storedPass){
          window.localStorage.setItem('isLoggedIn', true)
          setTimeout(() => {
            document.getElementById('logout-btn').style.display = 'block'
            setIsLoggedIn(true)
            setMessage("Logged In successfully.")
            document.getElementById('alert-container').style.display = 'flex'
          }, 1000);
        }else{
          setMessage("Invalid credentials.")
          document.getElementById('alert-container').style.display = 'flex'
        }
    }else{
      setUsers(prev =>[...prev, username])
      setPasswords(prev =>[...prev, password])
      console.log("User Array"+users)
      console.log("Pass Array"+passwords)
      window.localStorage.setItem("userArray", users)
      window.localStorage.setItem("passArray", passwords)
      window.localStorage.setItem('isLoggedIn', true)
      setMessage("Registered Successfully.")
      document.getElementById('alert-container').style.display = 'flex'
      setIsLoggedIn(true)
    }
  }

  return (
    <div>
      <Alert message={message} closeAlert = {closeAlert} />
      {
        isLoggedIn ? <><Problems /></>
          :
          <div className="container">
            <h1>Login / Sign Up </h1>
            <form onSubmit={handleSubmit}>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required/>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required/>
              <button className='btn' type="submit">Login</button>
            </form>
            <p className="hint">Username = 'admin' password='admin'</p>
          </div>


      }
      <button className='btn' id='logout-btn' onClick={logout}>Logout</button>
    </div>
  )
}

export default App
