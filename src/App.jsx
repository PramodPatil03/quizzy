import React, { useEffect, useState } from 'react'
import Problems from './components/Problems'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('isLoggedIn'))
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


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
  document.getElementById('logout-btn').style.display = 'none'

}


  const handleSubmit = (e) => {
    console.log(username)
    console.log(password)
    e.preventDefault()
    setUsername("")
    setPassword("")

    if (username === "admin" && password === "admin") {
      window.localStorage.setItem('isLoggedIn', true)
      setTimeout(() => {
        document.getElementById('logout-btn').style.display = 'block'
        setIsLoggedIn(true)
        
      }, 1000);
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div>

      {
        isLoggedIn ? <><Problems /></>
          :
          <div className="container">
            <h1>Login </h1>
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
