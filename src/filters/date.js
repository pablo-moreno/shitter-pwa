const DEFAULT_FORMAT = {
  day: '2-digit', 
  month: 'short', 
  hour: '2-digit', 
  minute: '2-digit'
}

export default (date, format=DEFAULT_FORMAT) => {
  return new Date(date).toLocaleDateString(navigator.language || navigator.userLanguage, format)
}
