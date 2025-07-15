export function formatDateTime(isoDate:any) {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  
    return `${formattedDate}, ${formattedTime}`;
  }
  
