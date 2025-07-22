import {
  normalizeFullWidthNumbers,
  replaceNumbersInText,
} from '../../../functions/text/kanji-to-number'
import {
  replaceSecondsWithFormattedTime,
  replaceTimeExpressionsWithSeconds,
} from '../../../functions/text/timeConverter'
import {
  extractUnitsWithValues,
  replaceUnitsWithNormalizedLabels,
} from '../../../functions/text/unitConverter'

export const formatInputText = (text: string) => {
  const numberNormalizedText = normalizeFullWidthNumbers(text)
  const replacedNumber = replaceNumbersInText(numberNormalizedText)

  const replacedTimeToSec = replaceTimeExpressionsWithSeconds(replacedNumber)
  const result = replaceUnitsWithNormalizedLabels(replacedTimeToSec)
  const replacedUnit = result.normalizedText

  const unitAndValue = extractUnitsWithValues(replacedUnit)

  const formatText = replaceSecondsWithFormattedTime(replacedUnit)

  return {
    unitAndValue,
    formatText,
    match: result.match,
  }
}
