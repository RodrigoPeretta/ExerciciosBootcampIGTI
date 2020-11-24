window.addEventListener("load", function(event) {
  main()
});

var unit = ['zero', 'um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
var special = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove']
var dozens = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
var hundreds = ['cem', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos']

function main(){
  var inputRange = document.querySelector('#inputRange');
  var inputNumber = document.querySelector('#inputNumber');
  var inputNumberExtent = document.querySelector('#inputNumberExtent');
  
  inputRange.addEventListener('change', showNumber);

  function showNumber(event) {
    var currentNumber = event.target.value
    inputNumber.value = currentNumber;

    writeNumber(currentNumber);
  }

  function writeNumber(currentNumber){
    console.log(currentNumber.length)
    switch (currentNumber.length){
      case 1:
        inputNumberExtent.value = Unit(currentNumber);
        break;
      case 2:
        inputNumberExtent.value = Dozens(currentNumber);
        break;
      case 3:
        inputNumberExtent.value = Hundreds(currentNumber);
        break;
      default:
        break;
    } 
  }

  function Unit(currentNumber) {
    return unit[currentNumber];
  }

  function Dozens(currentNumber) {
    var numbers = splitNumbers(currentNumber);
    var firstNumber = numbers[0];
    var secondNumber = numbers[1];

    if(currentNumber >= 20) {
      if(secondNumber == 0)
        return dozens[firstNumber];
      else
        return `${dozens[firstNumber]} e ${Unit(secondNumber)}`;
    } else {
      return special[secondNumber];
    }
  }

  function Hundreds(currentNumber) {
    var numbers = splitNumbers(currentNumber)
    var firstNumber = numbers[0];
    var secondNumber = numbers[1];
    var thirdNumber = numbers[2];

    if(currentNumber == 100) {
      return hundreds[0];
    }
    else if(secondNumber == 0){
      return `${hundreds[firstNumber]} e ${Unit(thirdNumber)}`;
    } else {
      return `${hundreds[firstNumber]} e ${Dozens(secondNumber + thirdNumber)}`;
    }
  }

  function splitNumbers(currentNumber){
    return currentNumber.split('')
  }
}
