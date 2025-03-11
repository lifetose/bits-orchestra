import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

export const formatDate = (
  date: string | Date,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone,
) => {
  const zonedDate = toZonedTime(new Date(date), timeZone);
  return format(zonedDate, "d MMM yyyy, h:mm a");
};
