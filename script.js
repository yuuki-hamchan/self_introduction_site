/**
 * 自己紹介ページ用スクリプト (script.js)
 * - プロフィール写真の自動読み込み機能
 * - 趣味カードをクリックした際のアニメーションとメッセージ表示
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. プロフィール画像の読み込みエラー時のフォールバック機能
  // ==========================================
  // 画像が何らかの理由（読み込みエラーなど）で表示できない場合、
  // 代わりに近未来的なロボットアバターSVGを自動的に表示する仕組みです。
  const profileImg = document.getElementById('profile-img');
  
  if (profileImg) {
    profileImg.addEventListener('error', () => {
      const wrapper = profileImg.parentElement;
      if (wrapper) {
        profileImg.remove(); // エラーになった画像を削除
        
        // SVGプレースホルダーを動的に生成（近未来ロボット風）
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("class", "profile-placeholder");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("id", "profile-svg");
        
        svg.innerHTML = `
          <circle cx="50" cy="50" r="46" fill="#0F172A" stroke="#00f2fe" stroke-width="2" stroke-dasharray="4 2"/>
          <circle cx="50" cy="50" r="40" fill="#1E293B"/>
          <!-- デジタルホログラムアバター -->
          <path d="M32 72 C32 60 40 54 50 54 C60 54 68 60 68 72" fill="none" stroke="#7f60ff" stroke-width="3" stroke-linecap="round"/>
          <rect x="41" y="28" width="18" height="16" rx="4" fill="#0F172A" stroke="#00f2fe" stroke-width="2.5"/>
          <circle cx="46" cy="36" r="2" fill="#00f2fe"/>
          <circle cx="54" cy="36" r="2" fill="#00f2fe"/>
          <line x1="48" y1="41" x2="52" y2="41" stroke="#00f2fe" stroke-width="1.5" stroke-linecap="round"/>
          <!-- アンテナ -->
          <line x1="50" y1="28" x2="50" y2="20" stroke="#00f2fe" stroke-width="2"/>
          <circle cx="50" cy="18" r="3" fill="#ff007f"/>
        `;
        wrapper.appendChild(svg);
      }
    });
    
    // 画像がすでにキャッシュから読み込みエラーになっている場合の対応
    if (profileImg.complete && profileImg.naturalWidth === 0) {
      profileImg.dispatchEvent(new Event('error'));
    }
  }

  // ==========================================
  // 2. 趣味カードクリック時のインタラクション
  // ==========================================
  const hobbyCards = document.querySelectorAll('.hobby-card');
  
  // 各趣味ごとの特別な一言メッセージとテーマカラー
  const hobbyMessages = {
    'hobby-camp': {
      message: '⛺️ キャンプ：大自然の中でデジタルデトックス。淹れたてのコーヒーと焚き火で心身をリセットします。',
      color: 'rgba(15, 23, 42, 0.95)',
      textColor: '#00f2fe' // サイアン
    },
    'hobby-bike': {
      message: '🏍️ バイク：大型バイクでゆったりと風を感じる。季節の移り変わりを肌で直接受け止める贅沢な時間です。',
      color: 'rgba(15, 23, 42, 0.95)',
      textColor: '#7f60ff' // パープル
    },
    'hobby-book': {
      message: '📖 読書：大好きなビジネス書を探しにBOOKOFFへ。Notionでの本棚整理が最近のもう一つのこだわりです。',
      color: 'rgba(15, 23, 42, 0.95)',
      textColor: '#ff007f' // ピンク
    }
  };

  hobbyCards.forEach(card => {
    card.addEventListener('click', () => {
      // クリック時のポヨンとした跳ね返りアニメーション
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = 'translateY(-5px) scale(1.03)';
        setTimeout(() => {
          card.style.transform = '';
        }, 150);
      }, 100);

      // 対応するメッセージを表示
      const cardId = card.id;
      if (hobbyMessages[cardId]) {
        const info = hobbyMessages[cardId];
        showToast(info.message, info.color, info.textColor);
      }
    });
  });

  // ==========================================
  // 3. メッセージ（トースト）表示ユーティリティ
  // ==========================================
  function showToast(message, bgColor, textColor) {
    // 既存のトーストがあれば一旦削除
    const oldToast = document.querySelector('.toast-notification');
    if (oldToast) {
      oldToast.remove();
    }

    // トースト要素を作成
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerText = message;
    
    // スタイルを設定
    toast.style.backgroundColor = bgColor;
    toast.style.color = textColor;
    toast.style.borderColor = textColor; // 枠線をネオンカラーに
    toast.style.boxShadow = `0 10px 40px ${textColor}25, inset 0 0 10px ${textColor}15`; // ネオン発光効果
    
    document.body.appendChild(toast);

    // ふわっと表示するための遅延処理
    setTimeout(() => {
      toast.classList.add('show');
    }, 50);

    // 5秒後に自動で消去（少し長めに表示）
    setTimeout(() => {
      toast.classList.remove('show');
      // フェードアウトアニメーションが終わった後に要素を削除
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 5000);
  }
});
