export const AudioSource = {
   coin: 'https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3',
   win: 'https://assets.mixkit.co/sfx/preview/mixkit-game-level-completed-2059.mp3',
   error: 'https://assets.mixkit.co/sfx/preview/mixkit-game-show-wrong-answer-buzz-950.mp3',
   correct: 'https://assets.mixkit.co/sfx/preview/mixkit-player-jumping-in-a-video-game-2043.mp3',
   background: 'https://assets.mixkit.co/music/preview/mixkit-games-worldbeat-466.mp3',
}

export const playAudio = (url: string) => {
   const audio = new Audio(url)
   audio.volume = 0.03
   return audio.play()
}

const audioSourse = new Audio(AudioSource.background)
audioSourse.volume = 0.03
audioSourse.loop = true
export const audioBackground = {
   pause() {
      audioSourse.pause()
   },
   start() {
      audioSourse.play()
   },
}
