$(document).ready(function () {
    var datas     = [];
    var idx       = 0;
    var choiceCnt = 2;

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $.getJSON('../rsc/mn.letters.json', function(data) {
        $.each(data, function(i, card) {
            if (card.letter != 'Ыы' && card.letter != 'Щщ') {
                datas[i] = card;
            }
        });
        idx = random(0, data.length - 1);
        showCard(datas[idx]);
    });

    $('.choice').trigger(function(){
        console.log('clicked...');
    });

    function showCard(card) {
        var words = card.words;
        var size = words.length;
    
        var idx = 0;
        if (size > 1) {
            idx = random(0, size - 1);
        }
        
        var word = words[idx];
    
        $('#word').empty();
        $('#word').append(word.word);
    
        $('#choices').empty();

        var correctIdx = random(0, choiceCnt - 1);
        for (var i=0; i<choiceCnt; i++) { 
            var br = '<div style="float:left; display:block; text-align:center; width:' + 100/choiceCnt + '%;">';
            br = br + '<a href="javascript:void(0);" class="btn choice"><img src="' + ((correctIdx == i) ? word.image : "") + '"/></a></div>';
            $('#choices').append(br);
        }
    }
});