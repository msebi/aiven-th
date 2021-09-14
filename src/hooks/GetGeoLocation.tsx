import { useState, useEffect } from 'react'

interface GeoLocationData {
    isGeoLocationDataSet: boolean
    lat: string
    lon: string
    errorCode: number,
    errorMsg: string
}

export const GetGeoLocation = (): GeoLocationData => {
    const [geoLocationData, setGeolocationData] = useState<GeoLocationData>({
        isGeoLocationDataSet: false,
        lat: '',
        lon: '',
        errorCode: 0,
        errorMsg: ''
    });

    const onSuccess = (location: { coords: { latitude: any; longitude: any; }; }) => {
        setGeolocationData({
            isGeoLocationDataSet: true,
            lat: location.coords.latitude,
            lon: location.coords.longitude,
            errorCode: 0,
            errorMsg: ''
        })
    }

    const onError = (error: { isGeoLocationDataSet?: boolean; lat?: string; lon?: string; code?: number; message?: string; coords?: any; }) => {
        setGeolocationData({
            isGeoLocationDataSet: true,
            lat: error.coords.latitude,
            lon: error.coords.longitude,
            errorCode: 0,
            errorMsg: ''
        })
    }

    useEffect(() => {
        // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
        if (!('geolocation' in navigator)) {
            onError({
                isGeoLocationDataSet: true,
                coords: {
                    lat: '',
                    lon: '',
                },
                code: 1,
                message: 'Geolocation not enabled. Cloud service providers might not be close to your location'
            })
        } else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError)
        }

    }, [])

    return geoLocationData
}

