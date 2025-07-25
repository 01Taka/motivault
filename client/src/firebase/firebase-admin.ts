import { getFunctions, type Functions } from 'firebase/functions'
import { getApp } from 'firebase/app'

const functions: Functions = getFunctions(getApp())

export { functions }
