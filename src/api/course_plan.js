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