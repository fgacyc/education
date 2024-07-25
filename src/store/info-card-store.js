import { create } from 'zustand'


export const useInfoCardStore = create((set) => ({
    currentCard: 0,
    setCurrentCard: (value) => set({currentCard: value}),

    enrolledCoursesIDs: [],
    completedCoursesIDs: [],

    setEnrolledCoursesIDs: (value) => set({enrolledCoursesIDs: value}),
    setCompletedCoursesIDs: (value) => set({completedCoursesIDs: value})
}))