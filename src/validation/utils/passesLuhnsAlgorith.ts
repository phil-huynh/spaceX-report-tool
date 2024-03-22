export default function passesLuhnAlgorithm (numArray: Array<string>) {

  let total: number = 0;

  for(let i = numArray.length - 2; i >= 0; i -= 2){
    const numString: string = (Number(numArray[i]) * 2).toString();
    total += numString.length === 2 ? (Number(numString[0]) + Number(numString[1])) : Number(numString);
    numArray.splice(i, 1);
  }
  total += numArray.reduce((acc, numString) => acc + Number(numString), 0);

  return total % 10 === 0 ? true : false;
}