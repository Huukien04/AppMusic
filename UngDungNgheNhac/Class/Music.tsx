export default class Music {
    constructor(id,title, artist, image,lyric) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        //this.duration = duration;
        this.image = image;
        this.lyric = lyric;
        this.isPlaying = false;
    }

    play() {
        this.isPlaying = true;
        console.log(`Now playing: ${this.title} by ${this.artist}`);
    }

    pause() {
        this.isPlaying = false;
        console.log(`Paused: ${this.title}`);
    }

    stop() {
        this.isPlaying = false;
        console.log(`Stopped: ${this.title}`);
    }
}