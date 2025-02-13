// ==UserScript==
// @name        X Post
// @namespace        http://tampermonkey.net/
// @version        0.4
// @description        オリジナルの「Xポスト」ボタンの設置
// @author        Ameba Blog User
// @match        https://ameblo.jp/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameba.jp
// @noframes
// @grant        none
// @updateURL        https://github.com/personwritep/X_Post/raw/main/X_Post.user.js
// @downloadURL        https://github.com/personwritep/X_Post/raw/main/X_Post.user.js
// ==/UserScript==


let target=document.querySelector('head');
let monitor=new MutationObserver(main);
monitor.observe(target, { childList: true });

main();

function main(){
    let user;
    let user_p=document.querySelector('._w6MHwCAy');
    if(user_p){
        user=user_p.textContent; }

    if(location.pathname.includes(user)){
        let htm=document.documentElement;
        let skin_code=htm.getAttribute('data-base-skin-code');
        if(skin_code){
            if(skin_code=="uranus"){
                sns_cat(0); }
            else if(skin_code=="new"){
                sns_cat(1); }
            else if(skin_code=="default"){
                sns_cat(2); }}

    } // if(location.pathname.includes(user)) // ユーザー自身のページのみ起動

} // main()



function sns_cat(type){

    let x_svg=
        '<svg class="x_logo" viewBox="0 0 1200 1227">'+
        '<path d="M714 519L1161 0H1055L667 451L357 0H0L468 682L0 1226H106L515'+
        ' 750L843 1226H1200L714 519H714ZM569 688L522 620L144 80H307L611 516L6'+
        '59 584L1055 1150H892L569 688V688Z" fill="#fff"></path>'+
        '</svg>';

    let x_button;
    let title;
    let entry_id;
    let ameba_id;

    let article=document.querySelector('.js-entryWrapper');
    if(article){
        title=article.getAttribute('data-unique-entry-title');
        entry_id=article.getAttribute('data-unique-entry-id');
        ameba_id=article.getAttribute('data-unique-ameba-id');
        title=encodeURIComponent(title); }

    x_button=
        '<a data-google-interstitial="false" class="tweetBtn" '+
        'href="https://x.com/intent/post?text='+ title +'%0D%0A'+
        '&amp;url=https%3A%2F%2Fameblo.jp%2F'+ ameba_id +
        '%2Fentry-'+ entry_id +'.html'+
        '&amp;via=ameba_official'+
        '&amp;hashtags=%E3%82%A2%E3%83%A1%E3%83%96%E3%83%AD" '+
        'rel="noopener noreferrer nofollow" target="_blank" '+
        'data-uranus-component="tweetButton">'+ x_svg +
        '<span>post</span></a>';


    let entryHead;
    if(type==0){
        entryHead=document.querySelector('.skin-entryTitle'); }
    if(type==1){
        entryHead=document.querySelector('.skinArticleHeader h1'); }
    if(type==2){
        entryHead=document.querySelector('.theme'); }

    let style='<style>';
    if(type==0){
        style+='.skin-entryTitle { position: relative; } .add { bottom: 10px; } '; }
    if(type==1){
        style+='.skinArticleHeader h1 { position: relative; } .add { bottom: 0; } '; }
    if(type==2){
        style+='.theme { position: relative; } .add { bottom: 5px; } '; }

    style+=
        '.add { position: absolute; right: 0; padding: 0.4px 6px 0; height: 20px; '+
        'background: #607d8b; border-radius: 4px; display: flex; align-items: center; } '+
        '.add .tweetBtn { text-decoration: none; display: flex; align-items: center; } '+
        '.add .x_logo { width: 14px; height: 14px; overflow: visible; } '+
        '.add .tweetBtn span { font: normal 12px/20px Meiryo; color: #fff; '+
        'margin-left: 3px; } '+
        '</style>';


    if(entryHead){
        let xx_sw='<div class="add">'+ x_button + style + '</div>';
        if(!document.querySelector('.add')){
            entryHead.insertAdjacentHTML('beforeend', xx_sw); }}

} // sns_cat()
