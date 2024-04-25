function LoadEffect() {
    document.querySelector(".__LoadEffect__").style.display = "block";
    document.querySelector("#__LoadEffectText").style.filter = "none";
    document.addEventListener("DOMContentLoaded", (event) => {
        document.querySelector(".content").style.display = "none";
        Typer("#__LoadEffectText", function(){
            LoadEffectText2_Timer = setInterval(function() {
                document.querySelector("#__LoadEffectText").style.filter = "blur(2px)";
                document.querySelector("#__LoadEffectText2").style.display = "block";
                clearInterval(LoadEffectText2_Timer)
            }, 200);
            ClearEffect_Timer = setInterval(function() {
                document.querySelector("#__LoadEffectText").innerHTML = "";
                // document.querySelector(".__LoadEffect__").style.display = "none";
                document.querySelector(".content").style.display = "block";
                document.querySelector(".content").style.filter = "blur(12px)";
                clearInterval(ClearEffect_Timer);
            }, 1000);
            ClearEffect_Timer2 = setInterval(function() {
                document.querySelector(".content").style.filter = "none";
                document.querySelector("#__LoadEffectText2").style.display = "none";
                clearInterval(ClearEffect_Timer2);
            }, 2000);
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
    typingInterval = setInterval(addLine, 30);
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (elmnt.querySelector("#Header")) {
        elmnt.querySelector("#Header").onmousedown = dragMouseDown;
    } else {
        // elmnt.onmousedown = dragMouseDown;
        null;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        elmnt.style.zIndex = getMaxZIndex() + 1;
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

    function getMaxZIndex() {
        var maxZIndex = 0;
        var allDivs = document.querySelectorAll('div');
        allDivs.forEach(function(div) {
            var zIndex = parseInt(window.getComputedStyle(div).zIndex);
            maxZIndex = Math.max(maxZIndex, zIndex || 0);
        });
        return maxZIndex;
    }

    // Resize function for #Top
    elmnt.querySelector("#Top").onmousedown = resizeTop;
    function resizeTop(e) {
        e = e || window.event;
        e.preventDefault();
        pos2 = e.clientY;
        document.onmousemove = resizeElementTop;
        document.onmouseup = stopResizeTop;
    }
    function resizeElementTop(e) {
        e = e || window.event;
        e.preventDefault();
        pos4 = pos2 - e.clientY;
        pos2 = e.clientY;
        elmnt.style.height = (elmnt.offsetHeight + pos4) + "px";
        elmnt.style.top = (elmnt.offsetTop - pos4) + "px";
    }
    function stopResizeTop() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    // Resize function for #Bottom
    elmnt.querySelector("#Bottom").onmousedown = resizeBottom;
    function resizeBottom(e) {
        e = e || window.event;
        e.preventDefault();
        pos2 = e.clientY;
        document.onmousemove = resizeElementBottom;
        document.onmouseup = stopResizeBottom;
    }
    function resizeElementBottom(e) {
        e = e || window.event;
        e.preventDefault();
        pos4 = e.clientY - pos2;
        pos2 = e.clientY;
        elmnt.style.height = (elmnt.offsetHeight + pos4) + "px";
    }
    function stopResizeBottom() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    // Resize function for #Left
    elmnt.querySelector("#Left").onmousedown = resizeLeft;
    function resizeLeft(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = e.clientX;
        document.onmousemove = resizeElementLeft;
        document.onmouseup = stopResizeLeft;
    }
    function resizeElementLeft(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = pos1 - e.clientX;
        pos1 = e.clientX;
        elmnt.style.width = (elmnt.offsetWidth + pos3) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos3) + "px";
    }
    function stopResizeLeft() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    // Resize function for #Right
    elmnt.querySelector("#Right").onmousedown = resizeRight;
    function resizeRight(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = e.clientX;
        document.onmousemove = resizeElementRight;
        document.onmouseup = stopResizeRight;
    }
    function resizeElementRight(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX - pos1;
        pos1 = e.clientX;
        elmnt.style.width = (elmnt.offsetWidth + pos3) + "px";
    }
    function stopResizeRight() {
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
    closeInter2 = setInterval(function(){
        targetObj.style.top = "5%";
        targetObj.style.left = "5%";
        targetObj.style.height = "70%";
        targetObj.style.width = "60%";
        clearInterval(closeInter2);
    }, 200);
}

function Mini(event) {
    var targetName = event.getAttribute("target");
    var targetObj = document.querySelector(targetName);
    targetObj.style.opacity = "0";
    closeInter = setInterval(function(){
        targetObj.style.display = "none";
        clearInterval(closeInter);
    }, 200);
}