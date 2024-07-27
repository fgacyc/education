import { create } from 'zustand'


export const useInfoCardStore = create((set) => ({
    currentCard: 0,
    setCurrentCard: (value) => set({currentCard: value}),

    enrolledCoursesIDs: [],
    completedCoursesIDs: [],
    certificatesCourseIDs: [],

    setEnrolledCoursesIDs: (value) => set({enrolledCoursesIDs: value}),
    setCompletedCoursesIDs: (value) => set({completedCoursesIDs: value}),
    setCertificatesCourseIDs: (value) => set({certificatesCourseIDs: value}),

    addEnrolledCourse: (id) => set(state => {
        if (state.enrolledCoursesIDs.includes(id)) return state
        return {enrolledCoursesIDs: [...state.enrolledCoursesIDs, id]}
    }),

    addCompletedCourse: (id) => set(state => {
        if (state.completedCoursesIDs.includes(id)) return state
        return {completedCoursesIDs: [...state.completedCoursesIDs, id]}
    }),
}))