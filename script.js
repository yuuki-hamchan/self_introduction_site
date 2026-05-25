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
});
