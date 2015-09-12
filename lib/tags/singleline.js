
/**
 * template tag. allows you to write
 * a string out on multiple lines
 * and it will reduce it to a one-line
 * string by normalizing newlines to spaces
 * and removing unecessary indentation
 * @param  {Array} lits    template literals
 * @param  {Arguments} ...subs template interpolated variables
 * @return {String}         the single-line normalized string
 */
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
