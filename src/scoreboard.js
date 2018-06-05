
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
                    html += '<tr>' +
                        '<td>'+scores[i].player+'</td>' +
                        '<td>'+scores[i].score+'</td>' +
                        '<td>'+country+'</td>' +
                        '<td>'+scores[i].date+'</td>' +
                        '</tr>';
                }
                table.find('tr:not(.head)').remove();
                table.append(html);
            }
        });
    }
});