// 設定オブジェクト
const CONFIG = {
  balloons: {
    colors: ['#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#ffcc00', '#ffd700'],
    minSize: 20,
    maxSize: 60,
    spawnInterval: 400,
    initialCount: 8,
    maxCount: 30
  },
  notes: {
    symbols: ['♪', '♫', '♬', '♩', '𝄞'],
    colors: ['#ffd700', '#ffffff'],
    size: {min: 15, max: 30}
  }
};

// バルーンマネージャークラス
class BalloonManager {
  constructor() {
    this.container = document.querySelector('.balloons');
    this.activeCount = 0;
  }

  create() {
    if (this.activeCount >= CONFIG.balloons.maxCount) return;

    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    // バルーンのスタイル設定
    const size = CONFIG.balloons.minSize + Math.random() * (CONFIG.balloons.maxSize - CONFIG.balloons.minSize);
    Object.assign(balloon.style, {
      backgroundColor: this.getRandomItem(CONFIG.balloons.colors),
      left: `${Math.random() * 90}vw`,
      width: `${size}px`,
      height: `${size * 1.2}px`,
      transform: `rotate(${Math.random() * 20 - 10}deg)`
    });

    // 音符の追加（ランダムに）
    if (Math.random() > 0.5) {
      this.addMusicNote(balloon);
    }

    this.container.appendChild(balloon);
    this.activeCount++;

    // アニメーション設定
    const animation = balloon.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: 5000 + Math.random() * 3000,
      easing: 'ease-out'
    });

    animation.onfinish = () => {
      balloon.remove();
      this.activeCount--;
    };
  }

  addMusicNote(balloon) {
    const note = document.createElement('div');
    note.className = 'music-note';
    note.textContent = this.getRandomItem(CONFIG.notes.symbols);
    note.style.color = this.getRandomItem(CONFIG.notes.colors);
    note.style.fontSize = `${CONFIG.notes.size.min + Math.random() * (CONFIG.notes.size.max - CONFIG.notes.size.min)}px`;
    balloon.appendChild(note);
  }

  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}

// メイン処理
document.addEventListener('DOMContentLoaded', () => {
  const balloonManager = new BalloonManager();
  
  // 初期バルーンの生成
  for (let i = 0; i < CONFIG.balloons.initialCount; i++) {
    setTimeout(() => balloonManager.create(), i * 200);
  }

  // 定期的なバルーン生成
  setInterval(() => balloonManager.create(), CONFIG.balloons.spawnInterval);

  // チューバの絵文字をクリックした時のイースターエッグ
  const tuba = document.querySelector('.tuba');
  tuba.addEventListener('click', () => {
    tuba.style.transform = 'scale(1.2)';
    for (let i = 0; i < 5; i++) {
      setTimeout(() => balloonManager.create(), i * 100);
    }
    setTimeout(() => tuba.style.transform = 'scale(1)', 300);
  });
});
