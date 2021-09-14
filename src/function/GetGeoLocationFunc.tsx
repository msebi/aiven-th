export function HelloChandu() {

}

// interface GeoLocationData {
//     isGeoLocationDataSet: boolean
//     lat: string
//     lon: string
//     errorCode: number,
//     errorMsg: string
// }

// let geoLocationdata: GeoLocationData

export const GetGeoLocation = () => {
    if (navigator.geolocation) {
        // navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        return {
            isGeoLocationDataSet: true,
            lat: '',
            lon: '',
            errorCode: 1,
            errorMsg: 'Geolocation not enabled. Distance to Clould Providers might not be optimal.'
        }
    }
}

// function showPosition(position: { coords: { latitude: string; longitude: string; }; }) {
//     geoLocationdata.errorCode = 0
//     geoLocationdata.lat = position.coords.latitude
//     geoLocationdata.lon = position.coords.longitude
// }


