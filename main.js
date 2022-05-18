// my function to get element
let getEl = function (selector) {
    return document.querySelector(selector)
}
let getElAll = function (selector) {
    return document.querySelectorAll(selector)
}

let smallres = getEl('.min-res')
let res = getEl('.max-res')

// cheack error | if the 0 is first in display && if the "." is first in display

let regixZero = /^0/
let regixpoint = /^\./

let errorCheck = function(){
    if (regixZero.test(res.innerHTML) != true && regixpoint.test(res.innerHTML) != true){
        return true
    }
}

let resultcheck = true
let oprition = null

// click event
getElAll('.grid div').forEach(function (x) {
    x.addEventListener('click', function () {
        if (errorCheck() == true && resultcheck == true){
            switch (x.className) {
                case "ac":
                    res.innerHTML = ""
                    smallres.innerHTML = ""
                    break;
                case "plus":
                    calc("+")
                    break;
                case "div":
                    calc("*")
                    break;
                case "divided":
                    calc("/")
                    break;
                case "percent":
                    calc("%")
                    break;
                case "min":
                    calc("-")
                    break;
                case "plus-min":
                    res.innerHTML != '' ? res.innerHTML = -res.innerHTML : '' 
                    break;
                case "equal":
                    equal()
                    break;
                case "delet":
                    res.innerHTML = res.innerHTML.toString().slice(0,-1)
                    break;
                default:
                    if (x.innerHTML == "." && res.innerHTML.toString().includes(".") == true){
                        return false
                    }else {
                            res.innerHTML += x.innerHTML
                    }
                    break;
            }
        }
        else {
            if (x.className == "delet"){
                res.innerHTML = ''
            }else{
                res.innerHTML = this.innerText
            }
        }
    })
})

// calculator function
function calc(opritionClass){
    if (res.innerHTML != ""){
        if (smallres.innerHTML.toString().includes("=") == true){
            smallres.innerHTML = res.innerHTML + ` ${opritionClass} `
            res.innerHTML = ''
        }else{
            smallres.innerHTML += res.innerHTML + ` ${opritionClass} `
            res.innerHTML = ''
        }
        oprition = opritionClass
    }else if(smallres.innerHTML != ""){
        smallres.innerHTML = smallres.innerHTML.slice(0,-2) + ` ${opritionClass} `
    }
}

// equal dunction
function equal() {
    if (res.innerHTML != "" && smallres.innerHTML != ""){
        let resulta = res.innerHTML
        res.innerHTML = eval(smallres.innerHTML.toString().slice(0,-2) + `${oprition}` + res.innerHTML)
        smallres.innerHTML = smallres.innerHTML.toString().slice(0,-2)+` ${oprition} `+resulta+" ="
    }else if(smallres.innerHTML != ""){
        res.innerHTML = eval(smallres.innerHTML.toString().slice(0,-2))
        smallres.innerHTML = smallres.innerHTML.toString().slice(0,-2)+" ="
    }
}
// keyborad function

let regixkey = /[0-9\.]/
window.addEventListener('keyup',function(e){
    if (errorCheck() == true && resultcheck == true){
        switch (e.key) {
            case "ac":
                res.innerHTML = ""
                smallres.innerHTML = ""
                break;
            case "Backspace":
                res.innerHTML = res.innerHTML.toString().slice(0,-1)
            break;
            case "+":
                calc("+")
                break;
            case "*":
                calc("*")
                break;
            case "/":
                calc("/")
                break;
            case "%":
                calc("%")
                break;
            case "-":
                calc("-")
                break;
            case "Enter":
                equal()
                break;
            case "=":
                equal()
                break;
            default:
                if (e.key == "." && res.innerHTML.toString().includes(".") == true){
                    return false
                }else if(regixkey.test(e.key) == true) {
                    res.innerHTML += e.key
                }
                break;
        }
    }
    else {
        if (e.key == "Backspace"){
            res.innerHTML = ''
        }else{
            res.innerHTML = e.key
        }
    }
})