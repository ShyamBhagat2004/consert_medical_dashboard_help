export const validateInput = (value) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      return "Invalid non-float format.";
    }
    if (value === "") {
      return "Input cannot be empty.";
    }
    return "";
  };
  
  export const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:00:00`;
  };

  export const formatAHDateTime = (date, selectedHour) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = selectedHour.toString().padStart(2,'0');
    return `${year}-${month}-${day} ${hour}:00:00`;
  };
  
  export const formatTime = (date) => {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  export const parseDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  export const sortDataByTime = (data) => {
    return data.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  };