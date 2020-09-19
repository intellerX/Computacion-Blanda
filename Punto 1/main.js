 
 var board = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,0,0,0,0]
 ];
 var actualPoint = [4,0]
 // Box config
 var bw = 300;
 var bh = 300;
 var p = 0;
 var t = 60;
 var xp = 32;
 var yp =275;
 
 var canvas = document.getElementById("canvas");
 var context = canvas.getContext("2d");

 // Simbols
 var F = ["U", "D", "L", "R"];
 var poblation = [];
 var poblationSize = 5;
 var epocas = 3;


 var size = 25;
 var totalString = "";
 var points = 1;
 var winner = "";
 var winner2 = -1;

 var totalPoints = 0;
 poblationSize -= 1;

 // Random String (Cromosoma)
 function CreateChromosome(){
    totalString = "";

    for (var x = 0; x <= size; x++){
        totalString = totalString.concat( F[Math.floor(Math.random() * 4)]);
    }
    return totalString;
 }

 function drawBoard(){
     for (var x = 0; x <= bw; x += t) {
         context.moveTo(0.5 + x + p, p);
         context.lineTo(0.5 + x + p, bh + p);
     }
 
     for (var x = 0; x <= bh; x += t) {
         context.moveTo(p, 0.5 + x + p);
         context.lineTo(bw + p, 0.5 + x + p);
     }
     context.strokeStyle = "black";
     context.stroke();
 }
 drawBoard();

 function up(){
    context.moveTo(xp, yp);
    if(yp > 35 )
        {
            yp -= 60;
        }
    context.lineTo(xp, yp);
    context.strokeStyle = "black";
    context.stroke();
 }

 function down(){
    context.moveTo(xp, yp);
    if(yp < 275 )
        {
            yp += 60;
        }
    context.lineTo(xp, yp);
    context.strokeStyle = "black";
    context.stroke();
 }

 function left(){
    context.moveTo(xp, yp);
    if(xp > 32 )
        {
            xp -= 60;
        }
    context.lineTo(xp, yp);
    context.strokeStyle = "black";
    context.stroke();
 }

 function right(){
    context.moveTo(xp, yp);
    if(xp < 215 )
        {
            xp += 60;
        }
    context.lineTo(xp, yp);
    context.strokeStyle = "black";
    context.stroke();
 }

function MoveInBoard(chromosome){
    var top = chromosome.length;
    for (var x = 0; x <= top ; x++) {
        if(chromosome.charAt(x) == "U")
            up();
        if(chromosome.charAt(x) == "D")
            down();
        if(chromosome.charAt(x) == "L")
            left();
        if(chromosome.charAt(x) == "R")
            right();
    }    
}

function getPoints(chromosome) {
    setDefaultBoard();
    var result = 1;
    for (var x = 0; x <= chromosome.length; x++) {
        if(chromosome.charAt(x) == "U" && actualPoint[0] > 0)
        {
            actualPoint[0] -=  1;
            if (board[actualPoint[0]][actualPoint[1]] == 0) {
                board[actualPoint[0]][actualPoint[1]] = 1;
                result += 1;
            }
        }
        if(chromosome.charAt(x) == "D" && actualPoint[0] < 4)
        {
            actualPoint[0] +=  1;
            if (board[actualPoint[0]][actualPoint[1]] == 0) {
                board[actualPoint[0]][actualPoint[1]] = 1;
                result += 1;
            }
        }   
        if(chromosome.charAt(x) == "L" && actualPoint[1] > 0)
        {
            actualPoint[1] -=  1;
            if (board[actualPoint[0]][actualPoint[1]] == 0) {
                board[actualPoint[0]][actualPoint[1]] = 1;
                result += 1;
            }
        }
        if(chromosome.charAt(x) == "R" && actualPoint[1] < 4)
        {
            actualPoint[1] +=  1;
            if (board[actualPoint[0]][actualPoint[1]] == 0) {
                board[actualPoint[0]][actualPoint[1]] = 1;
                result += 1;
            }
        }
    }
    return result;
}

