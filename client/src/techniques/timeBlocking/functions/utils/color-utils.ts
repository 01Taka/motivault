import type { HexColor } from '../../../../types/utils/color-type'

type HSB = {
  hue: number // 色相 (0〜360)
  saturation: number // 彩度 (0〜100)
  brightness: number // 明度 (0〜100)
}

// HEX → HSB 変換
export function hexToHSB(hex: string): HSB {
  // HEXからRGBに変換
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let hue = 0
  if (delta !== 0) {
    if (max === r) {
      hue = (g - b) / delta
    } else if (max === g) {
      hue = (b - r) / delta + 2
    } else {
      hue = (r - g) / delta + 4
    }
    hue = (hue * 60 + 360) % 360
  }

  const saturation = max === 0 ? 0 : (delta / max) * 100
  const brightness = max * 100

  return { hue, saturation, brightness }
}

export function hsbToHex(hsb: HSB): string {
  const { hue, saturation, brightness } = hsb

  const s = saturation / 100
  const v = brightness / 100

  const c = v * s
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = v - c

  let r = 0,
    g = 0,
    b = 0

  if (hue >= 0 && hue < 60) {
    r = c
    g = x
    b = 0
  } else if (hue >= 60 && hue < 120) {
    r = x
    g = c
    b = 0
  } else if (hue >= 120 && hue < 180) {
    r = 0
    g = c
    b = x
  } else if (hue >= 180 && hue < 240) {
    r = 0
    g = x
    b = c
  } else if (hue >= 240 && hue < 300) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  // RGBを0〜255の範囲に変換
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  // HEXに変換
  const hex = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`

  return hex
}

// HSB調整関数
export function adjustHSB(
  hsb: HSB,
  {
    hue,
    saturation,
    brightness,
  }: { hue?: number; saturation?: number; brightness?: number }
): HSB {
  // 引数がundefinedでない場合に調整
  const adjustedHue =
    hue !== undefined ? Math.min(Math.max(hue, 0), 360) : hsb.hue
  const adjustedSaturation =
    saturation !== undefined
      ? Math.min(Math.max(saturation, 0), 100)
      : hsb.saturation
  const adjustedBrightness =
    brightness !== undefined
      ? Math.min(Math.max(brightness, 0), 100)
      : hsb.brightness

  return {
    hue: adjustedHue,
    saturation: adjustedSaturation,
    brightness: adjustedBrightness,
  }
}

export function adjustHex(
  hex: HexColor,
  adjustOptions: { hue?: number; saturation?: number; brightness?: number }
) {
  const hsb = hexToHSB(hex)
  const adjustedHsb = adjustHSB(hsb, adjustOptions)
  return hsbToHex(adjustedHsb)
}
