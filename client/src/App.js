import React, { useState, useEffect } from 'react'
import ContentHandler from './components/ContentHandler.js'
import { UserContextProvider } from './UserContext'

function App() {
  
  return (
    <UserContextProvider>
        <ContentHandler />
    </UserContextProvider>
  )
}

export default App;
