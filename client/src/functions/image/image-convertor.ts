export function convertImageToGrayscale(
  img: HTMLImageElement
): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('2D context not supported')

  canvas.width = img.width
  canvas.height = img.height

  ctx.drawImage(img, 0, 0)

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    // 輝度（Luminance）を計算：加重平均法（NTSC係数）
    const gray = 0.299 * r + 0.587 * g + 0.114 * b

    data[i] = data[i + 1] = data[i + 2] = gray // R,G,Bをgrayに統一
    // alpha(data[i + 3])はそのまま
  }

  ctx.putImageData(imageData, 0, 0)
  return canvas
}
