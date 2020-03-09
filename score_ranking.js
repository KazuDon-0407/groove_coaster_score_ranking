javascript:(function(){
    const href=location.href;
    const host="https://mypage.groovecoaster.jp";
    var match=href.match(host+"/sp/#/se_rg/");
    if(match==null){
        alert("スコアランキング画面で実行してください");
    }
    else{
        var xmlHttp=new XMLHttpRequest();
        const key=href.replace(/[^0-9]/g,'');
        const music_id=Math.floor(key/10);
        const difficulty=["(simple)","(normal)","(hard)","(extra)"];
        const d_idx=key-music_id*10;
        const ide_score=1000000;
        var page=0;
        var flag=0;
        
        var date=new Date();
        var now=date.getFullYear()+"年"+("0"+(date.getMonth()+1)).slice(-2)+"月"+date.getDate()+"日";
        alert(now);       
        xmlHttp.open("GET",host+"/sp/json/music_detail.php?music_id="+music_id,false);
        xmlHttp.send(null);
        var data=JSON.parse(xmlHttp.responseText);
        const music_title=data.music_detail.music_title;
        
        //max:30page
        while(!flag&&page<30){
            xmlHttp.open("GET",host+"/sp/json/score_ranking_bymusic_bydifficulty.php?music_id="+music_id+"&difficulty="+d_idx+"&page="+page,false);
            xmlHttp.send(null);
            var data=JSON.parse(xmlHttp.responseText);
            //console.log(data);
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
        var sum=data.count;
        alert(music_title+difficulty[d_idx]+"の理論値人数\n"+sum+"人中"+ide_num+"人");
    }
})();
