function isFigureNumerical(inputText){
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    i = 0;
    while(inputText[i] != null){
        if (
            inputText[i] != numbers[0] &&
            inputText[i] != numbers[1] &&
            inputText[i] != numbers[2] &&
            inputText[i] != numbers[3] &&
            inputText[i] != numbers[4] &&
            inputText[i] != numbers[5] &&
            inputText[i] != numbers[6] &&
            inputText[i] != numbers[7] &&
            inputText[i] != numbers[8] &&
            inputText[i] != numbers[9] &&
            inputText[i] != numbers[10]
        ){
            return false;
        }
        i++;
    }
    return true;
}

function isFigureDecimal(inputText){
    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    i = 0;
    while(inputText[i] != null){
        if (
            inputText[i] != numbers[0] &&
            inputText[i] != numbers[1] &&
            inputText[i] != numbers[2] &&
            inputText[i] != numbers[3] &&
            inputText[i] != numbers[4] &&
            inputText[i] != numbers[5] &&
            inputText[i] != numbers[6] &&
            inputText[i] != numbers[7] &&
            inputText[i] != numbers[8] &&
            inputText[i] != numbers[9] &&
            inputText[i] != numbers[10]
        ){
            return false;
        }
        i++;
    }
    return true;
}

export {isFigureNumerical, isFigureDecimal};