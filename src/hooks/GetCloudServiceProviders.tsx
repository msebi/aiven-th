import { useState, useEffect } from 'react'
import axios from 'axios'

interface CloudProvidersData {
    clouds: any
}

interface GeoLocationData {
    isGeoLocationDataSet: boolean
    lat: string
    lon: string
    errorCode: number,
    errorMsg: string
}

export const GetCloudServiceProviders = (): CloudProvidersData => {
    const [providers, setProviders] = useState({ clouds: [] });

    useEffect(() => {

        const onSuccess = (location: { coords: { latitude: any; longitude: any; }; }) => {
            let geoLocationData: GeoLocationData
            geoLocationData = {
                isGeoLocationDataSet: true,
                lat: location.coords.latitude,
                lon: location.coords.longitude,
                errorCode: 0,
                errorMsg: ''
            }
            getCloudProvidersFromEndpoint(geoLocationData)
        }

        const onError = (error: { isGeoLocationDataSet?: boolean; lat?: string; lon?: string; code?: number; message?: string; coords?: any; }) => {
            // TODO: handle case where browser does not have geo location enabled 
        }

        const degreesToRadians = (angle: number): number => {
            return angle * (Math.PI / 180)
        }

        // https://en.wikipedia.org/wiki/Haversine_formula
        const computeDistanceBetweenPoints = (srcLat: number, srcLon: number, dstLat: number, dstLon: number) => {
            let earthRadius = 6370
            let radLat = degreesToRadians(dstLat - srcLat)
            let radLon = degreesToRadians(dstLon - srcLon)
            let hav = Math.sin(radLat / 2) * Math.sin(radLat / 2) +
                Math.cos(degreesToRadians(srcLat)) * Math.cos(degreesToRadians(dstLat)) *
                Math.sin(radLon / 2) * Math.sin(radLon / 2)
            let hav1 = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav))
            let distance = earthRadius * hav1

            return Math.floor(distance)
        }

        const getCloudProvidersFromEndpoint = (geoLocationData: GeoLocationData) => {
            axios.get('https://api.aiven.io/v1/clouds').then(response => {
                // Add index as id field
                let index = 0
                response.data.clouds.forEach(function (provider: { id: number; }) {
                    provider.id = index
                    index = index + 1
                })

                // Compute distance from user to providers; add to provider fields
                response.data.clouds.forEach(function (provider: { cloud_distance: string; geo_latitude: string; geo_longitude: string }) {
                    provider.cloud_distance = computeDistanceBetweenPoints(
                        Number(geoLocationData.lat),
                        Number(geoLocationData.lon),
                        Number(provider.geo_latitude),
                        Number(provider.geo_longitude)).toString()
                })

                setProviders(response.data)
                console.log('Got: ', response)
            }).catch(error => {
                console.log('Err: ', error)
            })
        }

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

    return providers
}


