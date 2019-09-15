$(document).ready(function () {
    var words     = [];
    var choiceCnt = 4;

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $.getJSON('../rsc/mn.letters.json', function(data) {
        $.each(data, function(i, card) {
            if (card.letter != 'Ыы' && card.letter != 'Щщ') {
                words = $.merge(words, card.words);
            }
        });
        
        wordGenerate();
    });

    $('#choices').on('click', '.choice', function(){
        if ($('#word').attr('selected')) {
            return;
        }

        var word        = $('#word').text();
        var choicedWord = $(this).attr('word');  

        var choicedBg  = $(this).find('.choiced-bg');
        var choicedImg = $(this).find('.choiced-img');
        $(choicedBg).show();
        $(choicedImg).show('fast');

        if (word == choicedWord) {
            $(choicedImg).attr('src', '../rsc/img/icons/correct.svg');
        } else {
            $(choicedImg).attr('src', '../rsc/img/icons/incorrect.svg');
        }
        $('#word').attr('selected', true);

        setTimeout(function(){
            wordGenerate();
            $(choicedBg).css('display', 'none');
            $(choicedImg).css('display', 'none');
            
            $('#word').attr('selected', false);
          }, 2000);
    });

    function wordGenerate() {
        if (words.length == 0) {
            return;
        }

        var word = getWordRandom(words);
        $('#word').empty();
        $('#word').append(word.word);

        var _words = $.merge([], words);
        _words.splice(words.indexOf(word), 1);

        $('#choices').empty();
        var correctIdx = random(0, choiceCnt - 1);
        for (var i = 0; i < choiceCnt; i ++) {
            var w = word;
            if (correctIdx != i) {
                w = getWordRandom(_words);
                _words.splice(_words.indexOf(w), 1);
            } 
            
            var br  = '<div style="float:left; display:block; text-align:center; width:50%;">';
            br = br + ' <a href="javascript:void(0);" class="btn choice" word="' + w.word + '">';
            br = br + '     <img src="' + w.image + '"/>';
            br = br + '     <div class="choiced-bg"></div>';
            br = br + '     <img class="choiced-img"/>';
            br = br + '</a>';
            br = br + '</div>';
            $('#choices').append(br);
        }
    }

    function getWordRandom(_words) {
        if (_words.length == 0) {
            return;
        }

        var idx = random(0, _words.length - 1);
        return  _words[idx];
    }
});