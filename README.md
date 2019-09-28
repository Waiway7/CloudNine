# [Cloudnine](https://aa-cloudnine.herokuapp.com/#/)
Cloudnine is a soundcloud clone with a blue theme to it that can do similar features such as uploading, playing, and deleting tracks and playlists. The clone focuses more playbility of tracks and the design on the playlists.

# Key Features
* Users can sign up or use a demo account. Any tracks/playlists made will be linked with the account.
* Ability to upload, view, delete, play tracks on to the music player.
* Music player has functionality on pause/play and rewind/backword/forward. 
* Creating playlists for users to store their favorite music.

# Technology Used 
* Amazon Web Services to host music and images
* PostgresSql for database
* Ruby on Rails as a backened MVC
* React/Redux as the frontend to store and manipulate data
* Json Jbuilder to parse information from backend to frontend

# Music Player
The music's player core component is the capability to play audio while transversing through the website. Futhermore, Cloudnine's music player includes a backward and forward ability for user's to switch songs in their playlist or library. More features will be implemented such as a seek bar and volume bar. 
![](https://github.com/Waiway7/CloudNine/blob/master/app/assets/images/Screen%20Shot%202019-09-28%20at%201.01.40%20PM.png)

With React and Redux, storing the audio infomation in the redux store made it possible for continous play. By using the life cycle methods in React, I was able to load the information into the component's state and once a track has been selected to be played by the user, the music player will always be rendered out similarly to Soundcloud. 
A very challenging piece of the music player is the ability to capture the duration of the track and backward and forward capability. Many thoughts went into it, but the ideal solution I came up with is saving the playlist or library into a redux state. The selected music will be sent to another state with all of its info. With this, the current track is stored and there is a list of audios in order thus creating backward and forward feature. This wouldn't have been possible without a lifecycle method called componentDidUpdate. This lifecycle method does two major things which is setting the current duration of the track onto the state and sending the next or previous track to the music player. 
```
componentDidUpdate(prevProps){
        if (prevProps.info.id !== this.props.info.id || 
            (prevProps.info.id === this.props.info.id && 
            Object.keys(prevProps.library)[0] !== Object.keys(this.props.library)[0])){
            if (prevProps.track.src){
                prevProps.track.pause();
            }
            this.props.track.play()
            this.props.receivePlay()
            this.props.track.addEventListener("timeupdate", e => {
                this.setState({
                    currentTime: e.target.currentTime,
                    duration: e.target.duration,
                    fakeDura: e.target.duration
            }, () => {
                if (this.state.currentTime !== undefined && this.state.currentTime === this.state.duration) {
                    if (Object.keys(this.props.library)[0] !== "index"){
                        const playlist = this.props.playlists[Object.keys(this.props.library)[0]].track_ids
                        const idx = playlist.indexOf(this.props.info.id + 1)
                        if (playlist[idx]) {
                            const track = this.props.library[Object.keys(this.props.library)[0]][playlist[idx]]
                            this.props.receiveCurrentTrack(new Audio(track.audioUrl), track);
                        } 
                        else {
                            this.props.receivePause();
                        }
                    } 
                    else if (Object.keys(this.props.library)[0] === "index"){
                        const userLib = Object.keys(this.props.library["index"])
                        const idx = userLib.indexOf((this.props.info.id + 1).toString())
                        if (userLib[idx]) {
                            const track = this.props.library[Object.keys(this.props.library)[0]][userLib[idx]]
                            this.props.receiveCurrentTrack(new Audio(track.audioUrl), track);
                        } 
                        else {
                            this.props.receivePause();
                        }
                    }
                    else {
                        this.props.receivePause();
                    }
}})})}}
```


