/**
 * Journey data types
 *
 * This module is the central hub for journey-related data shapes.
 * Use these types wherever journey data is read or written. In the future,
 * when multi-user sessions are added, we'll extend this to fetch and
 * share other users' journey data from here.
 */

/** Player's fire state for the fire mechanic */
export const FireState = {
  Ashes: "ashes",
  Embers: "embers",
  Flame: "flame",
  Steady: "steady",
  Bonfire: "bonfire",
} as const;

export type FireState = (typeof FireState)[keyof typeof FireState];

/** Shape of the data the player enters (North Star, Weekly Goal, 5 actions) */
export type JourneyData = {
  infoCompleted: boolean;
  northStar: string;
  weeklyGoal: string;
  weeklyActions: readonly [string, string, string, string, string];
  fireState: FireState;
};

/** Initial empty state for a new journey */
export const emptyJourneyData: JourneyData = {
  infoCompleted: false,
  northStar: "",
  weeklyGoal: "",
  weeklyActions: ["", "", "", "", ""],
  fireState: FireState.Ashes,
};
