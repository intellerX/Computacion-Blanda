// Simbols
var poblation = ["AbObcbcOAacaac", "AaNcbbaNcOaacc", "AbObcbcOAacaac", "ANNcaacNcObaab" , "AbObcbOAacaac"];
// ["A", "O", "N" , "a", "b", "c"];
var a=0,b=0,c=0 , y=0;

var board = [
    [0,0,0,0],
    [0,0,1,0],
    [0,1,0,0],
    [0,1,1,1],
    [1,0,0,0],
    [1,0,1,1],
    [1,1,0,1],
    [1,1,1,1]
];
/*
var svg = d3.select("body").append("svg")
            .attr("width",600).attr("height",600)
            .append("g").attr("transform", "translate(50,50)");

var data = [{"child": "John",  "parent": ""},
            {"child": "Aaron", "parent": "Kevin"},
            {"child": "Kevin", "parent": "John"},
            {"child": "Hannah","parent": "Ann"},
            {"child": "Rose",  "parent": "Sarah"},
            {"child": "Ann",   "parent": "John"},
            {"child": "Sarah", "parent": "Kevin"},
            {"child": "Mark",  "parent": "Ann"},
            {"child": "Angel", "parent": "Sarah"},
            {"child": "Andy", "parent": "Hannah"},
            {"child": "Carl", "parent": "Hannah"},
           ];

var dataStructure = d3.stratify()
                        .id(function(d){return d.child;})
                        .parentId(function(d){return d.parent;})
                        (data);
var treeStructure = d3.tree().size([500,300]);
var information = treeStructure(dataStructure);

var circles = svg.append("g").selectAll("circle")
                .data(information.descendants());

circles.enter().append("circle")
           .attr("cx", function(d) { return d.x;})
           .attr("cy", function(d) { return d.y;})
           .attr("r", 5);

var connections = svg.append("g").selectAll("path")
                    .data(information.links());

connections.enter().append("path")
           .attr("d",function(d) {
                return "M" + d.source.x + "," + d.source.y + " C " +
                d.source.x + "," + (d.source.y+ d.target.y)/2 + " " +
                d.target.x + "," + (d.source.y+ d.target.y)/2 + " " +
                d.target.x + "," + (d.target.y) + " "
            });
*/
var poblationSize = 5;
poblationSize -= 1;

var size = 14;
var points = 0;
var totalPoints = 0;
var winner = "";



function is2Operator(a){
    if(a == "A" || a == "O")
        return true;
    else
        return false;    
 }

 function isOperator(a){
    if(a == "N")
        return true;
    else
        return false;
 }

 function isSymbol(a){
    if(a == "a" || a == "b" || a == "c")
        return true;
    else
        return false;    
 }

function operateVector(vector){
    for (let i = vector.length; i >=0; i--) {
        
        if (vector[i] == "A") {
            // Case OA
            if (is2Operator(vector[i-1] ) || i == 0) {
                vector[i] = (vector[i+1] && vector[i+2]);
            }
            else
            {
                vector[i] = (vector[i+2] && vector[i+3]);
            }
                        
        } 
        if (vector[i] == "O") {
            //Case AO
            if (is2Operator(vector[i-1]) || i == 0 ) {
                vector[i] = (vector[i+1] || vector[i+2]);
            }
            else
            {
                vector[i] = (vector[i+2] || vector[i+3]);
            }            
        }
        //Case N-b
        //Case ONc-bbba
        //Case OONcb-bb 
        if (vector[i] == "N") {
            if (is2Operator(vector[i-1]) || i == 0 )
            {
                if (is2Operator(vector[i-2])  )
                {                        
                    if (vector[i+3] == "1") {
                        vector[i] = "0";
                    }
                    if (vector[i+3] == "0") {
                        vector[i] = "1";
                    }
                }
                else
                {
                    if (vector[i+2] == "1") {
                        vector[i] = "0";
                    }
                    if (vector[i+2] == "0") {
                        vector[i] = "1";
                    }
                }    
            }
            else{
                if (vector[i+1] == "1") {
                    vector[i] = "0";
                }
                if (vector[i+1] == "0") {
                    vector[i] = "1";
                }
            }

            if (vector[i+1] == "1") {
                vector[i] = "0";
            }
            if (vector[i+1] == "0") {
                vector[i] = "1";
            }
        }        
    }
    return vector;
}

