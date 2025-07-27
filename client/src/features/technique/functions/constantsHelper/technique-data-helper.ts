import { headerContent } from '../../constants/data/technique-header-data'
import { techniquesStaticInfo } from '../../constants/data/techniques-static-info-data'
import type { TechniqueId } from '../../types/data/technique-id-types'
import type {
  TechniqueDetailParagraph,
  TechniqueStaticInfo,
} from '../../types/data/technique-static-info-types'
import { interpolateString } from '../interpolate-helper'

export const techniquesStaticInfoMap = techniquesStaticInfo.reduce(
  (acc, technique) => {
    acc[technique.docId] = convertHeaderIdsToStrings(technique)
    return acc
  },
  {} as Record<string, (typeof techniquesStaticInfo)[number]>
)

export function getTechniquesStaticInfoById(id: TechniqueId) {
  return techniquesStaticInfoMap[id]
}

/**
 * TechniqueStaticInfoオブジェクトを受け取り、details.paragraph内の
 * isHeaderId: true となっているすべてのヘッダーを、headerContentに基づいた実際の文字列に変換します。
 * howToStartのような補間が必要なヘッダーも処理します。
 *
 * @param originalTechnique 変換するTechniqueStaticInfoオブジェクト
 * @returns すべてのIDベースのヘッダーが文字列に変換された新しいTechniqueStaticInfoオブジェクト
 */
export function convertHeaderIdsToStrings(
  originalTechnique: TechniqueStaticInfo
): TechniqueStaticInfo {
  // 元のオブジェクトをスプレッド構文でコピーし、不変性を保つ
  const updatedTechnique: TechniqueStaticInfo = { ...originalTechnique }

  // paragraph配列もコピーして不変性を保つ
  const updatedParagraphs: TechniqueDetailParagraph[] =
    updatedTechnique.details.paragraph.map((paragraph) => {
      if (paragraph.isHeaderId) {
        // headerContentに存在するIDか確認
        const headerTemplate =
          headerContent[paragraph.headerId as keyof typeof headerContent]

        if (headerTemplate) {
          let convertedHeader = headerTemplate

          // howToStartの場合、ステップ数を補間するロジックを適用
          if (paragraph.headerId === 'howToStart') {
            if (paragraph.type === 'ul' || paragraph.type === 'ol') {
              const stepsCount = paragraph.contents.length
              convertedHeader = interpolateString(headerTemplate, {
                steps: stepsCount,
              })
            }
          }

          // 新しいパラグラフオブジェクトを生成し、isHeaderIdをfalseに、headerを設定
          return {
            ...paragraph,
            isHeaderId: false,
            header: convertedHeader,
          } as TechniqueDetailParagraph // 型アサーションでTechniqueDetailParagraphに適合させる
        } else {
          // headerContentにIDが見つからない場合、警告を出して元のパラグラフを返す
          console.warn(
            `Header ID "${paragraph.headerId}" not found in headerContent.`
          )
          return paragraph
        }
      }
      // isHeaderIdがfalseの場合は、そのままのパラグラフを返す
      return paragraph
    })

  // 更新されたparagraph配列でdetailsオブジェクトを更新
  updatedTechnique.details = {
    ...updatedTechnique.details,
    paragraph: updatedParagraphs,
  }

  return updatedTechnique
}
