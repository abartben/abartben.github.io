/*
	Coordonnées

	Point N : 40/230
	Point EW : -20/450
	Point WL : 230/110
	Point WD : 310/130
	Point SW : 540/370
	Point DR : 620/220
	Point SA : 400/570
	Pointe de l'aiguille : 
	Nord des îles : 300/570

	Flèche descente : &#8600;
	Fléche montée : &#8599;

*/

//liste des immats VFR (contient des hélicos)
var immat = [ "F-GXOK","F-GUVN","F-GUVQ","F-HAAD","N708AT","F-HNIZ","F-GIJP","F-GFYV","F-GIKS","F-HBCH","F-GNCH","G-EFNH","3AMTY","F-GDDH","OOWIU","GSCOR","F-HCAN"]

//liste des immats Hélicos
var immat_heli = ["F-HELI","F-HNEO","F-HFCO","F-HJTB","F-HJTD","3AMAX","F-HAGK","3AMMC","F-HAHG","F-HLNV","F-GVAH","3AMGU","VPCYS","F-GYLE","F-GGUN","M-PAPA"]

//liste des immats IFR
var immat_ifr = ["MOZ538","NJE-XB","XGO3MD","BKK26Z","MAKAL","PHJFS","MJSTA","XRO946","NJE97H","FHRSC","JFA6JF","3AMSR","N525GC","VTJ98MH","GAC6677","MOUSE"]


$("#fond").on( "click", function() {
  new_position();
});

$(document).keypress(function(e) {
    if(e.which == 13)
 		 {
        new_position();
   	 }
	else
	{
	console.log(e.which);
	}
});

