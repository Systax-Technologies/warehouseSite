export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const statuses = [
  "In Stock",
  "Sold",
  "Active",
  "Damaged",
  "Removed"
]