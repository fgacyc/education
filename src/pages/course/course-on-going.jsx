import {useNavigate, useParams} from "react-router-dom";
import {GoClock} from "react-icons/go";
import {datetimeFormat} from "@/tools.js";
import ProcessCircle from "@/components/process-circle.jsx";
import {useUserStore} from "@/store/user-store.js";
import {useEffect, useState} from "react";
import {useCourseVideoOnGoing} from "@/api/course_video_plan.js";
import NavBar from "@/components/nav-bar.jsx";
import {createCourseCertificate} from "@/api/certificate.js";
import {useTranslation} from "react-i18next";
import i18n from "i18next";



function OnGoingCard({record}) {
    const navigation = useNavigate();
    const uid = useUserStore.getState().UID;
    const [progress, setProgress] = useState(0);
    const lang = i18n.language;


    useEffect(() => {
        if(record.user_video_completion_id !== null){
            setProgress(100);
        }else{
            setProgress(0);
        }
    }, [record.user_video_completion_id]);

    function clickHandler(record){
        if(progress === 0){
            void navigation(`/course_plan/complete?course_video_plan_id=${record.course_video_plan_id}`)
        }
        else if(progress === 100){
            void navigation(`/course_plan/review/${record.course_video_plan_id}`)
        }
    }



    return (
        <div
            className={`flex justify-between items-center  p-4 border-b min-h-[100px] bg-white rounded-xl shadow
            m-2 `}
            onClick={() =>clickHandler(record)}
        >
            <div className={"flex flex-col justify-between items-start w-[80%]"}>
                <div className={"w-[80%] min-h-12"}>
                    {/*<span>{record.video_name_en} | {record.video_name_zh}</span>*/}
                    {
                        lang === "en" ? <span className={"text-lg font-semibold"}>{record.video_name_en}</span> :
                            <span className={"text-lg font-semibold"}>{record.video_name_zh}</span>
                    }
                </div>
                <div className={"text-sm text-gray-400 flex items-center mt-2"}>
                    <GoClock/>
                    <span
                        className={"ml-1"}>{datetimeFormat(record.start_datetime)}</span>
                </div>
            </div>
            <div>
                {/*<BsCheckSquare className={"h-6 w-6 text-gray-500"}/>*/}
                <ProcessCircle progress={progress}/>
                {/*<GoCheckbox  className={"h-8 w-8 "}/>*/}
            </div>
        </div>
    )

}


export default function CourseOnGoing() {
    // course plan id
    const {id} = useParams();
    const {courseVideoOnGoing, isLoading, isError} = useCourseVideoOnGoing(id);
    const [isShowCertificate, setIsShowCertificate] = useState(false);
    const navigate = useNavigate();
    const UID = useUserStore.getState().UID;
    const {t} = useTranslation();
    function viewCertificate(){
         navigate(`/course_plan/certificate/${id}`);
    }



    useEffect(() => {
        if (isLoading) return;
        const isShow = courseVideoOnGoing.every(record => record.user_video_completion_id !== null);

        if(isShow){
            setIsShowCertificate(isShow);
            void createCourseCertificate(UID, id);
        }
    }, [isLoading, courseVideoOnGoing]);

    return (
        <div>
            <NavBar ifShowBackArrow={true}>Course</NavBar>
            {
                !isLoading &&!isError  && <div>
                    <img src={courseVideoOnGoing[0].course_cover} alt="course cover"/>
                    <div className={"divide-y relative bottom-6"}>
                        {
                            courseVideoOnGoing.map((record, index) => {
                                return (
                                    <OnGoingCard key={index} record={record}/>
                                )
                            })
                        }
                    </div>
                </div>
            }

            {
                isShowCertificate &&
                <button className={"bg-[#0068ff] text-white p-3 rounded-lg absolute bottom-5 w-[calc(100%-32px)] mx-4"}
                        onClick={viewCertificate}
                >
                    {t("View Certificate")}
                </button>
            }
        </div>
    )
}