export default (unformatedDate) => {
  const date = new Date(unformatedDate)
  return date.toLocaleDateString([], {month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})
}
