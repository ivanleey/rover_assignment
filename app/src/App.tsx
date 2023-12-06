import './App.css'
import {  useRoutes } from 'react-router-dom'
import routeConfig from './router/routerConfig'


function App() {
    
    const elements = useRoutes(routeConfig)
    return (
        <>
          {elements}
        </>
    )
}

export default App
