import NavBar from "@/components/nav-bar.jsx";
import {useParams} from "react-router-dom";
import {getYoutubeEmbedUrl} from "@/tools.js";
import {useUserStore} from "@/store/user-store.js";
import {GoPersonFill} from "react-icons/go";
import {useCourseVideoReview} from "@/api/course_video_plan.js";
import i18n from "i18next";

export default function CourseReview() {
    const {id} = useParams();
    const {courseVideoReview, isLoading, isError} = useCourseVideoReview(id);
    const language =  i18n.language;


    return (
        <div className={"h-screen bg-white"}>
            <NavBar ifShowBackArrow={true}>Course</NavBar>
            {
                !isLoading &&!isError&& <div className={"p-4  relative bottom-2 bg-white"}>
                    <iframe
                        src={getYoutubeEmbedUrl(courseVideoReview.video_url)}
                        className={"w-full h-[300px]"}
                    />
                    <div className={"text-xl font-bold"}>
                        {
                            language === "en" ? courseVideoReview.video_name_en : courseVideoReview.video_name_zh
                        }
                    </div>
                    <div>
                        <div className={"flex my-2 text-blue-500 items-center"}>
                            <GoPersonFill/>
                            <span className={"text-sm ml-2"}>
                                                    {
                                                        language === "en" ? courseVideoReview.lecturer_name_en : courseVideoReview.lecturer_name_zh
                                                    }
                                                </span>
                        </div>
                        <div className={"my-5 text-gray-400"}>
                            {
                                language === "en" ? courseVideoReview.video_description_en : courseVideoReview.video_description_zh
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}