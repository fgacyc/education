import useSWR from "swr";
import {fetcher} from "@/tools.js";

const host = import.meta.env.VITE_API_URL;

export function useCourseVideoPlans(course_plan_id) {
    const { data, error, isLoading } = useSWR(`${host}/course_video_plans/record/${course_plan_id}`, fetcher)

    return {
        courseVideoPlan: data,
        isLoading,
        isError: error,
    }
}


export async function createCourseVideoPlan(courses_plan_id, course_video_id, start_datetime, code) {
    const coursePlan = {
        courses_plan_id,
        course_video_id,
        start_datetime,
        code
    }
    const response = await fetch(`${host}/course_video_plans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coursePlan),
    })
    const data = await response.json();
    return data;
}