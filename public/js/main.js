// ボタン要素を取得
const spinButton = document.getElementById('spin');
const logo_num = 56;

// ボタンがクリックされたときのイベントリスナー
spinButton.addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    // 結果を表示する
    document.getElementById('result').innerText = `ランダムな数字: ${randomNumber}`;
    const logoElement = document.querySelector(`#logo-${randomNumber}`);
    const currentOpacity = window.getComputedStyle(logoElement).opacity;
    if (logoElement) {
    if (currentOpacity === '1') {
        console.log("表示済み");
    } else {
        // 表示されていない場合は表示する
        logoElement.style.opacity = 1;
        logoElement.classList.add('expanded');

        // 2秒後に元の位置に戻る
        setTimeout(() => {
            logoElement.classList.remove('expanded');
            // 元の位置にスクロールする
            logoElement.scrollIntoView({
                behavior: 'smooth', // スクロールのアニメーションを滑らかにする
                block: 'center',    // 要素を画面の中央に配置
                inline: 'nearest'  // 水平方向で画面内に収まるようにする
            });
        }, 2000); // 2秒間拡大表示


        // logoElement.scrollIntoView({
        //     behavior: 'smooth', // スクロールのアニメーションを滑らかにする
        //     block: 'center', // 要素を画面の中央に配置
        //     inline: 'nearest' // 水平方向で画面内に収まるようにする
        // });
        // setTimeout(() => {
        //     const userInput = prompt("おめでとうございます!初めてのロゴが出ました!あなたの名前を入力してください:");
        //     console.log(`ユーザーの入力: ${userInput}`);
        // }, 2000); // 2000ミリ秒 = 2秒
    }
} else {
    console.log(`Element with ID #logo-${randomNumber} not found`);
}
});