function new_position()
{

	var nombre_cas = 12;

	var cas = rand(1,nombre_cas+1);

	var Ax = 0;
	var Ay = 0;
	var Ar = 0;
	var Aimg = 1;

	var Bx = 0;
	var By = 0;
	var Br = 0;
	var Bimg = 1;

	var labelA = "@" + Frand()+"<br/>"+(9+rand(0,5))+"00-"+(6+rand(0,5));
	var labelB = "@" + Frand()+"<br/>"+(9+rand(0,5))+"00-"+(6+rand(0,5));
	
	//variable debug à décommenter pour tester un seul cas
	//cas = 12;


	if(cas==1)
	{
		//départ Sortie Novembre et traffic sans contact

		Ax = 40+rand(50,150);
		Ay = 230;
		Ar = 20-rand(0,40);
		Aimg = 3;

		Bx = (40-rand(50,100));
		By = 200 + rand(0,60);
		Bimg = rand(3,6);
		Br = rand(0,359);

		
		labelA = "@" + Frand()+"<br/>"+(19+rand(0,6))+ "00&#8599; "+(6+rand(0,6));
		labelB = "<i>sans contact</i><br/>@" + Frand()+"<br/>"+(21+rand(0,5))+"00&#8600; "+(8+rand(0,6));
	}
	else if(cas==2)
	{
		//rattrapage entre deux arrivées à WL
		
		//avion rattrapé plus avancé
		Ax = 230+rand(0,50);
		Ay = 130+rand(0,150);
		Ar = 80+rand(0,10);
		Aimg = 6; //petite vitesse

		Bx = 210+rand(0,20);
		By = 100 + rand(0,40);
		Bimg = 3;
		Br = 75+rand(0,10);
		
	}
	else if(cas==3)
	{
		//croisement SW/DR stable

		//avion sur DR vers SW
		Ax = 580 + rand(0,80);
		Ay = 180 + rand(0,70);
		Ar = 70+rand(0,30);
		Aimg = rand(3,7);

		//avion sur SW vers DR
		Bx = 520+rand(0,40);
		By = 350+rand(0,60);
		Br = 210 + rand(0,50);
		Bimg = 3;
	}
	else if(cas==4)
	{
		//a vue vs SW

		//arrivÃ©e maritime Ã  vue
		Ax = 600+rand(0,80);
		Ay = 260 + rand(0,60);
		Ar = -350 + rand(0,40);
		Aimg = 2;

		//Ã©volution SW
		Bx = 520+rand(0,40);
		By = 350+rand(0,60);
		Br = rand(0,360);
		Bimg = rand(3,7);

		labelA = '<b><span style="color : green">' + IfrRand()+"<br/>"+(18+rand(0,5))+ "00&#8600;"+(6+rand(0,6))+'</span></b>';
		labelB = "@" + Frand()+"<br/>"+(11+rand(0,4))+"00&#8599;"+(6+rand(0,6));
	}
	else if(cas==5)
	{
		//transit Ã  SA
		Ax = 380+rand(0,40);
		Ay = 500+rand(0,90);
		Ar = 90-rand(0,30);
		Aimg = 3;

		//arrivÃ©e SA
		Bx = 400+rand(0,200);
		By = 600;
		Br = 20 - rand(0,40);
		Bimg = 3;
	}
	else if(cas==6)
	{
		//croisement pointe de l'aiguille
		Ax = 300 +rand(0,80);
		Ay = 390 + rand(0,30);
		Ar = 150 + rand(0,30);
		Aimg = 3;

		Bx = 350 +rand(0,180);
		By = 420 + rand(0,30);
		Br = 360 - rand(0,30);
		Bimg = 3;
		
	}
	else if(cas==7)
	{
		//départ N Virage Droite, arrivée WL
		Ax = 250;
		Ay = 260 + rand(0,60);
		Ar = 80 + rand(0,20);
		Aimg = 3;

		Bx = 320 + rand(0,30);
		By = 310 + rand(0,30);
		Br = 360 - rand(0,30);
		Bimg = 3;

		labelA = "@" + Frand()+"<br/>"+(16+rand(0,5))+ "00&#8600;"+(6+rand(0,6));
		labelB = "@" + Frand()+"<br/>"+(13+rand(0,6))+"00&#8599;"+(6+rand(0,6));
		
	}
	else if(cas==8)
	{
		//départ NDI vs arrivée NDI HELI
		Ax = 290 + rand(0,20);
		Ay = 540 + rand(0,50);
		Ar = 270 + rand(0,20);
		Aimg = 3;

		Bx = 280 + rand(0,40);
		By = 430 + rand(0,60);
		Br = 80 + rand(0,20);
		Bimg = 3;

		labelA = "<b>MD</b><br/>@" + HeliRand()+"<br/>"+(4+rand(0,2))+ "00-"+(8+rand(0,4));
		labelB = "@" + HeliRand()+"<br/>"+(4+rand(0,3))+"00-"+(8+rand(0,4));
		
	}
	else if(cas==9)
	{
		///HELI SA vers MD vs attente SV
		Ax = 400 + rand(0,20);
		Ay = 570 + rand(0,50);
		Ar = 320 + rand(0,20);
		Aimg = 3;

		Bx = 340 + rand(0,20);
		By = 510 + rand(0,20);
		Br = rand(0,360);
		Bimg = 4;

		labelA = "<b>MD</b><br/>@" + HeliRand()+"<br/>"+(4+rand(0,2))+ "00-"+(8+rand(0,4));
		labelB = "<b>TL</b><br/>@" + HeliRand()+"<br/>"+(4+rand(0,3))+"00-"+(8+rand(0,4));
		
	}
	else if(cas==9)
	{
		///HELI SA vers MD vs attente SV
		Ax = 400 + rand(0,20);
		Ay = 570 + rand(0,50);
		Ar = 320 + rand(0,20);
		Aimg = 3;

		Bx = 340 + rand(0,20);
		By = 510 + rand(0,20);
		Br = rand(0,360);
		Bimg = 4;

		labelA = "<b>MD</b><br/>@" + HeliRand()+"<br/>"+(4+rand(0,2))+ "00-"+(8+rand(0,4));
		labelB = "<b>TL</b><br/>@" + HeliRand()+"<br/>"+(4+rand(0,3))+"00-"+(8+rand(0,4));
		
	}
	else if(cas==10)
	{
		//croisement DEP N virage G vs longue finale 17
		Ax = 100 + rand(0,90);
		Ay = 390;
		Ar = 165 + rand(0,10);
		Aimg = 3;

		Bx = 190 + rand(0,30);
		By = 430 + rand(0,30);
		Br = 345 + rand(0,10);
		Bimg = 3;

		labelA = "<i>Longue Finale</i><br/>@" + Frand()+"<br/>"+(10+rand(0,5))+ "00&#8600; "+(6+rand(0,6));
		labelB = "<i>Depart N VG</i><br/>@" + Frand()+"<br/>"+(9+rand(0,6))+"00&#8599; "+(6+rand(0,6));
		
	}
	else if(cas==11)
	{
		//N vers LF17 vs arrivée EW
		Ax = 40 + rand(0,60);
		Ay = 230 + rand(0,80);
		Ar = 140 + rand(0,15);
		Aimg = 3;

		Bx = -25 + rand(0,60);
		By = 380 + rand(0,80);
		Br = 240 + rand(0,20);
		Bimg = 3;

		labelA = "@" + Frand()+"<br/>"+(19+rand(0,6))+ "00&#8600; "+(6+rand(0,6));
		labelB = "<i>Arrivee EW</i><br/>@" + Frand()+"<br/>"+(21+rand(0,5))+"00&#8600; "+(8+rand(0,6));
		
	}
	else if(cas==12)
	{
		//croisement SW/DR montée vs descente

		//avion sur DR vers SW en descente
		Ax = 580 + rand(0,80);
		Ay = 180 + rand(0,70);
		Ar = 70+rand(0,30);
		Aimg = rand(3,7);

		//avion sur SW vers DR en montée
		Bx = 520+rand(0,40);
		By = 350+rand(0,60);
		Br = 210 + rand(0,50);
		Bimg = 3;
		
		//base et écart différent pour varier les infos
		var base = 10 + rand(0,8); //altitude de base entre 1000 et 1800ft 
		var ecart = rand(1,4); //écart entre 0 et 200ft
		
		labelA = "@" + Frand()+"<br/>"+(base + ecart)+ "00&#8599; "+(6+rand(0,6));
		labelB = "@" + Frand()+"<br/>"+(base)+"00&#8600; "+(8+rand(0,6));
	}

	alert("gisement : " + (angle(Ax,Ay,Bx,By)+Br))
	
	$("#avionA").css("top",Ax);
	$("#avionA").css("left",Ay);
	$("#avionA").attr("src","https://11.ip-176-31-188.eu/infotrafix/comete"+Aimg+".png");
	$("#avionA").css("transform","rotate("+Ar+"deg)");

	$("#barreA").css("top",Ax+20);
	$("#barreA").css("left",Ay+50);

	$("#labelA").css("top",Ax+20);
	$("#labelA").css("left",Ay+100);
	$("#labelA").html(labelA);

	$("#avionB").css("top",Bx);
	$("#avionB").css("left",By);
	$("#avionB").attr("src","https://11.ip-176-31-188.eu/infotrafix/comete"+Bimg+".png");
	$("#avionB").css("transform","rotate("+Br+"deg)");

	$("#barreB").css("top",Bx+20);
	$("#barreB").css("left",By+50);

	$("#labelB").css("top",Bx+20);
	$("#labelB").css("left",By+100);
	$("#labelB").html(labelB);

	$("#nm").html(dist(Ax,Ay,Bx,By) + " ");
}

