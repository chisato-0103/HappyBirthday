// 音符を作成して画面上でアニメーションさせる関数
function createNote() {
    // 表示する音符の種類を配列で定義
    const notes = ['🎵', '🎶', '♪', '♫', '♬'];
    
    // 新しいdiv要素を作成
    const note = document.createElement('div');
    // CSSのクラス名を設定
    note.className = 'notes';
    // ランダムに音符を選んで要素のテキストとして設定
    // Math.floor()で小数点以下を切り捨て
    // Math.random()で0以上1未満のランダムな数を生成
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    
    // 音符の横位置をランダムに設定（画面の幅の中でランダム）
    note.style.left = Math.random() * window.innerWidth + 'px';
    // 音符の縦位置を画面の一番下に設定
    note.style.top = window.innerHeight + 'px';
    
    // 作成した音符要素をページに追加
    document.body.appendChild(note);

    // 音符のアニメーションを定義
    const animation = note.animate([
        // アニメーションの開始状態（下から開始）
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        // アニメーションの終了状態（上に移動しながら回転、透明に）
        { transform: 'translateY(-' + window.innerHeight + 'px) rotate(360deg)', opacity: 0 }
    ], {
        // アニメーションの設定
        duration: 4000,  // 4秒間
        easing: 'linear' // 一定の速度で動く
    });

    // アニメーション終了時に音符要素を削除
    animation.onfinish = () => note.remove();
}

// 300ミリ秒（0.3秒）ごとに音符を作成
// setInterval(実行する関数, 間隔をミリ秒で指定)
setInterval(createNote, 300);
