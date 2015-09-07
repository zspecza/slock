export default function singleLine(lits, ...subs) {
  let result = "";
  // run the loop only for the substitution count
  for (let i = 0; i < subs.length; i++) {
    result += lits[i];
    result += subs[i];
  }
  // add the last literal
  result += lits[lits.length - 1];
  return result.replace(/(?:\s+)/g, ' ');
};
