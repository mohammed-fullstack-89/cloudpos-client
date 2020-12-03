const { Howl, Howler } = require('howler');

const assetsSrc = './assets/sound/';

class SoundManager {

    constructor() {
        this.howl = null;
    }

    setVolumn = (volumn) => this.howl.volume(volumn)

    playBarcodeSound = () => {
        console.log('ho');
        if (!this.howl.playing)
            this.howl.play('item.mp3');
    }

    playError = () => {
        if (!this.howl.playing)
            this.howl.play('error.mp3')
    }

}
SoundManager._instance = null;
SoundManager.getInstance = () => {
    if (SoundManager._instance === null) {
        SoundManager._instance = new SoundManager();
        SoundManager._instance.howl = new Howl({
            src: [`${assetsSrc}item.mp3`, `${assetsSrc}error.mp3`],
            autoplay: true,
            loop: true,
            volume: 0.5,
            onend: function () {
                console.log('Finished!');
            }
        }).volume(1);
        Howler.volume(0.5);

    }
    return SoundManager._instance;
}
module.exports = SoundManager.getInstance();