function getResult(vector , vector2 , muestra){

    vector = operateVector(vector);
    vector2 = operateVector(vector2);

    var resultV1 = vector[0];
    var resultV2 = vector2[0];


    if(resultV1 == 1  || resultV2 == 1)
        total = 1;
    else
        total = 0;
    


    if (muestra) {
        document.write("<br/> <h2>Vector "+vector+ "//" +vector2 +"</h2> <br/>");
        document.write("Re1: " + resultV1 + " Re2: " + resultV2 + " total: " + total +"<br/>");

    }



    return (total);
}

function transformChromosome(chromosome, a , b , c){
    var vector = chromosome.split('');
    for(var i = 0; i < chromosome.length; i++){
        if(vector[i] == "a")
            vector[i] = a;
        if(vector[i] == "b")
            vector[i] = b;
        if(vector[i] == "c")
            vector[i] = c;
    }
    return vector;
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function mutation(chromosome){

    var chromo = chromosome.substr(0,3);
    var some = chromosome.substr(9,14);
   
    var emos = reverseString(some);   

    var union = "";
    //window.alert("emos: " +emos + " some " + some );
    union = union.concat(chromo + emos);
    return (union); 

}

function crossMutateChromosome(poblation){

    var r = Math.floor(Math.random() * 5);
    var ca = poblation[r];
    var r2 = Math.floor(Math.random() * 5);
    var cb = poblation[r2];

    while (r == r2) {
        r2 = Math.floor(Math.random() * 5);
    } 
    var cb = poblation[r2];

    var newChromosome1 = ca.substr(0,3) + cb.substr(4,13);
    var newChromosome2 = cb.substr(0,3) + ca.substr(4,13);

    document.write("<br/>  Nuevos cromosomas " +newChromosome1 + " " +newChromosome2 + "<br/> <br/>");

    newChromosome1 = mutation(newChromosome1);
    newChromosome2 = mutation(newChromosome2);

    
    document.write("<br/> Resultado de la mutación: " + newChromosome1+ " "+newChromosome2);        



}

function getPoints(chromosome){

    var a = chromosome.substr(0,7);
    var b = chromosome.substr(7,12);

    points = 0;
    for (let y = 0; y < 8; y++) {            

        var ca = transformChromosome(a,board[y][0],board[y][1],board[y][2]);
        var cb = transformChromosome(b,board[y][0],board[y][1],board[y][2]);
        getResult(ca,cb)
        document.write(" Y = " + board[y][3] + " Operación :" + getResult(ca,cb) + " a: " + board[y][0] + " b: "+ board[y][1] + " c: " + board[y][2]);
        
        if (getResult(ca,cb) == board[y][3]) {
            //document.write("1")
            points += 1;
        }           
    }
    return points;

}

function main() {
    document.write("<br/> <h3> <div> Poblaciones: <br/> ");
    for (let y = 0; y < poblationSize; y++) {
        document.write((y+1) + ") " + poblation[y] + "<br/><br/>");
        
    }
    document.write("</div> <h3> _______________________________________________ </h3>");


    for (let i = 0; i < poblationSize ; i++) {

        document.write("<br/> <h3> Gen "+poblation[i]+ "</h3>");
        document.write(" <h3> _______________________________________________ </h3> <div>");


        var a = poblation[i].substr(0,7);
        var b = poblation[i].substr(7,12);

        if (totalPoints < points) {
            totalPoints = points;
            winner = poblation[x];
            points = 0;

        }

        
        for (let y = 0; y < 8; y++) {            

            var ca = transformChromosome(a,board[y][0],board[y][1],board[y][2]);
            var cb = transformChromosome(b,board[y][0],board[y][1],board[y][2]);
            getResult(ca,cb,1)
            document.write(" Y = " + board[y][3] + " Operación :" + getResult(ca,cb) + " a: " + board[y][0] + " b: "+ board[y][1] + " c: " + board[y][2]);
            
            if (getResult(ca,cb) == board[y][3]) {
                //document.write("1")
                points += 1;
            }           
        }
        document.write("<br/> <h3> Puntuacion:  " +points +"</h3>");
        points = 0;
        document.write(" <h3> </div>_______________________________________________ </h3>");

        
    }

    crossMutateChromosome(poblation);
}

main();

//OONcbbb // Ncbcbca
//0 0 1 0
//O ON 1000 // 0101000