function dateMoment(date: Date) {
  const currentDate = new Date();
  const inputDate = new Date(date);

  const diffInMilliseconds: number = currentDate.getTime() - inputDate.getTime();
  const diffInSeconds: number = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes: number = Math.floor(diffInSeconds / 60);
  const diffInHours: number = Math.floor(diffInMinutes / 60);
  const diffInDays: number = Math.floor(diffInHours / 24);
  const diffInWeeks: number = Math.floor(diffInDays / 7);
  const diffInMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const diffInYears: number = Math.floor(diffInDays / 365);

  return { inputDate, diffInSeconds, diffInMinutes, diffInHours, diffInDays, diffInWeeks, diffInMonths, diffInYears };
}

export function postMoment(date: Date) {
  const { diffInDays, diffInHours, diffInMinutes, diffInMonths, diffInSeconds, diffInWeeks, diffInYears, inputDate } = dateMoment(date);

  if (diffInSeconds < 60) return `${diffInSeconds > 1 ? `${diffInSeconds} seconds` : "a second"} ago`;
  if (diffInMinutes < 60) return `${diffInMinutes > 1 ? `${diffInMinutes} minutes` : "a minute"} ago`;
  if (diffInHours < 24) return `${diffInHours > 1 ? `${diffInHours} hours` : "a hour"} ago`;
  if (diffInDays < 7) return `${diffInDays > 1 ? `${diffInDays} days` : "a day"} ago`;
  if (diffInDays > 7) return `${diffInWeeks > 1 ? `${inputDate.getDay()} ${diffInMonths[inputDate.getMonth()]}` : "a week"} ago`;
  if (diffInYears < 1) return "a year ago";
  return `${inputDate.getDay()} ${diffInMonths[inputDate.getMonth()]} ${inputDate.getFullYear()}`;
}

export function commentMoment(date: Date) {
  const { diffInDays, diffInHours, diffInMinutes, diffInSeconds, diffInWeeks, diffInYears } = dateMoment(date);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInHours < 24) return `${diffInHours}h`;
  if (diffInDays < 7) return `${diffInDays}d`;
  if (diffInDays > 7) return `${diffInWeeks}w`;
  if (diffInYears < 1) return `${diffInYears}y`;
  return `${diffInYears}y`;
}

export function moment(date: Date) {
  const { diffInDays, inputDate } = dateMoment(date);

  const hours = inputDate.getHours();
  const minutes = inputDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  if (diffInDays < 1) return `${formattedHours}:${formattedMinutes} ${ampm}`;

  const day = inputDate.getDate();
  const month = inputDate.toLocaleString("default", { month: "long" });
  if (diffInDays < 365) return `${day} ${month}`;

  return `${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()}`;
}
