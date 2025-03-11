import { format } from "date-fns";

export const formatDate = (date: string | Date) => {
  return format(new Date(date), "d MMMM yyyy, h:mma");
};
