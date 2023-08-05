import React, { useEffect, useState } from 'react'
import Gallery from './Gallery';

const Data = (props) => {
    const { datas, accessToken } = props; 
    const [trackData, setTrackData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    
    useEffect(() => {
      const fetchData = async () => {
        const artistParameters = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
          },
        };
    
        try {
          // Fetch data for the first artist
          const artistResponse1 = await fetch(
            'https://api.spotify.com/v1/search?q=' + datas.firstName + '&type=artist',
            artistParameters
          );
          const artistData1 = await artistResponse1.json();
          const artistID1 = artistData1.artists.items[0].id;
    
          // Get the first artist's top tracks
          const topTracksResponse1 = await fetch(
            `https://api.spotify.com/v1/artists/${artistID1}/top-tracks?country=US`,
            artistParameters
          );
          const topTracksData1 = await topTracksResponse1.json();
          const topTracks1 = topTracksData1.tracks;
    
          // Fetch data for the second artist
          const artistResponse2 = await fetch(
            'https://api.spotify.com/v1/search?q=' + datas.lastName + '&type=artist',
            artistParameters
          );
          const artistData2 = await artistResponse2.json();
          const artistID2 = artistData2.artists.items[0].id;
    
          // Get the second artist's top tracks
          const topTracksResponse2 = await fetch(
            `https://api.spotify.com/v1/artists/${artistID2}/top-tracks?country=US`,
            artistParameters
          );
          const topTracksData2 = await topTracksResponse2.json();
          const topTracks2 = topTracksData2.tracks;
    
          // Combine top tracks from both artists into a single array
          const combinedTopTracks = [...topTracks1, ...topTracks2];
    
          // Fetch audio features for all tracks
          const trackDataWithAudioFeatures = await Promise.all(
            combinedTopTracks.map(async (track) => {
              // Fetch audio features for the track using its ID
              const audioFeaturesResponse = await fetch(
                `https://api.spotify.com/v1/audio-features/${track.id}`,
                artistParameters
              );
              const audioFeaturesData = await audioFeaturesResponse.json();
    
              // Extract required audio features
              const tempo = audioFeaturesData.tempo;
              const danceability = audioFeaturesData.danceability;
              const energy = audioFeaturesData.energy;
    
              // Create an object with the required data for each track
              return {
                name: track.name,
                artist: track.artists[0].name,
                url: track.external_urls.spotify,
                tempo,
                danceability,
                energy,
              };
            })
          );
    
          // Update state with the combined track data
          setTrackData(trackDataWithAudioFeatures);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching artist data:", error);
        }
      };
    
      // Call the fetchData function only once when the component mounts
      fetchData();
    }, [accessToken, datas]);
    


    if (isLoading) {
        return <h1 className='load'>Loading...</h1>;
      }

  return (
    <Gallery data={trackData} option={datas.option} sort={datas.sortOption}/>
  )
}

export default Data