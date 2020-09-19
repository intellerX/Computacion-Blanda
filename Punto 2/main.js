// Simbols
 var poblation = ["NaObaacOAbbcca", "AaNcbbaNcOaacc", "OONcbbbNcbcbca", "ANNcaacNcObaab" , "AbObcbOAacaac"];
 // ["A", "O", "N" , "a", "b", "c"];
 var a=0,b=0,c=0 , y=0;

 var board = [
    [0,0,0],
    [0,0,1],
    [0,1,0],
    [0,1,1],
    [1,0,0],
    [1,0,1],
    [1,1,0],
    [1,1,1]
 ];


 var poblationSize = 5;
 poblationSize -= 1;

 var size = 14;
 var totalPoints = 0;

 function divideChromosome(chromosome,n){
    var a = chromosome.substr(0,6);
    var b = chromosome.substr(7,12);
    if (n == 1) {
        return a;         
    }
    else
        return b;
 }

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

 function or (a,b){
    if (a == 1 || b == 1) {
        return 1;
    }
    else
        return 0;    
 }

 function and (a,b){
    if (a == 1 && b == 1) {
        return 1;
    }
    else
        return 0;    
 }

 // Na O 1 1 a c O A11 1 11

 function getPoints (chromosome){
    points = 0
    for (let i = 0; i < chromosome.length; i++) {

        if(is2Operator( chromosome.charAt(i) )){

            if (is2Operator(chromosome.charAt(i+1))) {
                return points;
            }
            if (isOperator(chromosome.charAt(i+1))){
                if (isSymbol(chromosome.charAt(i+2) )) {
                    return points;
                }

            }
            if (isSymbol(chromosome.charAt(i+1))) {
                if (isSymbol(chromosome.charAt(i+2))) {
                    re
                }
            }
        }
        
    }
 }

 

 function isMay (a , b , c){
    if( (a + b + c) > 2 )
        return true;
    else
        return false;
 }

        
