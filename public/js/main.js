// ボタン要素を取得
const spinButton = document.getElementById('spin');
const resetButton = document.getElementById('bom');
const logo_num = 56;

//GETしたロゴの場所までスクロール
const scrollView = (logoElement, time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            logoElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
            resolve()
        }, time)
    })
}

//ガチャハンドルの回転数UP
const spin_UP = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // 画像を時計回りに1回転させる
            spinButton.animate(
                // 途中の状態を表す配列
                [
                    { transform: 'rotate(0deg)' }, // 開始時の状態（0度）
                    { transform: 'rotate(360deg)' } // 終了時の状態（360度）
                ],
                // タイミングに関する設定
                {
                    fill: 'backwards', // 再生前後の状態（再生前、開始時の状態を適用）
                    duration: 1000, // 再生時間（1000ミリ秒）
                },
            );
            // フェードアウト処理追加
            resolve()
        }, time)
    })
}

//当たり判定
const judge = (logoSrc, randomNumber, logoElement, time) => {
    const hiddenLogo = document.getElementById("hidden_logo");

    hiddenLogo.src = logoSrc;
    hiddenLogo.style.display = "block";


    return new Promise((resolve) => {
        setTimeout(() => {

            const currentOpacity = window.getComputedStyle(logoElement).opacity;
            if (currentOpacity === '1') {
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

                            // 名前を保存するためのプロンプトを表示
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
                        }
                    })
                    .catch(error => {
                        console.error("データベース更新中にエラーが発生しました", error);
                    });
            }

            hiddenLogo.style.display = "none";
            resolve();
        }, time)
    })
};



// ボタンがクリックされたときのイベントリスナー
let dblClickFlag = null;
async function buttonFunction(logoSrc, randomNumber, logoElement) {
    await spin_UP(0);
    await scrollView(logoElement, 2000);
    await judge(logoSrc, randomNumber, logoElement, 500)
};


spinButton.addEventListener('click', () => {
    const randomNumber = Math.floor(Math.random() * logo_num) + 1;
    const logoElement = document.querySelector(`#logo-${randomNumber}`);
    const logoSrc = logoElement.querySelector('img').src;

    if (dblClickFlag == null) {
        dblClickFlag = 1;
    } else {
        return;
    }

    buttonFunction(logoSrc, randomNumber, logoElement);

    dblClickFlag = null;

});

resetButton.addEventListener('click', () => {
    window.confirm("初期化してもよろしいですか？");

});