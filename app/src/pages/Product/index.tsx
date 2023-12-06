import React, { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'
import Product from '../../types/Product'
import { useQuery } from '@apollo/client'
import GET_PRODUCTS_QUERY from '../../api/queryProduct'

import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom'
import api from '../../api/api'

const ProductPage: React.FC = () => {
    const navigate: NavigateFunction = useNavigate()
    const [firstTimeRender,setFirstTimeRender] = useState(true)
    const [accessTo, setAccessTo] = useState<string | null>(sessionStorage.getItem('JudoAT'))
    const { loading, error, data, refetch } = useQuery(GET_PRODUCTS_QUERY, {
        context: {
            headers: {
                Authorization: `Bearer ${accessTo}`,
            },
        },
    })
    useEffect(() => {
       if(firstTimeRender){
        // check if first time, graphql already requested, will not repeat request
        setFirstTimeRender(false)
        return
       }
        if (accessTo) {
            refetch()
        }
    }, [accessTo, refetch])

    const logOut = () => {
        sessionStorage.removeItem('JudoAT')
        sessionStorage.removeItem('JudoRT')
        navigate('/login')
    }

    if (loading) {
        return <div>loading....</div>
    }
    if (error) {
        // refresh token
        
        const accessToken = sessionStorage.getItem('JudoAT')
        const refreshToken = sessionStorage.getItem('JudoRT')
        if (!accessToken || !refreshToken) {
            return <Navigate to="/login" />
        }
        api.post('/refresh', { accessToken, refreshToken })
            .then(res => {
                const { accessToken, refreshToken } = res.data
                if (accessToken && refreshToken) {
                    setAccessTo(accessToken)

                    sessionStorage.setItem('JudoAT', accessToken)
                    sessionStorage.setItem('JudoRT', refreshToken)
                }
            })
            .catch(() => {
                navigate('/login')
            })
    }

    return (
        <div>
            <button style={{ marginLeft: 20 }} onClick={logOut}>
                Log out
            </button>
            <div
                style={{
                    maxWidth: '1000px',
                    display: 'flex',
                    height: '800px',
                    flexWrap: 'wrap',
                    padding: 10,
                    alignContent: 'flex-start',
                    cursor: 'pointer',
                }}
            >
                {data
                    ? data.products.map((product: Product) => {
                          return <ProductCard {...product} key={product.id} />
                      })
                    : ''}
            </div>
        </div>
    )
}

export default ProductPage
