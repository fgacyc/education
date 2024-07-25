const host = import.meta.env.VITE_API_URL;


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