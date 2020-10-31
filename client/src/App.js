import React, { useState } from 'react'
import ContentHandler from './components/ContentHandler.js'
import { UserContext } from './UserContext.js';

function App() {

  const [userProfile, setUserProfile] = useState(null)
  
  return (
    <UserContext.Provider value={{userProfile, setUserProfile}}>
      <ContentHandler />
    </UserContext.Provider>
  )
}

export default App;
