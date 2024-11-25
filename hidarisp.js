// デバイスのパフォーマンスに応じて演出を調整
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const performanceConfig = {
    noteInterval: isMobile ? 400 : 200,
    starInterval: isMobile ? 800 : 500,
    sparkleInterval: isMobile ? 500 : 300,
    initialNotes: isMobile ? 5 : 10,
    initialStars: isMobile ? 10 : 20
};

// 音符を作成する関数
function createNote() {
    const notes = ['♪', '♫', '♬', '🎵', '🎶'];
    const colors = ['#ff6b6b', '#74c0fc', '#63e6be', '#ffd43b', '#ff922b'];
    const note = document.createElement('div');
    note.className = 'musical-note';
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    // 画面幅全体を使用するように修正
    const screenWidth = window.innerWidth;
    // 余白を考慮して配置範囲を調整（左右それぞれ5%の余白）
    const margin = screenWidth * 0.05;
    note.style.left = margin + (Math.random() * (screenWidth - 2 * margin)) + 'px';
    note.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(note);

    const animation = note.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(-${window.innerHeight + 50}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: 4000 + Math.random() * 2000,
        easing: 'ease-out'
    });

    animation.onfinish = () => note.remove();
}

// 星を作成する関数
function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * window.innerWidth + 'px';
    star.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 2000);
}

// タイトルをキラキラさせる関数
function addSparkleToTitle() {
    const title = document.querySelector('.title');
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    title.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', () => {
    // 初期アニメーション
    for (let i = 0; i < performanceConfig.initialNotes; i++) {
        setTimeout(createNote, i * 100);
    }
    
    // 定期的な要素生成
    setInterval(createNote, performanceConfig.noteInterval);
    setInterval(createStar, performanceConfig.starInterval);
    
    // 画面サイズ変更時の処理
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // 画面サイズに応じて要素の位置を調整
            adjustElementsPosition();
        }, 250);
    });
});
