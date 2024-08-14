/* eslint-disable */
import ReactDOM from 'react-dom';
import React, { useEffect, useState, useRef, memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
/* import { MyMarkerWithPopup } from 'components/MyMarkerWithPopup';
import { MyMarkerOrder } from 'components/MyMarkerOrder';
import { MarksOnMap } from 'components/MarksOnMap'; */
import './YandexMap.css';
import * as ymaps3 from 'ymaps3';
//api
import { getCordinate } from '../../Api/ApiYandex';


window.map = null;
let map = null;

export const YandexMap = memo(({ city }) => {

  const [myMaps, setMyMaps] = useState(null);
  const [ready, setReady] = useState(false);
  const [coordinate, setCoordinate] = useState([37.62, 55.75]);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    city !== '' && getCordinate(city)
      .then(res => {
        const data = res.data.response.GeoObjectCollection.featureMember[0].GeoObject;
        setLocationName(data.name)
        const coordinate = data.Point.pos.split(' ')
        setCoordinate(coordinate)
        console.log(coordinate)
      })
      .catch(err => console.log(err))
  }, [city])

  useEffect(() => {
    // document.cookie = 'cookieName=cookieValue; SameSite=None; Secure';
    (async function main() {
      const [ymaps3React] = await Promise.all([
        ymaps3.import('@yandex/ymaps3-reactify'),
        ymaps3.ready
      ]);

      const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
      const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapControls,
        YMapMarker,
        YMapFeatureDataSource,
        YMapLayer
      } = reactify.module(ymaps3);

      const { YMapZoomControl } = reactify.module(
        await ymaps3.import('@yandex/ymaps3-controls@0.0.1')
      );

      const { YMapDefaultMarker } = reactify.module(
        await ymaps3.import('@yandex/ymaps3-markers@0.0.1')
      );

      const myMapModule = await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1');
      const { YMapClusterer, clusterByGrid } = reactify.module(await myMapModule);

      setMyMaps({
        YMap,
        YMapDefaultSchemeLayer,
        YMapControls,
        YMapZoomControl,
        YMapDefaultMarker,
        YMapMarker,
        YMapDefaultFeaturesLayer,
        YMapFeatureDataSource,
        YMapLayer,

        YMapClusterer,
        clusterByGrid
      });

      setReady(true);
    })();

    return () => {
      map = null;
    };
  }, []);

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls,
    YMapZoomControl,
    YMapMarker,
    YMapDefaultMarker,
    YMapDefaultFeaturesLayer,
    YMapFeatureDataSource,
    YMapLayer,

    YMapClusterer
  } = myMaps || {};

  const gridSizedMethod = useMemo(() => myMaps?.clusterByGrid({ gridSize: 8 }), [myMaps]);


  return (
    <div className='map-container'>
      {ready && (
        <>
          {
            YMap &&
            YMapDefaultSchemeLayer &&
            YMapControls &&
            YMapZoomControl &&
            gridSizedMethod &&
            myMaps?.clusterByGrid &&
            YMapClusterer && (
              <YMap
                location={{ center: coordinate, zoom: 7 }}
                ref={(x) => (map = x)}>
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <YMapFeatureDataSource id='my-source' />
                <YMapLayer source='my-source' type='markers' zIndex={1800} />

                <YMapDefaultMarker coordinates={coordinate} zIndex={1} title={locationName}>

                </YMapDefaultMarker>



                <YMapControls position='right'>
                  <YMapZoomControl />
                </YMapControls>
              </YMap>
            )}
        </>
      )}
    </div>
  );
});
