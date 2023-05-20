import * as _ from "lodash";

export function reportTable(tt: string[][]) {
  const flat = _.flatMap(tt);
  return _.reduce(
    flat,
    (prev, curr) => {
      if (!prev[curr]) {
        prev[curr] = 1;
        return prev;
      }

      prev[curr] += 1;
      return prev;
    },
    {} as Record<string, number>
  );
}
