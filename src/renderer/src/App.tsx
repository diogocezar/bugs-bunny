import { useEffect, useState } from 'react'
import api from './services/rabbitmq'

function App(): JSX.Element {
  const [connections, setConnections] = useState([])
  const [queues, setQueues] = useState([])
  const getConnections = async () => {
    const { data } = await api.get('connections')
    const connections = data.map((connection) => {
      const { name, user, user_providded_name: userProvidedName } = connection
      return { name, user, userProvidedName }
    })
    setConnections(connections)
  }
  const getQueues = async () => {
    const { data } = await api.get('queues')
    const queues = data.map((queue) => {
      const { messages, name } = queue
      return { messages, name }
    })
    setQueues(queues)
  }
  useEffect(() => {
    getConnections()
    getQueues()
  }, [])
  const { RENDERER_VITE_RABBITMQ_PORT, RENDERER_VITE_RABBITMQ_HOSTNAME } = import.meta.env
  return (
    <div className="container">
      <h1>Bugs Bunny</h1>
      <h2>Server</h2>
      <p>
        Host: <strong>{RENDERER_VITE_RABBITMQ_HOSTNAME}</strong>
      </p>
      <p>
        Port: <strong>{RENDERER_VITE_RABBITMQ_PORT}</strong>
      </p>
      <h2>Connections</h2>
      <ul>
        {connections.map((connection) => (
          <li key={connection.name}>
            <strong>{connection.name}</strong> - {connection.user} - {connection.userProvidedName}
          </li>
        ))}
      </ul>
      <h2>Queues</h2>
      <ul>
        {queues.map((queue) => (
          <li key={queue.name}>
            <strong>{queue.name}</strong>
            <strong>Mensagens</strong>: {queue.messages}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
