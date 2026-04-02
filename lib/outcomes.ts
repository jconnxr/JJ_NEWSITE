export type OutcomeStat = {
  label: string;
  value: string;
};

/** Edit values to match what you can truthfully claim. */
export const outcomeStats: OutcomeStat[] = [
  { value: "12+", label: "Sites & systems shipped" },
  { value: "<1 wk", label: "Typical install" },
  { value: "100%", label: "Oklahoma-based team" },
  { value: "1 biz day", label: "Typical first reply" },
];
