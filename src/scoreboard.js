
$(function () {
    let table =$('#scoreboard_table');
    let api = new Api();
    api.getScoreboard(function(data){
        if(data.status.success){
            let scores = data.data;
            for(let i = 0; i < scores.length; i++){
                let country = scores[i].country != null ? scores[i].country : '';
                let row = '<tr>' +
                    '<td>'+scores[i].player+'</td>' +
                    '<td>'+scores[i].score+'</td>' +
                    '<td>'+country+'</td>' +
                    '<td>'+scores[i].date+'</td>' +
                '</tr>';
                table.append(row);
            }
        }
    });
});