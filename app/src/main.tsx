import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql',
    cache: new InMemoryCache(),
})
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>
)
