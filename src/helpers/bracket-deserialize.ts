export default function deserialize(str: string): any {
  const escapableChars = [ ' ', '(', ')' ];
  const escapeChar = '\\';
  if(!str) return [];

  let i = 0;
  function main() : any[] {
    const arr = [];
    let startIndex = i;
    function addWord() {
      if (i-1 > startIndex) {
        const end = (i === str.length && !['(', ')'].includes(str[i-1])) ? i : i-1;

        let word = str.slice(startIndex, end);
        escapableChars.forEach(c => word = word.replace(`${escapeChar}${c}`, c));
        arr.push(word);
      }
    }
    let escaped = false;
    while (i < str.length) {
      if (i > 0 && str[i - 1] === escapeChar) {
        escaped = true;
      }
      else escaped = false;

      switch(str[i++]) {
        case "|":
          if(!escaped) {
            let isOr = false;
            if(i < str.length) { // check if this is not the last character
              isOr = str.slice(i-1, i+1) === '||';
            }
            addWord();
            if (isOr) {
              i++;
              arr.push('||');
            } else {
              arr.push('|');
            }

            startIndex = i;
          }
          continue;
        case "(":
          if(!escaped) {
            addWord();
            arr.push(main());
            startIndex = i;
          }
          continue;
        case ")":
          if(!escaped) {
            addWord();
            return arr;
          }else {
            continue;
          }
      }
    }
    addWord();
    return arr;
  }
  return main();
}