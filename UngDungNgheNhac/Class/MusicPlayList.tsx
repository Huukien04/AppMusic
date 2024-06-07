import Music from "./Music";
export default class MusicPlaylist {
    constructor(id, name, playlist = []) {
        this.id = id;
        this.name = name;
        this.playlist = playlist;
    }

    getMusic(){
        return this.playlist;
    }

    getName(){
        return this.name;
    }

    setName(name){
        this.name = name;
    }

    addMusic(id, title, artist, image, lyric) {
        const newMusic = new Music(id, title, artist, image, lyric);
        this.playlist.push(newMusic);
    }

    removeMusic(index) {
        this.playlist.splice(index, 1);
    }

    playMusic(index) {
        this.playlist[index].play();
    }

    pauseMusic(index) {
        this.playlist[index].pause();
    }

    stopMusic(index) {
        this.playlist[index].stop();
    }
}