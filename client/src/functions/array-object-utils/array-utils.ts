/**
 * 配列に要素を重複なく追加または削除します。
 * targetElements が単一の要素の場合はその要素を処理し、配列の場合はその配列内のすべての要素を処理します。
 * @param elements 更新する要素の配列。
 * @param targetElements 処理する新しい要素、または要素の配列。
 * @param action 'add' で追加、'remove' で削除を指定します。
 * @returns 更新された要素の新しい配列。変更がない場合は元の配列と同じ参照を返します。
 */
export function manageUniqueElements<T>(
  elements: T[],
  targetElements: T | T[],
  action: 'add' | 'remove'
): T[] {
  const elementSet = new Set(elements)
  let hasChanged = false

  const elementsToProcess = Array.isArray(targetElements)
    ? targetElements
    : [targetElements]

  for (const element of elementsToProcess) {
    if (action === 'add') {
      if (!elementSet.has(element)) {
        elementSet.add(element)
        hasChanged = true
      }
    } else if (action === 'remove') {
      if (elementSet.has(element)) {
        elementSet.delete(element)
        hasChanged = true
      }
    }
  }

  // 変更があった場合のみ新しい配列を作成して返します。
  if (hasChanged) {
    // Setから配列に戻す際にソートするかどうかは、型Tに依存するため、ここでは行いません。
    // 必要であれば、呼び出し元でソートしてください。
    return Array.from(elementSet)
  } else {
    // 変更がなかった場合は、元の配列をそのまま返します。
    return elements
  }
}