function ShowPoints(chromosome){
    points = 1;
    for (var x = 0; x <= chromosome.length; x++) {
        if(chromosome.charAt(x) == "U" && actualPoint[0] > 0)
        {
            actualPoint[0] -=  1;
            if (board[actualPoint[0]][actualPoint[1]] == 0) {
                board[actualPoint[0]][actualPoint[1]] = 1;
                points += 1;
            }
        }
        if(chromosome.charAt(x) == "D" && actualPoint[0] < 4)
        {
            actualPoint[0] +=  1;
            if (board[actualPoint[0]][actualPoint[1]] == 0) {
                board[actualPoint[0]][actualPoint[1]] = 1;
                points += 1;
            }
        }   
        if(chromosome.charAt(x) == "L" && actualPoint[1] > 0)
        {
            actualPoint[1] -=  1;
            if (board[actualPoint[0]][actualPoint[1]] == 0) {
                board[actualPoint[0]][actualPoint[1]] = 1;
                points += 1;
            }
        }
        if(chromosome.charAt(x) == "R" && actualPoint[1] < 4)
        {
            actualPoint[1] +=  1;
            if (board[actualPoint[0]][actualPoint[1]] == 0) {
                board[actualPoint[0]][actualPoint[1]] = 1;
                points += 1;
            }
        }
        
    }
    document.write("<br/> <h3>Puntuación total: " + points + "</h3><br/>");
    document.write(board[0] + "<br/>");
    document.write(board[1] + "<br/>");
    document.write(board[2] + "<br/>");
    document.write(board[3] + "<br/>");
    document.write(board[4] + "<br/><br/>");

    document.write("Punto final: " + actualPoint[0] + " , " + actualPoint[1] + "<br/>");
    return points;
}

function createPoblation(){
    for (var x = 0; x <= poblationSize; x++) {
        CreateChromosome();
        document.write("<br/>" + totalString + "<br/>");
        poblation.push(totalString);
    }
}

function MixMutateChromosomes(a,b){
    var newChromosome1 = "",newChromosome2 = "";
    newChromosome1 = newChromosome1.concat(a.substr(0,14) , b.substr(14,24));
    newChromosome2 = newChromosome2.concat(b.substr(14,24) , a.substr(0,14));

    var firstGen = newChromosome1.charAt(0);
    var secondGen = newChromosome2.charAt(24);

    winner = "";
    winner2 = "";

    winner = winner.concat(secondGen , newChromosome2.substr(1,24));
    winner2 = winner2.concat( newChromosome1.substr(0,23) , firstGen);

    //window.alert("Segundo ganador: " + winner);

    poblation[0] = winner;
    poblation[1] = winner2;
    
    for (let y = 2; y < poblationSize; y++){
        poblation[y] = CreateChromosome();       
    }

    return winner;

}
function setDefaultBoard(){
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    board = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [1,0,0,0,0]
    ];
    actualPoint = [4,0]
}

function roulette(){
    
    for (let i = 1; i < epocas + 1; i++) {
        
        document.write("<br/> <h1>Población "+(i)+"</h1>");
        for (var x = 0; x <= poblationSize ; x++){
            setDefaultBoard();
            ShowPoints(poblation[x]);
            if (totalPoints < points) {
                var otherWinner = Math.floor(Math.random() * 4);
                if (otherWinner == x) {
                    otherWinner = Math.floor(Math.random() * 4);
                }
                totalPoints = points;
                winner = poblation[x];
                winner2 = poblation[otherWinner];
                points = 1;
            }
        }   
        // window.alert("Segundo ganador: " + winner2);
        winner = MixMutateChromosomes(winner,winner2);
        // window.alert("Ganador: " + winner);
        setDefaultBoard();
        MoveInBoard(winner);
        
    }

    


    document.write("Mejor puntuación: " + totalPoints + ", Individuo ganador: " + winner);
    

}

createPoblation();
roulette();


        
