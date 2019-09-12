$(document).ready(function () {
    var datas = [];
    var curIdx = 0;

    $.getJSON('../rsc/mn.words.json', function(data) {
        // $.each(data, function(i, card) {
        //     datas[i] = card;
        // });

        // showCard(datas[curIdx]);
    });

    
});

function randomIdx(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}