$(document).ready(function () {
    var exprs     = [];
    var choiceCnt = 4;
    var maxResult = 10;

    console.log('hek');

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $.getJSON('../rsc/math.expr.json', function(data) {
        console.log(data);
        $.each(data, function(i, expr) {
            exprs[i] = expr.expr;
        });

        exprGenerate();
    });

    $('#choices').on('click', '.choice', function(){
        if ($('#expr').attr('selected')) {
            return;
        }

        var result        = $('#expr').attr('result');
        var choicedResult = $(this).attr('result');  

        var choicedBg  = $(this).find('.choiced-bg');
        var choicedImg = $(this).find('.choiced-img');
        $(choicedBg).show();
        $(choicedImg).show('fast');

        if (result == choicedResult) {
            $(choicedImg).attr('src', '../rsc/img/icons/correct.svg');
        } else {
            $(choicedImg).attr('src', '../rsc/img/icons/incorrect.svg');
        }
        $('#expr').attr('selected', true);

        setTimeout(function(){
            exprGenerate();
            $(choicedBg).css('display', 'none');
            $(choicedImg).css('display', 'none');
            
            $('#expr').attr('selected', false);
          }, 2000);
    });

    function exprGenerate() {
        if (exprs.length == 0) {
            return;
        }

        var idx  = random(0, exprs.length - 1);
        var expr = exprs[idx]; 

        $('#expr').empty();
        $('#expr').append(expr + " = ?");

        var value = math.eval(expr);
        $('#expr').attr('result', value);

        var incorrects = [];
        for (i=0; i<=maxResult; i++) {
            if (i != value) {
                incorrects.push(i);
            }
        }

        $('#choices').empty();
        var correctIdx = random(0, choiceCnt - 1);
        for (var i = 0; i < choiceCnt; i ++) {
            var v = value;
            if (correctIdx != i) {
                var _idx = Math.floor(Math.random()*incorrects.length);
                v = incorrects[_idx];
                incorrects.splice(_idx, 1);
            } 
            
            var br  = '<div style="float:left; display:block; text-align:center; width:50%;">';
            br = br + ' <a href="javascript:void(0);" class="btn choice" result="' + v + '">';
            br = br + '     <span class="result">' + v + '</span>';
            br = br + '     <div class="choiced-bg"></div>';
            br = br + '     <img class="choiced-img"/>';
            br = br + '</a>';
            br = br + '</div>';
            $('#choices').append(br);
        }
    }
});