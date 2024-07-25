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

export function useCourseVideoOnGoing(course_plan_id) {
    const { data, error, isLoading } = useSWR(`${host}/course_video_plans/on-going/${course_plan_id}`, fetcher)

    return {
        courseVideoOnGoing: data,
        isLoading,
        isError: error,
    }
}

export function useCourseVideoReview(course_plan_id) {
    const { data, error, isLoading } = useSWR(`${host}/course_video_plans/review/${course_plan_id}`, fetcher)

    return {
        courseVideoReview: data,
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

export async function check_if_code_correct (course_video_plan_id, code) {
    const course_video_plan_data = {
        course_video_plan_id,
        code
    }

    const response = await fetch(`${host}/course_video_plans/check_code`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(course_video_plan_data),
    })

    const data = await response.json();
    return data;
}