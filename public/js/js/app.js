var m = require('mithril');

//カウンター
var counter = 0;

//タイマーでカウントアップ
setInterval(function () {
    counter++;
    m.redraw(true);
}, 1000);

//ビュー
function view() {
//    return {tag: "a", attrs: {href:"#"}, children: ['count: ' + counter]};
    return {tag: "a", attrs: {href:"#"}, children: ["count: ", counter]};
}

//HTML要素にコンポーネントをマウント
m.mount(document.body, {view: view});

