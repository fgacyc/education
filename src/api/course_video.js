const host = import.meta.env.VITE_API_URL;

export async function fetchVideos(course_id) {
    const response = await fetch(`${host}/course_videos/course/${course_id}`)
    const data = await response.json();
    return data;
}