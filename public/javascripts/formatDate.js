function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedDate = `${month} ${day} ${year} ${hour}:${minutes.toString().padStart(2, '0')}`;
    return formattedDate;
}

module.exports = formatDate;