export async function downloadFile(src, name) {
  const file = await fetch(src)

  if (!file.ok) {
    return { status: file.status }
  }

  // 檢查是不是回傳錯誤訊息而不是 PDF
  const contentType = file.headers.get('Content-Type') || '';
  const blob = await file.blob();

  if (contentType.includes('application/json')) {
    // 錯誤訊息包在 JSON 中（即使狀態碼是 200）
    const text = await blob.text();
    try {
      const json = JSON.parse(text);
      return { status: 400, message: json.message || '下載失敗' };
    } catch {
      return { status: 400, message: text };
    }
  }

  // 成功下載 PDF
  const blobURL = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobURL;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobURL);

  return { status: file.status };
}
