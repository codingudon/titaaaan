const priority = [
  "ryuusei",
  "peach",
  "snaps",
  "udon",
  "ellie",
  "jin",
  "anny",
  "rin",
];

export const members = priority.map((p, index) => ({
  name: p,
  priority: index,
  avatar: `/avatars/${p}.png`,
}));

export type Member = typeof members[number];

const genThreeRandomNumbers = (
  max: number,
  numbers = new Set<number>()
): number[] => {
  if (numbers.size === 3) {
    return Array.from(numbers);
  }

  const random = Math.floor(Math.random() * max);
  if (numbers.has(random)) {
    return genThreeRandomNumbers(max, numbers);
  }

  return genThreeRandomNumbers(max, numbers.add(random));
};

export const generateThreeRandomMembers = () => {
  const n = genThreeRandomNumbers(members.length);
  const randomMembers = n.map((n) => members[n]);

  return {
    random: randomMembers,
    order: [...randomMembers].sort((a, b) => a.priority - b.priority),
  };
};
