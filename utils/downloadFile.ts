export async function downloadFile(src, name) {
  const file = await fetch(src)
  const blob = await file.blob()
  const blobURL = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = blobURL
  link.download = name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
