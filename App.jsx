/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import VideoPlayer from './src/VideoPlayer';

const ResoutionButton = onPress => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: resolution === 1080 ? 'grey' : 'black',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
      }}
      onPress={onPress}>
      <Text>1080</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [resolution, setResolution] = useState(480);

  const availableResoltion = [288, 360, 480, 720, 1080];

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <VideoPlayer resolution={resolution} />
      <View
        style={{
          gap: 4,
          marginTop: 8,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {availableResoltion.map(res => (
          <TouchableOpacity
            key={res}
            style={{
              backgroundColor: resolution === res ? 'grey' : 'black',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
            }}
            onPress={() => setResolution(res)}>
            <Text>{res}p</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default App;
