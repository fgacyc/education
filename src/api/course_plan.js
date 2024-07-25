import useSWR from "swr";
import {fetcher} from "@/tools.js";

const host = import.meta.env.VITE_API_URL;

export function useCoursePlans() {
    const { data, error, isLoading } = useSWR(`${host}/course_plans/record`, fetcher)

    return {
        coursePlan: data,
        isLoading,
        isError: error,
    }
}

export function useCoursePlansNotStart() {
    const { data, error, isLoading } = useSWR(`${host}/course_plans/record/not_started`, fetcher)

    return {
        coursePlanNotStart: data,
        isLoading,
        isError: error,
    }
}

export function useCoursePlansInfo(course_plan_id) {
    const { data, error, isLoading } = useSWR(`${host}/course_plans/info/${course_plan_id}`, fetcher)

    return {
        coursePlanInfo: data,
        isLoading,
        isError: error,
    }
}

export function useCoursePlansStatus(course_plan_id,user_id) {
    const { data, error, isLoading } = useSWR(`${host}/course_plans/status/${course_plan_id}/${user_id}`, fetcher)

    return {
        coursePlanStatus: data,
        isLoading,
        isError: error,
    }
}



export async function createCoursePlan(course_id, teacher_id, start_datetime, end_datetime) {
    const coursePlan = {
        course_id,
        teacher_id,
        start_datetime,
        end_datetime
    }
    const response = await fetch(`${host}/course_plans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(coursePlan),
    })
    const data = await response.json();
    return data;
}