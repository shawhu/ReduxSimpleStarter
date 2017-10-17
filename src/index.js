import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyD_I2tlvxR-l9vt_749ooQMHgUhgPeSEck';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('iphone x');
    }

    videoSearch(keyword){
        YTSearch({ key: API_KEY, term: keyword }, (videos) => this.setState({ 
            videos:videos,
            selectedVideo:videos[0] 
        }));
    }

    render() {
        const videosearch = _.debounce((term)=>this.videoSearch(term),300);


        return (
            <div>
                <SearchBar onTermChange={videosearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                 onVideoSelect = {selectedVideo=>this.setState({selectedVideo})}
                 videos={this.state.videos} 
                />
            </div>
        );
    }

}

ReactDOM.render(<App />, document.querySelector('.container'));