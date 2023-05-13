const days = 6;
const total = 5;

let used = 0;
let slots = 6;

let minGap = 8;

const table: string[][] = [];
let gap = 7;
for (let i = 0; i < days; i++) {
  const day: string[] = [];
  let probability = 0;
  for (let j = 0; j < slots; j++) {
    probability = (total - used) / (days - i);
    console.log(probability);
    if (probability > 0.9 && gap > minGap) {
      gap = 0;
      used++;
      day.push("YES");
      continue;
    }
    gap++;
    day.push("NO");
  }

  table.push(day);
}

console.table(table);
