export const exportCSV = (data, filename) => {
  let csvContent = data.map(e => e.join(',')).join('\n')

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf8;'
  })

  const link = document.createElement('a')
  link.setAttribute('href', window.URL.createObjectURL(blob))
  link.setAttribute('download', `${filename}.csv`)
  document.body.appendChild(link) // Required for Firefox

  link.click() // This will download the data file
  link.remove()
}
