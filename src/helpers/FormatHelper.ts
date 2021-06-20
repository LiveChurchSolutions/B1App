import { format as dateFormat } from "date-fns"

export class FormatHelper {

  static html5Date(date: Date): string {
    if (date === undefined || date === null) return "";
    else return new Date(date).toISOString().split("T")[0];
  }

  static html5DateTime(date: Date): string {
    if (date === undefined || date === null) return "";
    else {
      return this.formatDateTime(date, "yyyy-MM-dd") + "T" + this.formatDateTime(date, "HH:mm");
    }
  }

  static displayDuration(d: Date): string {
    let seconds = Math.round((new Date().getTime() - d.getTime()) / 1000);
    if (seconds > 86400) {
      let days = Math.floor(seconds / 86400);
      return (days === 1) ? "1 day" : days.toString() + " days";
    }
    else if (seconds > 3600) {
      let hours = Math.floor(seconds / 3600);
      return (hours === 1) ? "1 hour" : hours.toString() + " hours";
    }
    else if (seconds > 60) {
      let minutes = Math.floor(seconds / 60);
      return (minutes === 1) ? "1 minute" : minutes.toString() + " minutes";
    }
    else return (seconds === 1) ? "1 second" : Math.floor(seconds).toString() + " seconds";
  }

  static shortDate(d: Date): string {
    return (d.getMonth() + 1).toString() + "/" + (d.getDate() + 1).toString() + "/" + d.getFullYear().toString();
  }

  private static formatDate(date: Date, format: string) {
    try {
      let cleanDate = new Date(new Date(date).toISOString().split("T")[0]); //truncate the time
      return dateFormat(cleanDate, format);
    } catch { return ""; }
  }

  private static formatDateTime(date: Date, format: string) {
    try {
      return dateFormat(date, format);
    } catch { return ""; }
  }

  static prettyDate(date: Date) {
    if (date === undefined || date === null) return "";
    return this.formatDate(date, "MMM d, yyyy");
  }

  static prettyDateTime(date: Date) {
    if (date === undefined || date === null) return "";
    return this.formatDateTime(date, "MMM d, yyyy h:mm a");
  }

  static formatCurrency(amount: number) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
    return formatter.format(amount);
  }
}
