// ボタン要素を取得
const spinButton = document.getElementById('spin');
const logo_num = 56;

// ボタンがクリックされたときのイベントリスナー
let dblClickFlag = null;
spinButton.addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * logo_num) + 1;
    const logoElement = document.querySelector(`#logo-${randomNumber}`);
    
    if (dblClickFlag == null) {
        dblClickFlag = 1;
    } else {
        return;
    }
        spinButton.classList.add('rotate_b');
        // フェードアウト処理追加

     setTimeout(() => {
        logoElement.classList.remove('rotate_b');
        logoElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
        });
    }, 2000); 
    
    setTimeout(() => {
    if (logoElement) {
        const currentOpacity = window.getComputedStyle(logoElement).opacity;
        if (currentOpacity === '1') {
            logoElement.classList.remove('rotate_b');
            alert("残念！既に出ています！");
        } else {
            // 表示されていない場合は表示し、サーバーにフラグを更新するリクエストを送信
            fetch('/update-flag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: randomNumber }) // ロゴのIDを送信
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    logoElement.style.opacity = 1;
                    logoElement.classList.add('expanded');

                    // 2秒後に元の位置に戻る
                    setTimeout(() => {
                        logoElement.classList.remove('expanded');
                        logoElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center',
                            inline: 'nearest'
                        });
                    }, 1000); 

                    // 名前を保存するためのプロンプトを表示
                    setTimeout(() => {
                        const userInput = prompt("おめでとうございます！初めてのロゴが出ました!\nあなたの名前を入力してください:", "名無し");
                        if (userInput) {
                            // 名前をサーバーに送信
                            fetch('/save-name', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ name: userInput, id: randomNumber }) // ユーザー名とロゴIDを送信
                            })
                            .then(response => {
                                if (response.ok) {
                                    location.reload()
                                } else {
                                    alert("名前の登録中にエラーが発生しました。");
                                }
                            })
                            .catch(error => {
                                alert("リクエスト中にエラーが発生しました。");
                            });
                        }
                    }, 2000);
                }
            })
            .catch(error => {
                console.error("データベース更新中にエラーが発生しました", error);
            });
        }
    } else {
        setTimeout(() => {
        alert("残念！ハズレです！！");
    }, 2000);
    }
}, 2000); 
    dblClickFlag = null;
});
