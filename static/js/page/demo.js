$('#j-start').bind('click', function(){
    $('#j-p1').hide();
    $('#j-p2').show();
});
$('#j-finish').bind('click', function(){
    $('#j-p2').hide();
    $('#j-p3').show();
});


var jQcameraInput = $('#cameraInput');
var jQprevImg = $(".uploaded-img");
var jQfinalImg = $("#j-preview");

var avatar, imgReader;
function readFile(){
    file = jQcameraInput.get(0).files[0];
    if(!/image\/\w+/.test(file.type)){
        alert("请上传图片类型的文件~");
        return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e){
        jQprevImg.attr('src', this.result).show();
        // jQfinalImg.attr('src', this.result).show();
    }
}
jQcameraInput.bind('change', readFile);
$('#j-photo').bind('click', function(){
    jQcameraInput.click();
});

var grassCount = 0;
$(".select").delegate('.grass', 'click', function(){
    if(grassCount>=1){
        return
    }
    grassCount++;
    $(this).clone(true).appendTo(".canvas-wrapper");
});


touch.on('#j-canvas-wrapper', 'touchstart', function(ev){
    ev.preventDefault();
});


var target = document.getElementById("target");
var dx, dy;

touch.on('#j-canvas-wrapper', 'drag', '.grass', function(ev){
    dx = dx || 0;
    dy = dy || 0;
    var offx = dx + ev.x + "px";
    var offy = dy + ev.y + "px";
    this.style.webkitTransform = "translate3d(" + offx + "," + offy + ",0)";
});

touch.on('#j-canvas-wrapper', 'dragend', '.grass', function(ev){
    dx += ev.x;
    dy += ev.y;
});

var canvas = document.getElementById("canvas");
var ctx=canvas.getContext("2d");

$("#j-finish").bind('click', function(){
    var wToDraw, hToDraw, leftCo;
    wToDraw = w;
    hToDraw = (1136/640)*wToDraw;
    if(h<hToDraw){
        hToDraw=h;
        wToDraw = 640/1136*hToDraw;
        leftCo = (w - wToDraw)/2;
        ctx.drawImage(imgFace, leftCo, 0, wToDraw, hToDraw, 0, 0, 640, 1136);    
    }else{
        ctx.drawImage(imgFace, 0, 0, wToDraw, hToDraw, 0, 0, 640, 1136); 
    }

})