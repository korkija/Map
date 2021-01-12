import MapView, {Callout} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import React from 'react';

export const ItemMapView = ({map}) => {
  return (
    <MapView.Marker
      key={map.longitude + map.latitude}
      coordinate={{
        longitude: Number(map.longitude),
        latitude: Number(map.latitude),
      }}>
      <View style={styles.containerSelect}>
        <View style={styles.bubbleSelect} />
      </View>
      <Callout tooltip />
    </MapView.Marker>
  );
};

const styles = StyleSheet.create({
  containerSelect: {
    backgroundColor: 'rgba(255,183,61,0.3)',
    padding: 7,
    borderRadius: 20,
  },
  bubbleSelect: {
    flex: 0,
    backgroundColor: 'rgba(255,183,61,1)',
    padding: 7,
    borderRadius: 14,
  },
});
