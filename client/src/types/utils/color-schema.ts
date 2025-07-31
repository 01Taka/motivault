import z from 'zod'

const hexRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/

// HEXカラーコードスキーマ
export const HexColorSchema = z.string().refine((val) => hexRegex.test(val), {
  message: 'Invalid HEX color format. It should be #RRGGBB or #RRGGBBAA.',
})

const rgbRegex = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/

// RGBカラーコードスキーマ
export const RgbColorSchema = z.string().refine(
  (val) => {
    // 正規表現でマッチするかチェック
    const match = rgbRegex.exec(val)
    if (!match) return false

    const [, r, g, b] = match
    // 各色成分が0〜255の範囲内であることを確認
    return [r, g, b].every((color) => {
      const num = parseInt(color, 10)
      return num >= 0 && num <= 255
    })
  },
  {
    message:
      'Invalid RGB color format. It should be rgb(R, G, B) with values between 0 and 255.',
  }
)

export const ColorSchema = z.union([HexColorSchema, RgbColorSchema])
