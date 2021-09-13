import { useState, useEffect } from 'react'
import axios from 'axios'

interface CloudProvidersData {
    clouds: any
}

export const GetCloudServiceProviders = (): CloudProvidersData => {
    const [providers, setProviders] = useState({ clouds: [] });

    useEffect(() => {
        axios.get('https://api.aiven.io/v1/clouds').then(response => {
            setProviders(response.data)
            console.log('Got: ', response)
        }).catch(error => {
            console.log('Err: ', error)
        })
    }, [])

    return providers
}


