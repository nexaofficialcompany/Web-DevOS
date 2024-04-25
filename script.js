function LoadEffect() {
    document.querySelector(".__LoadEffect__").style.display = "block";
    document.addEventListener("DOMContentLoaded", (event) => {
        document.querySelector(".content").style.display = "none";
        Typer("#__LoadEffectText", function(){
            LoadEffectText2_Timer = setInterval(function() {
                document.querySelector("#__LoadEffectText2").style.display = "block";
                clearInterval(LoadEffectText2_Timer)
            }, 200);
            ClearEffect_Timer = setInterval(function() {
                // document.querySelector(".__LoadEffect__").style.display = "none";
                document.querySelector(".content").style.display = "block";
            }, 1000);
        });
    });
}

function Typer(target, callback) {
    var Target = document.querySelector(target);
    var lines = Target.innerHTML.split('\n');
    var lineIndex = 0;
    var typingInterval;

    Target.innerHTML = "";

    function addLine() {
        if (lineIndex < lines.length) {
            Target.innerHTML += lines[lineIndex] + "<br>";
            lineIndex++;
        } else {
            clearInterval(typingInterval);
            if (callback) {
                callback();
            }
        }
    }
    typingInterval = setInterval(addLine, 10);
}

var winFrames = document.querySelectorAll('#WinFrame');
for (var i = 0; i < winFrames.length; i++) {
    var element = winFrames[i];
    dragElement(element)
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.class + "Header")) {
        document.getElementById(elmnt.class + "Header").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function Open(event) {
    var targetName = event.getAttribute("target");
    var targetObj = document.querySelector(targetName);
    targetObj.style.display = "block";
    targetObj.style.opacity = "1";
}

function Full(event) {
    var targetName = event.getAttribute("target");
    var targetObj = document.querySelector(targetName);
    targetObj.style.top = "0";
    targetObj.style.left = "0";
    targetObj.style.width = "100%";
    targetObj.style.height = "100%";
}

function Exit(event) {
    var targetName = event.getAttribute("target");
    var targetObj = document.querySelector(targetName);
    targetObj.style.opacity = "0";
    closeInter = setInterval(function(){
        targetObj.style.display = "none";
        clearInterval(closeInter);
    }, 200);
}