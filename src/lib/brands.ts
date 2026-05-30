export type Brand = {
  id: number;
  name: string;
  label: string;
  image: string;
};

export const brands: readonly Brand[] = [
  { id: 1, name: "Brand #1", label: "Web build", image: "/placeholders/1.png" },
  { id: 2, name: "Brand #2", label: "Landing page", image: "/placeholders/2.png" },
  { id: 3, name: "Brand #3", label: "Brand site", image: "/placeholders/3.png" },
  { id: 4, name: "Brand #4", label: "Portfolio", image: "/placeholders/4.png" },
  { id: 5, name: "Brand #5", label: "App UI", image: "/placeholders/5.png" },
  { id: 6, name: "Brand #6", label: "Marketing", image: "/placeholders/6.png" },
] as const;
