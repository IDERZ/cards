$(document).ready(function () {
    var datas = [];
    var curIdx = 0;

    $.getJSON('rsc/mn.letters.json', function(data) {
        $.each(data, function(i, card) {
            datas[i] = card;
        });

        showCard(datas[curIdx]);
    });

    $("#prev").click(function(){
        if (curIdx == 0) {
            curIdx = datas.length - 1;
        } else {
            curIdx = curIdx - 1;
        }

        $('#btnSound')[0].play();
        showCard(datas[curIdx]);
    });

    $("#next").click(function(){
        if (curIdx == datas.length - 1) {
            curIdx = 0;
        } else {
            curIdx = curIdx + 1;
        }

        $('#btnSound')[0].play();
        showCard(datas[curIdx]);
    });
});

function randomIdx(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showCard(card) {
    var words = card.words;
    var size = words.length;

    var curIdx = 0;
    if (size > 1) {
        curIdx = randomIdx(0, size - 1);
    }
    
    var word = words[curIdx];

    var br =      "<div class='letter'><span>" + card.letter + "</span></div>\n";
        br = br + "<div class='img'><img src='" + word.image + "' /></div>\n";
        br = br + "<div class='word'><span>" + word.word + "</span></div>\n";
    $('#letter-card').empty();
    $('#letter-card').append(br);
}