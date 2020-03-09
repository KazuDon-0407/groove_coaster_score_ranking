javascript:(function(){
    const href=location.href;
    var match=href.match("https://mypage.groovecoaster.jp/sp/#/se_rg/");
    if(match==null){
        alert("スコアランキング画面で実行してください");
    }
    else{
        const key=href.replace(/[^0-9]/g,'');
        const music_id=Math.floor(key/10);
        const difficulty=key-music_id*10;
        const ide_score=1000000;
        var page=0;
        var flag=0;
        while(!flag&&page<30){
            var xmlHttp=new XMLHttpRequest();
            xmlHttp.open("GET","https://mypage.groovecoaster.jp/sp/json/score_ranking_bymusic_bydifficulty.php?music_id="+music_id+"&difficulty="+difficulty+"&page="+page,false);
            xmlHttp.send(null);
            var data=JSON.parse(xmlHttp.responseText);
            console.log(data);
            var ary_len=data.score_rank.length;
            if(data.score_rank[ary_len-1].event_point<ide_score){
                flag=1;
                break;
            }
            page++;
        }
        var i;
        for(i=0;i<ary_len-1;i++){
            if(data.score_rank[i].event_point<ide_score) break;
        }
        var ide_num=page*100+i;
        alert("理論値人数:"+ide_num+"人");
        /*
        console.log(data.music_detail);
        const path=[data.music_detail.simple_result_data,data.music_detail.normal_result_data,data.music_detail.hard_result_data,data.music_detail.extra_result_data];
        const diff=["simple:","normal:","hard:","extra:"];
        var alert_disp="%E3%81%82%E3%81%AA%E3%81%9F%E3%81%AE"+data.music_detail.music_title+"%E3%81%AEperfect%E5%9B%9E%E6%95%B0";
        var perfect_num;
        var diff_lng=diff.length;
        if(!data.music_detail.ex_flag) diff_lng--;
        for(var i=0;i<diff_lng;i++){
            (path[i]==null) ? perfect_num="%E6%9C%AA%E3%83%97%E3%83%AC%E3%82%A4" : perfect_num=path[i].perfect+"%E5%9B%9E";
            alert_disp+="\n"+diff[i]+perfect_num;
        }
        alert(alert_disp);
        */
    }
})();
