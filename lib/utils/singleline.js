export default function singleLine(lits, ...subs) {
  return subs
    .map((s, i) => lits[i] + s)
    .reduce((a, b) => a + b) + lits[lits.length - 1]
    .replace(/(?:\s+)/g, ' ')
};
