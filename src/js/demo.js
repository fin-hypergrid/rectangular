'use strict';

/* eslint-env browser */
/* globals rectangular:false */

window.onload = function() {

    var body = document.querySelector('body'), vars = {};

    Array.prototype.slice.call(document.getElementsByTagName('input')).forEach(function(elt) {
        elt.onclick = stop;
    });

    Array.prototype.slice.call(document.getElementsByTagName('button')).forEach(function(button) {
        var varBox = button.getElementsByClassName('var');
        var parms = button.getElementsByClassName('parm');

        switch (button.className) {
        case 'newrect':
            button.onclick = function(/*evt*/) {
                newDiv(
                    varBox[0],
                    new rectangular.Rectangle(
                        parms[0].value,
                        parms[1].value,
                        parms[2].value,
                        parms[3].value
                    )
                )
                    .className = button.className;
            };
            break;
        case 'intersect':
            button.onclick = function(/*evt*/) {
                newDiv(
                    varBox[0],
                    vars[varBox[1].value].intersect(vars[varBox[2].value])
                )
                    .className = button.className;
            };
            break;
        }
    });

    function newDiv(varNameElt, rectangle) {
        var name = varNameElt.value;
        vars[name] = rectangle;
        do {
            varNameElt.value = name.replace(/(\d+)$/, Number(name.match(/\d+$/)) + 1);
        } while (varNameElt.value in vars);
        var obj = document.createElement('div');
        obj.className = 'obj';
        obj.style.left = rectangle.origin.x + 'px';
        obj.style.top = rectangle.origin.y + 'px';
        obj.style.width = rectangle.extent.x + 'px';
        obj.style.height = rectangle.extent.y + 'px';
        obj.innerHTML = name;
        body.appendChild(obj);
        return obj;
    }

    function stop(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    }
};
