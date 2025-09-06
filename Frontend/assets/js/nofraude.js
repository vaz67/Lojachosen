//prevent right click
document.oncontextmenu =  () => {
    return false
}

//previnir inspecionar e ver o codigo com F12 e Crtl + U, previnir copiar e colar
document.onkeydown = e => {
    //previnir F12
    if (e.key == "F12") {
        return false
    }
    // previnir mostrar o codigo da pagina com Crtl + U
    if (e.ctrlKey && e.key == "u"){
        return false
    }
    //previnir copiar qualquer coisa
    if (e.ctrlKey && e.key == "c"){
        return false
    }
    //previnir colar
    if (e.ctrlKey && e.key == "v"){
        return false
    }
}
