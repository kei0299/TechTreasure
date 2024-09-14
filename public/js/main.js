// ボタン要素を取得
const spinButton = document.getElementById('spin');
const logo_num = 56;

// ボタンがクリックされたときのイベントリスナー
spinButton.addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;

    // 結果を表示する
    document.getElementById('result').innerText = `ランダムな数字: ${randomNumber}`;
    const logoElement = document.querySelector(`#logo-${randomNumber}`);
    if (logoElement) {
    const currentOpacity = window.getComputedStyle(logoElement).opacity;
    if (currentOpacity === '1') {
        alert("残念！既に出ています！");
    } else {
        // 表示されていない場合は表示、logoテーブルのflagをtrueにする


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
        }, 1000); // 2秒間拡大表示

        setTimeout(() => {
            const userInput = prompt("おめでとうございます！初めてのロゴが出ました!\nあなたの名前を入力してください:","名無し");
            console.log(`ユーザーの入力: ${userInput}`);
            if (userInput) {
                // ユーザーの入力をサーバーに送信
                fetch('/save-name', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: userInput, id: randomNumber }) // ユーザー名を送信
                })
                .then(response => {
                    if (response.ok) {
                        console.log('名前が正常に保存されました');
                        alert("名前が正常に登録されました！");
                    } else {
                        console.log('名前の保存中にエラーが発生しました');
                        alert("名前の登録中にエラーが発生しました。");
                    }
                })
                .catch(error => {
                    console.error('リクエスト中にエラーが発生しました', error);
                    alert("リクエスト中にエラーが発生しました。");
                });
            }
        }, 2000); // 2000ミリ秒 = 2秒
    }
} else {
    alert("残念！ハズレです！！");
}
});