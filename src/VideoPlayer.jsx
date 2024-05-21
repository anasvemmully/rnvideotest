import React, {useState, forwardRef, useEffect} from 'react';
import {Dimensions} from 'react-native';
import Video, {DRMType} from 'react-native-video';
// import {useVideo} from './hooks';

const VideoPlayer = forwardRef(
  (
    {
      videoWidth,
      videoHeight,
      autoplay,
      resizeMode,
      assetId,
      resolution, // state for changing resolution

      // propTypes Defintion
      defaultMuted,
    },
    ref,
  ) => {
    const [_windowSize, _setWindowSize] = useState(() => {
      const width = Dimensions.get('window').width;
      const ratio = videoHeight / videoWidth;
      const finalHeight = width * ratio;
      return {height: finalHeight, width};
    });
    const [rate, setRate] = useState(1.0);
    const [isMuted, setIsMuted] = useState(defaultMuted);
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [error, setError] = useState(false);
    const [_isBuffering, setIsBuffering] = useState(false);

    useEffect(() => {
      console.log('rendering video player... resolution >>> ', resolution);
    });

    return (
      <Video
        progressUpdateInterval={1000}
        ignoreSilentSwitch={'ignore'}
        maxBitRate={10000}
        style={_windowSize}
        resizeMode={resizeMode}
        volume={1}
        source={{
          // uri: 'https://video.gumlet.io/5f462c1561cf8a766464ffc4/61ee745525fc01c00e08a2ec/1.m3u8',
          // uri: 'https://d384padtbeqfgy.cloudfront.net/transcoded/8eaHZjXt6km/video.mpd',
          uri: 'https://media.axprod.net/TestVectors/v7-MultiDRM-SingleKey/Manifest_1080p.mpd',
        }}
        controls={true}
        drm={{
          type: DRMType.WIDEVINE,
          // licenseServer:
          //   'https://app.tpstreams.com/api/v1/6eafqn/assets/8eaHZjXt6km/drm_license/?access_token=16b608ba-9979-45a0-94fb-b27c1a86b3c1',
          // headers: {
          //   'Content-Type': 'application/octet-stream',
          // },
          licenseServer:
            'https://drm-widevine-licensing.axtest.net/AcquireLicense',
          headers: {
            'X-AxDRM-Message':
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImZpcnN0X3BsYXlfZXhwaXJhdGlvbiI6NjAsInBsYXlyZWFkeSI6eyJyZWFsX3RpbWVfZXhwaXJhdGlvbiI6dHJ1ZX0sImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.FAbIiPxX8BHi9RwfzD7Yn-wugU19ghrkBFKsaCPrZmU',
          },
        }}
        /*
         * Enable this property and try to give
         * the selectedVideoTrack prop value
         */
        selectedVideoTrack={{
          type: 'resolution',
          value: resolution,
        }}
        onLoadStart={e => {
          console.log('Loading... >>> ', e);
        }}
        onVideoTracks={videoTracks => {
          /*
           * See the videoTracks object these are
           * the avalable resolution of the video
           */
          console.log('videoTracks >>> ', videoTracks);
        }}
        muted={isMuted}
        // paused={false} // play the video
        onBuffer={({isBuffering}) => {
          console.log('isBuffering >>> ', isBuffering);
        }}
        onLoad={() => {
          console.log('.... loaded');
        }}
        onError={e => {
          console.log('Error >>> ', e);
        }}
      />
    );
  },
);

VideoPlayer.defaultProps = {
  showSeekBar: true,
  saveTimeLine: true,
  videoWidth: 1280,
  videoHeight: 720,
  autoplay: false,
  controlTimeoutDelay: 2000,
  loop: false,
  resizeMode: 'cover',
  disableSeek: false,
  customStyles: {},
};

export default VideoPlayer;
