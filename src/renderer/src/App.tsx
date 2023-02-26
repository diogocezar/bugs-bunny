import { useEffect } from 'react'
import api from './services/rabbitmq'

useEffect(() => {
  const getConnections = async (): Promise<void> => {
    const data = await api.get('connections')
    console.log(data)
  }
  getConnections()
}, [])

function App(): JSX.Element {
  return (
    <div className="container">
      <h1>Bugs Bunny</h1>
    </div>
  )
}

export default App
