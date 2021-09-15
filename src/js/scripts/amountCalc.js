const Unit = {
    GRAM: 'g',
    KILOGRAM:'kg',
    MILLILITER: 'ml',
    LITER:'l',
    OUNCE:'oz',
    POUND:'lb',
    CUP:'cup'
}
const symbols = {
    LETTER:'letter', 
    NUMBER:'number',
    SPACE:'space', 
    UNKNOWN: 'na'
}
let units = new Map([
    ['gram',Unit.GRAM],  ['g', Unit.GRAM], 
    ['kilogram', Unit.KILOGRAM], ['kg', Unit.KILOGRAM],
    ['milliliter', Unit.MILLILITER],['ml', Unit.MILLILITER],
    ['liter', Unit.LITER], ['l', Unit.LITER], 
    ['ounce', Unit.OUNCE], ['oz', Unit.OUNCE], 
    ['pound', Unit.POUND], ['lb', Unit.POUND], 
    ['cup', Unit.CUP],
]);
let characters = new Map();

let alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
let numbers = ['0','1','2','3','4','5','6','7','8','9']


for(let i=0;i<alphabet.length;i++){
    characters.set(alphabet[i],symbols.LETTER);
    characters.set(alphabet[i].toUpperCase(),symbols.LETTER);
};
for(let i=0;i<numbers.length;i++){
    characters.set(numbers[i],symbols.NUMBER);
};
characters.set(' ', symbols.SPACE);



let currentPointer = 0;
let currentString = "";
let currentToken = ""; 
let wordTokens = []; 
let numberTokens = [];
let unitsTokens = [];

export function processString(input){
    if(input.length>0){
    wordTokens = []; 
    numberTokens = [];
    unitsTokens=[];
    currentString = input;
    
    currentPointer = 0;
    let char = getCurrent();
    nextChar(char);
    if(unitsTokens.length > 1 || numberTokens.length !== 1){
        return {text:currentString,quantity:"",unit:""};
    }
    else{
        let finalString = "";
        for(let i=0;i<wordTokens.length;i++){
            finalString += wordTokens[i][1]+" ";
        }
        if(unitsTokens.length === 0 ){
            if(numberTokens.length === 0){
                return {text:finalString,quantity:"",unit:""};
            }
            return {text:finalString,quantity:numberTokens[0][1],unit:""};
        }
        return {text:finalString,quantity:numberTokens[0][1],unit:unitsTokens[0][0]};
        
    }}
    else{
        return {text:"",quantity:"",unit:""};
    }
}


function nextChar(char){
    
    currentToken += char;
    if(currentPointer === (currentString.length-1)){
        endToken(char);     
    }
    else{
        let next = getNext();
        if(!(getCharType(char) === getCharType(next))){
            endToken(char);
        }
        advance();
        nextChar(next);
    }
    
}
function endToken(char){
    let token; 
    switch(getCharType(char)){
        case symbols.LETTER: 
            if(units.has(currentToken)){
                token = [units.get(currentToken),currentToken];
                unitsTokens.push(token);   
            }
            else{
                token = ['text',currentToken];
                wordTokens.push(token);   
            }
            

            break;
        case symbols.NUMBER:
            token = ['number', currentToken];
            numberTokens.push(token);  

            break;
        default: 
            break;
    }
     
    currentToken = "";
}

function getCharType(char){
    if(characters.has(char)){
        return characters.get(char);
    }
    return  symbols.UNKNOWN;
    
}
function getCurrent(){
    return currentString.charAt(currentPointer);
}
function getNext(){
    return currentString.charAt(currentPointer + 1);
}

function advance(){
    currentPointer ++;
}