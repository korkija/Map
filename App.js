import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import {ItemMapView} from './src/components/ItemMapView';
import {urlGeocoder} from './src/constants/stringVariables';

const {height, width} = Dimensions.get('window');

const App: () => React$Node = () => {
  const [address, setAddress] = useState();
  const [testLocation, setTestLocation] = useState();

  const initialRegion = useRef({
    latitude: 40.73061,
    longitude: -73.935242,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (testLocation?.latitude) {
      getAddressFromCoordinates(testLocation);
    }
  }, [testLocation]);

  const getLocationByClick = ({nativeEvent}) => {
    const {
      coordinate: {latitude, longitude},
    } = nativeEvent;
    setTestLocation({
      latitude,
      longitude,
    });
  };

  const getAddressFromCoordinates = async ({latitude, longitude}) => {
    const url = `${urlGeocoder}${latitude},${longitude}`;
    const res = await fetch(url);
    const json = await res.json();
    const currentLocation = json?.Response?.View?.[0]?.Result?.[0];
    if (currentLocation) {
      setAddress(currentLocation.Location.Address.Label);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <MapView
          showsUserLocation={true}
          style={styles.mapView}
          onPress={(e) => getLocationByClick(e)}
          initialRegion={initialRegion.current}>
          {testLocation && <ItemMapView map={testLocation} />}
        </MapView>
      </SafeAreaView>
      {!!address && (
        <TouchableOpacity
          onPress={() => setAddress('')}
          style={styles.errorModal}>
          <Text style={{color: '#fff', fontSize: 16}}>{address}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  errorModal: {
    position: 'absolute',
    top: 50,
    left: width * 0.05,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderColor: '#000',
    width: '90%',
    borderRadius: 20,
    padding: 20,
  },
  mapView: {
    position: 'absolute',
    width: width,
    height: height,
    flex: 1,
    opacity: 1,
  },
});

export default App;
