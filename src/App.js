import { Grid } from "@material-ui/core"
import youtube from "./api/youtube";
import SearchBar from './components/SearchBar';
import { useState } from 'react';
import VideoDetail from './components/VideoDetail';
import VideoList from "./components/VideoList"

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideos] = useState({ id: {}, snippet: {} });

  return (
    <div className="App">
      <Grid style={{ justifyContent: "center" }} container spacing={10}>
        <Grid item xs={11}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onSubmit={handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={setSelectedVideos} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );

  async function handleSubmit(searchTerm) {
    const { data: { items: videos } } = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: "AIzaSyBeyHJOZG4XOgja511NDEdCwZhtyiS57G0",
        q: searchTerm,
      }
    });
    setVideos(videos);
    setSelectedVideos(videos[0]);
  }
}

export default App;
