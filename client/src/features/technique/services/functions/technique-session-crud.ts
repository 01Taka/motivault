import type { TechniqueSessionEndReason } from '../../../technique/services/documents/session/technique-session-document'
import type { TechniqueSessionRepository } from '../../../technique/services/repositories/repositories'
import type { TechniqueId } from '../../../technique/types/data/technique-id-types'
import type { UserRepository } from '../../../user/services/repositories/repositories'

/**
 * Starts a new technique session for the user.
 * Throws an error if a session is already active or if user data cannot be retrieved/updated.
 */
export const startTechniqueSession = async (
  userRepo: UserRepository,
  sessionRepo: TechniqueSessionRepository,
  techniqueId: TechniqueId,
  timestamp: number = Date.now()
): Promise<void> => {
  try {
    const userData = await userRepo.read([])

    if (!userData) {
      // It's critical if user data can't be read. This might indicate a serious data issue.
      throw new Error('Failed to retrieve user data. Cannot start session.')
    }

    if (userData.activeSessionInfo !== null) {
      // A session is already in progress. Prevent starting a new one.
      throw new Error('You are already in an active session.')
    }

    // Create the new session in the session repository
    const newSession = await sessionRepo.create(
      {
        startedAt: timestamp,
        endedAt: null,
        endReason: null,
        totalExpGained: 0,
        unlockedAchievementIds: [],
      },
      [techniqueId]
    )

    // Update the user's active session information
    await userRepo.update(
      { activeSessionInfo: { techniqueId, sessionId: newSession.id } },
      []
    )
    console.log(
      `Session started for technique ${techniqueId} with ID ${newSession.id}`
    )
  } catch (error) {
    // Log the original error for debugging purposes
    console.error('Error starting technique session:', error)
    // Re-throw a more user-friendly error or a custom error type
    if (error instanceof Error) {
      throw new Error(`Failed to start technique session: ${error.message}`)
    }
    throw new Error(
      'An unknown error occurred while trying to start the session.'
    )
  }
}

/**
 * Ends the current active technique session.
 * Does nothing if no session is active. Throws an error if update fails.
 */
export const endCurrentTechniqueSession = async (
  userRepo: UserRepository,
  sessionRepo: TechniqueSessionRepository,
  endReason: TechniqueSessionEndReason,
  timestamp: number = Date.now()
): Promise<void> => {
  try {
    const userData = await userRepo.read([])

    if (!userData) {
      // Again, critical if user data is missing when trying to end a session.
      throw new Error('Failed to retrieve user data. Cannot end session.')
    }

    if (userData.activeSessionInfo === null) {
      // No active session to end, so gracefully exit.
      console.log('No active session found to end.')
      return
    }

    if (timestamp >= Date.now()) {
      throw new Error(
        `You cannot specify a time in the future. timestamp: ${timestamp}, now: ${Date.now()}`
      )
    }

    const { techniqueId, sessionId } = userData.activeSessionInfo

    // Update the session in the session repository
    await sessionRepo.update({ endedAt: timestamp, endReason }, [
      techniqueId,
      sessionId,
    ])

    // Clear the active session information from the user's data
    await userRepo.update({ activeSessionInfo: null }, [])
    console.log(
      `Session ${sessionId} for technique ${techniqueId} ended. Reason: ${endReason}`
    )
  } catch (error) {
    // Log the original error for debugging purposes
    console.error('Error ending current technique session:', error)
    // Re-throw a more user-friendly error or a custom error type
    if (error instanceof Error) {
      throw new Error(`Failed to end technique session: ${error.message}`)
    }
    throw new Error(
      'An unknown error occurred while trying to end the session.'
    )
  }
}

/**
 * Ends the current active technique session (if any) and then starts a new technique session.
 * This function ensures a clean transition between sessions.
 * Throws an error if user data cannot be retrieved/updated during either phase.
 */
export const changeTechniqueSession = async (
  userRepo: UserRepository,
  sessionRepo: TechniqueSessionRepository,
  newTechniqueId: TechniqueId,
  endReasonForPreviousSession: TechniqueSessionEndReason,
  timestamp: number = Date.now()
): Promise<void> => {
  try {
    const userData = await userRepo.read([])

    if (!userData) {
      throw new Error('Failed to retrieve user data. Cannot restart session.')
    }

    // --- Phase 1: End the current session if one exists ---
    if (userData.activeSessionInfo !== null) {
      const { techniqueId: oldTechniqueId, sessionId: oldSessionId } =
        userData.activeSessionInfo

      try {
        // Update the old session in the session repository
        await sessionRepo.update(
          { endedAt: timestamp, endReason: endReasonForPreviousSession },
          [oldTechniqueId, oldSessionId]
        )

        // Clear the active session information from the user's data
        await userRepo.update({ activeSessionInfo: null }, [])
        console.log(
          `Previous session ${oldSessionId} for technique ${oldTechniqueId} ended. Reason: ${endReasonForPreviousSession}`
        )
      } catch (endError) {
        console.error('Error ending previous session during restart:', endError)
        if (endError instanceof Error) {
          throw new Error(
            `Failed to end previous session during restart: ${endError.message}`
          )
        }
        throw new Error(
          'An unknown error occurred while trying to end the previous session during restart.'
        )
      }
    } else {
      console.log('No active session found to end before starting a new one.')
    }

    // --- Phase 2: Start the new session ---
    // Create the new session in the session repository
    const newSession = await sessionRepo.create(
      {
        startedAt: timestamp,
        endedAt: null,
        endReason: null,
        totalExpGained: 0,
        unlockedAchievementIds: [],
      },
      [newTechniqueId]
    )

    // Update the user's active session information with the new session
    await userRepo.update(
      {
        activeSessionInfo: {
          techniqueId: newTechniqueId,
          sessionId: newSession.id,
        },
      },
      []
    )
    console.log(
      `New session started for technique ${newTechniqueId} with ID ${newSession.id}`
    )
  } catch (error) {
    // Log the original error for debugging purposes
    console.error('Error restarting technique session:', error)
    // Re-throw a more user-friendly error or a custom error type
    if (error instanceof Error) {
      throw new Error(`Failed to restart technique session: ${error.message}`)
    }
    throw new Error(
      'An unknown error occurred while trying to restart the session.'
    )
  }
}
