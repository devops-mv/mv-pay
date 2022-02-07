
export default function bracketResolver(value: string) {
  const result = '';
  const stack = [];
  const last = 0;
  let bracket = 0;
  let bracketType = '';

// todo: use for-of loop
  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    if (char === '(') {
      bracket++;
      bracketType = '(';
    }
  }
}