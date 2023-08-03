import React, { useEffect } from 'react'


const Data = (props) => {
  const {datas,accessToken} = props;

  async function searchFirst() {
    var artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };
  
    try {
      // Search for the artist and get the artist ID
      var artistResponse = await fetch('https://api.spotify.com/v1/search?q=' + datas.firstName + '&type=artist', artistParameters);
      var artistData = await artistResponse.json();
      var artistID = artistData.artists.items[0].id;
  
      console.log("Artist ID is " + artistID);
  
      // Get the artist's top tracks
      var topTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=US`, artistParameters);
      var topTracksData = await topTracksResponse.json();
      var topTracks = topTracksData.tracks;

      const trackData = topTracks.map((track) => {
        const artistID = track.artists[0].id;
        const artistName = track.artists[0].name;
        const previewURL = track.preview_url;
  
        // Create an object with the required data for each track
        return {
          artistID,
          artistName,
          previewURL,
        };
      });
  
      console.log("Track Data:", trackData);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  }

  async function searchSecond() {
    var artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    };
  
    try {
      // Search for the artist and get the artist ID
      var artistResponse = await fetch('https://api.spotify.com/v1/search?q=' + datas.lastName + '&type=artist', artistParameters);
      var artistData = await artistResponse.json();
      var artistID = artistData.artists.items[0].id;
  
      console.log("Artist ID is " + artistID);
  
      // Get the artist's top tracks
      var topTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?country=US`, artistParameters);
      var topTracksData = await topTracksResponse.json();
      var topTracks = topTracksData.tracks;
      const trackData = topTracks.map((track) => {
        const artistID = track.artists[0].id;
        const artistName = track.artists[0].name;
        const previewURL = track.preview_url;
  
        // Create an object with the required data for each track
        return {
          artistID,
          artistName,
          previewURL,
        };
      });
  
      console.log("Track Data:", trackData);
  
    } catch (error) {
      console.error("Error fetching artist data:", error);
    }
  }

  searchFirst()
  searchSecond()

  return (
    <div>{accessToken}</div>
  )
}

export default Data