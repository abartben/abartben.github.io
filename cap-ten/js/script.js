window.pas = 10 //pas possible en degrés 
window.first = true
window.reponses = 0
window.justes = 0

$(document).keypress(function(e) {
    if(e.which == 13)
 		 {
        new_position();
   	 }
});

function toggle_pas()
{
    if(window.pas==10){
        window.pas = 5
    }
    else
    {
        window.pas = 10
    }
    $("#pas").html(window.pas+"°")
}

function new_position()
{
    if(window.first == false){
        //si ce n'est pas la première on vérifie la réponse si elle est juste
        window.reponses = window.reponses + 1
        var result = ""
        console.log(parseInt($("#cap").val()))
        if(parseInt($("#cap").val()) == window.cap )
        {
            result = "Bonne réponse ("+window.cap+")"
            window.justes = window.justes + 1
        }
        else
        {
            result = "<b>Mauvaise réponse</b> -->" +window.cap
        }
        result = result + "<br/>" + window.justes+"/"+window.reponses
        $("#reponse").html(result)
    }
    else{
        window.first = false
    }

    //on récupère la taille de la fenêtre
    var width = $(window).width()
    var height = $(window).height()

    var offset = $("#btn").position().top - 100

    //on met la cible au centre de l'écran (sans les boutons)
    var center_top = offset + (height-offset)/2
    var center_left = width/2
    $("#img_acft").css("top", center_top)
    $("#img_acft").css("left",center_left)

    //cap avec le bon pas
    window.cap = Math.random()*360
    window.cap = Math.floor(cap)
    window.cap = cap - (cap%window.pas)
    
    //choix aléatoire de la distance à cible
    var dist_min = Math.min(height-offset,width)/4
    var dist_max = Math.min(height-offset,width)/2-30
    var distance = Math.random()*(dist_max - dist_min) + dist_min

    var left = 0
    var top = 0

    if(window.cap < 91 ){
        //premier cadran
        left = center_left + Math.sin(radians(window.cap))*distance
        top = center_top - Math.cos(radians(window.cap))*distance
    }
    else if(window.cap < 181){
        //deuxieme cadran
        left = center_left + Math.cos(radians(window.cap - 90))*distance
        top = center_top + Math.sin(radians(window.cap - 90))*distance
    }
    else if(window.cap < 271)
    {
        //troisième cadran
        left = center_left - Math.sin(radians(window.cap - 180))*distance
        top = center_top + Math.cos(radians(window.cap - 180))*distance
    }
    else{
        //quatrième cadran
        left = center_left - Math.cos(radians(window.cap - 270))*distance
        top = center_top - Math.sin(radians(window.cap -270))*distance
    }

    //affichage de la croix au bon endroit
    $("#img_target").css("top",top)
    $("#img_target").css("left",left)

    //reset et focus de cap
    $("#cap").val("")
    $("#cap").focus()

    //antiproblème 360 pour nord
    if(window.cap==0)
    {
        window.cap = 360;
    }


}

/*
    FONCTIONS
*/



  function radians(degrees){
    return degrees * Math.PI / 180;
  }