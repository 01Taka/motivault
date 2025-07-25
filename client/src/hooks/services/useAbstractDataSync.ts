import { useEffect, useMemo } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '../../firebase/firebase'

/**
 * @template T - A union type representing the possible keys or identifiers for specific data listeners (e.g., 'habits', 'routines'). These are typically used to subscribe to subsets of data within a user's repository.
 */

/**
 * @typedef {object} DataSyncActions
 * @property {(uid: string) => void} setRepositories - Function to set up data repositories for a given user ID. This typically involves initializing database connections or data structures specific to the authenticated user.
 * @property {() => void} clearRepositories - Function to clear all data repositories. This is called when a user logs out to ensure no residual data remains.
 * @property {(pathSegments: string[], dataKeysToListen?: T[] | undefined) => (() => void) | undefined} initializeListeners - Function to initialize real-time data listeners. It takes an array of `pathSegments` to construct the data path (e.g., ['users', 'uid', 'habits']) and an optional `dataKeysToListen` array to specify which data subsets to listen to. Returns a cleanup function to unsubscribe from these listeners, or `undefined` if no listeners were set up.
 * @property {() => void} clearData - Function to clear all data currently held in the application's store or state.
 * @property {('uid' | string)[]} [pathSegments=['uid']] - Optional. An array of strings defining the path segments to be used when initializing data listeners. The string 'uid' will be dynamically replaced with the authenticated user's ID. Defaults to `['uid']`.
 * @property {T[] | undefined} [dataKeysToListen] - Optional. An array of keys (`T`) indicating specific subsets of data within the constructed path that should have listeners attached.
 */

/**
 * Custom hook to synchronize application data based on Firebase authentication state.
 * It manages the lifecycle of data repositories and real-time listeners, ensuring data is
 * loaded and cleared appropriately when a user logs in or out. This hook abstracts the
 * authentication state handling and dynamically constructs data paths for listeners.
 *
 * @template T - The type of keys that can be passed to `initializeListeners` to specify data subsets.
 * @param {DataSyncActions<T>} dataSyncActions - An object containing functions and configuration for data synchronization.
 */
const useAbstractDataSync = <T extends string>(dataSyncActions: {
  setRepositories: (...constructorArgs: RepoConstructorArgs) => void
  clearRepositories: () => void
  initializeListeners: (
    pathSegments: string[],
    dataKeysToListen?: T[] | undefined
  ) => (() => void) | undefined
  clearData: () => void
  repoConstructorArgs: RepoConstructorArgs
  pathSegments?: ('uid' | string)[] // Added optional pathSegments
  dataKeysToListen?: T[] | undefined // Added optional dataKeysToListen
}) => {
  const {
    setRepositories,
    clearRepositories,
    initializeListeners,
    clearData,
    repoConstructorArgs,
    pathSegments,
    dataKeysToListen,
  } = dataSyncActions

  const memoRepoConstructorArgs = useMemo(
    () => repoConstructorArgs ?? ['uid'],
    []
  ) as any[]
  const memoPathSegments = useMemo(() => pathSegments ?? ['uid'], [])
  const memoDataKeysToListen = useMemo(() => dataKeysToListen, [])

  useEffect(() => {
    let cleanupListeners: (() => void) | undefined

    const unsubscribeAuth = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const resolvedConstructorArgs = memoPathSegments.map((arg) =>
          arg === 'uid' ? user.uid : arg
        )
        setRepositories(resolvedConstructorArgs)
        // Construct the full path segments, replacing 'uid' with the actual user ID
        const resolvedPathSegments = memoPathSegments.map((segment) =>
          segment === 'uid' ? user.uid : segment
        )
        cleanupListeners = initializeListeners(
          resolvedPathSegments,
          memoDataKeysToListen
        )
      } else {
        // When logged out, clear repositories and data, then clean up listeners
        clearRepositories()
        clearData()
        cleanupListeners?.() // Clean up any existing listeners
      }
    })

    // Cleanup function for the effect
    return () => {
      unsubscribeAuth() // Unsubscribe from Firebase auth changes
      cleanupListeners?.() // Unsubscribe from collection snapshot listeners
    }
  }, [
    setRepositories,
    clearRepositories,
    initializeListeners,
    clearData,
    memoRepoConstructorArgs,
    memoPathSegments, // Add pathSegments to dependencies
    memoDataKeysToListen, // Add dataKeysToListen to dependencies
  ])
}

export default useAbstractDataSync
