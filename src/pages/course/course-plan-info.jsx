import {useNavigate, useParams} from "react-router-dom";
import NavBar from "@/components/nav-bar.jsx";
import Block from "@/components/block.jsx";
import {useUserStore} from "@/store/user-store.js";
import {useCoursePlansInfo} from "@/api/course_plan.js";
import {useEffect, useState} from "react";
import {addTimeStrings, datetimeFormat} from "@/tools.js";
import {GoPersonFill} from "react-icons/go";
import OvalLoading from "@/components/oval-loading.jsx";
import {create_enrollment} from "@/api/enrollment.js";

const language = useUserStore.getState().language;

export default function CoursePlanInfo() {
    const {id} = useParams();
    const {coursePlanInfo,isLoading,isError} = useCoursePlansInfo(id);
    const [course,setCourse] = useState(null);
    const [lecturersNameEN,setLecturersNameEN] = useState([]);
    const [lecturersNameZH,setLecturersNameZH] = useState([]);
    const [videoDuration,setVideoDuration] = useState([]);
    const UID = useUserStore.getState().UID;
    const navigate = useNavigate();

    console.log(coursePlanInfo)

    useEffect(() => {
        if (isLoading) return;
        if (isError) return;
        const lecturerNameEN = coursePlanInfo.map(video => video.lecturer_name_en);
        const lecturerNameZH = coursePlanInfo.map(video => video.lecturer_name_zh);
        const duration = coursePlanInfo.map(video => video.video_duration);
        setLecturersNameEN(Array.from(new Set(lecturerNameEN)));
        setLecturersNameZH(Array.from(new Set(lecturerNameZH)));
        setVideoDuration(duration);

        setCourse({
            course_cover: coursePlanInfo[0].course_cover,
            course_name_en: coursePlanInfo[0].course_name_en,
            course_name_zh: coursePlanInfo[0].course_name_zh,
            description_en: coursePlanInfo[0].description_en,
            description_zh: coursePlanInfo[0].description_zh,
            start_datetime: coursePlanInfo[0].start_datetime,
            video_count: coursePlanInfo[0].video_count,
        });

    }, [isLoading]);



    function enrollHandler(){
        create_enrollment(UID,id).then(res => {
            if (res===true){
                alert("Enroll successfully!");
                void navigate("/course_plan/on-going/" + id);
            } else {
                alert("Enroll failed!");
            }
        })
    }


    return (
        <div className={"h-screen relative"}>
            <NavBar ifShowBackArrow={true}>Course Info</NavBar>
            <div>
                {
                    isLoading && <div className={"absolute inset-0 flex justify-center items-center"}>
                        <OvalLoading/>
                    </div>
                }
                {
                    !isLoading && !isError && course && (
                        <div>
                            <img src={course.course_cover} alt="course cover"/>
                            <div className={"p-4 rounded-xl relative bottom-2 bg-white"}>
                                <div className={"text-xl font-bold"}>
                                    {
                                        language === "en" ? course.course_name_en : course.course_name_zh
                                    }
                                </div>
                                {
                                    lecturersNameEN.length > 0 && (
                                        <div>
                                            <div className={"flex my-2 text-blue-500 items-center"}>
                                                <GoPersonFill/>
                                                <span className={"text-sm ml-2"}>
                                                    {
                                                        language === "en" ? lecturersNameEN.join(", ") : lecturersNameZH.join(", ")
                                                    }
                                                </span>
                                            </div>
                                            <div className={"my-5 text-gray-400"}>
                                                {
                                                    language === "en" ? course.description_en : course.description_zh
                                                }
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 my-3">
                                                <div>
                                                    <div className="text-sm text-gray-400">Classes</div>
                                                    <div className="text-lg font-bold">{course.video_count}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400">Durations</div>
                                                    <div className="text-lg font-bold">{addTimeStrings(videoDuration)}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400">Language</div>
                                                    <div className="text-lg font-bold">Chinese</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-400">Start Date</div>
                                                    <div className="text-lg font-bold">{datetimeFormat(course.start_datetime)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    )
                }
            </div>
            <div className={`absolute bottom-2  flex justify-center items-center text-white w-[calc(100%-32px)] mx-4
                                border rounded-lg py-2 px-4 bg-[#3B82F6]`}
                 onClick={enrollHandler}
            >
                <div>Enroll Now!</div>
            </div>
        </div>
    )
}