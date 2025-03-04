export function fknPayme(due: string, daysDeadline = 60) {
  const dueDate = new Date(due);
  const currentDate = new Date();

  const days = Math.floor(
    (dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const opacity = days > 0 ? 1 : Math.max(0, 1 - Math.abs(days) / daysDeadline);

  return opacity;
}
