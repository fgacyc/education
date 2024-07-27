const host = import.meta.env.VITE_API_URL;

export async function createUserVideoCompletion(user_id, course_video_plan_id) {
    if (!user_id || !course_video_plan_id) return;
    const userVideoCompletion = {
        user_id,
        course_video_plan_id
    }

    const response = await fetch(`${host}/user_video_completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userVideoCompletion),
    })

    const data = await response.json();
    return data;
}