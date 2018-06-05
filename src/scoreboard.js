
$(function () {

    loadScore();
    setInterval(loadScore, 4000);

    function loadScore(){
        let table = $('#scoreboard_table');
        let api = new Api();


        api.getScoreboard(function(data){
            if(data.status.success){

                let scores = data.data;
                let html = '';
                for(let i = 0; i < scores.length; i++){
                    let country = scores[i].country != null ? scores[i].country : '';
                    let classes = '';
                    if(i <= 2)
                        classes += 'highlight active ';
                    if(i === 2){
                        classes += 'last ';
                    }
                    html += '<tr class="' + classes + '">' +
                        '<td>'+ getRank(i) +'</td>' +
                        '<td class="player-name">'+scores[i].player+'</td>' +
                        '<td class="score">'+scores[i].score+'</td>' +
                        '<td>'+country+'</td>' +
                        '<td>'+scores[i].date+'</td>' +
                        '</tr>';
                }
                table.find('tr:not(.head)').remove();
                table.append(html);
            }
        });
    }

    function getRank(i){
        var url = undefined;
        switch(i){
            case 0:
                url = 'assets/sprites/rank/1.png';
                break;
            case 1:
                url = 'assets/sprites/rank/2.png';
                break;
            case 2:
                url = 'assets/sprites/rank/3.png';
                break;
        }
        return typeof url === 'undefined' ? '' : '<img src="' + url + '" class="rank" />';
    }
});