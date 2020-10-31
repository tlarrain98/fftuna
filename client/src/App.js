import React, { useState, useEffect } from 'react'
import ContentHandler from './components/ContentHandler.js'
import { UserContextProvider } from './UserContext'

function App() {
  
  return (
    <UserContextProvider>
      <div className="App">
        <ContentHandler />
      </div>
    </UserContextProvider>
  )
}

export default App;