function rand_text(possible,nb)
{
	var text = "";
    //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for( var i=0; i < nb; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/*function Frand()
{
	return("F"+rand_text("BCDEFGH",1)+rand_text("ABCDEFGHIJKLMNOPQRSTUVWXYZ",3));
}*/

function Frand()
{
	//génère automatiquement une immat d'avion
	return( immat[Math.floor( Math.random() * 15) ] );
}

function HeliRand()
{
	//génère automatiquement une immat hélico
	return( immat_heli[Math.floor( Math.random() * 16) ] );
}

function IfrRand()
{
	//génère automatiquement une immat IFR
	return( immat_ifr[Math.floor( Math.random() * 16) ] );
}

function dist(xa,ya,xb,yb)
{
	//donne la distance en Nautiques entre 2 points
	var distance = Math.sqrt((xb-xa)*(xb-xa) + (yb-ya)*(yb-ya))/170*4
	distance = distance*10;
	distance = Math.round(distance);
	distance = distance/10;
	return(distance);
}

function angle(xa,ya,xb,yb)
{
	//retourne le cap pour aller d'un point A vers un point B
	var angle = Math.atan((yb-ya)/(xb - xa))
	angle = -angle*180/Math.PI;
	
	return(angle)
}

function rand(a,b)
{
	return(Math.floor((Math.random()*(b-a))+a));
}
