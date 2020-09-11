import React, {
  useCallback,
  useState,
  useEffect
} from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer
} from '@react-google-maps/api'

const containerStyle = {
  width: '100vw',
  height: '100vh'
}

const center = {
  lat: 0,
  lng: -180
}

const positions = []
const { REACT_APP_API_KEY } = process.env

function Map () {
  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback (map) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback (_map) {
    setMap(null)
  }, [])

  const onLoadMarker = (marker) => {
  }

  const getRandomInRange = (from, to, fixed) => ((Math.random() * (to - from) + from).toFixed(fixed) * 1)

  useEffect(() => {
    for (let index = 0; index < 40; index++) {
      positions.push({ lat: getRandomInRange(-85, 85, 3), lng: getRandomInRange(-180, 180, 3) })
    }
  }, [])

  const options = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    enableRetinaIcons: true
  }

  return (
    <LoadScript
      googleMapsApiKey={REACT_APP_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}
        onLoad={onLoad}
        onZoomChanged={() => console.log(map && map.getZoom())}
        onUnmount={onUnmount}
      >
        <MarkerClusterer options={options}>
          {(clusterer) =>
            positions.map(({ lat, lng }, index) => (
              <Marker
                key={index}
                onLoad={onLoadMarker}
                clusterer={clusterer}
                position={{ lat, lng }}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)
