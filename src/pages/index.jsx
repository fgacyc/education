import reactLogo from '@/assets/react.svg'
import fgaTechLogo from '/fga_tech.png'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ProfileToken from "@/components/profile-token.jsx";
import {useUserStore} from "@/store/user-store.js";
import {useTranslation} from "react-i18next";
import UiInfoCard from "@/components/ui-info-card.jsx";
import NavBar from "@/components/nav-bar.jsx";
import {useCoursePlansNotStart, useCoursePlansStatus} from "@/api/course_plan.js";
import {GoArrowRight, GoClock} from "react-icons/go";
import {datetimeFormat} from "@/tools.js";
import {useInfoCardStore} from "@/store/info-card-store.js";


function CourseCard({course}){
    const navigate = useNavigate();
    const UID = useUserStore(state => state.UID);
    const [status,setStatus] = useState("not_enrolled")
    const currentCardIndex= useInfoCardStore(state => state.currentCard);
    const [isShow,setIsShow] = useState(true);
    const [addEnrolledCourse,addCompletedCourse] = useInfoCardStore(state => [state.addEnrolledCourse,state.addCompletedCourse]);


    const {coursePlanStatus,isLoading,isError} = useCoursePlansStatus(course.course_plan_id,UID);



    const clickHandler = () => {
        if(status === "not_enrolled"){
            navigate(`/course_plan/${course.course_plan_id}`)
        }
        else if (status === "enrolled" || status === "completed"){
            navigate(`/course_plan/on-going/${course.course_plan_id}`)
        }
    }

    useEffect(() => {
        if(isLoading) return;
        if (!coursePlanStatus) return;

        if(coursePlanStatus === "enrolled"){
            setStatus("enrolled")
            addEnrolledCourse(course.course_plan_id)
        }
        else if(coursePlanStatus === "completed"){
            setStatus("completed")
            addCompletedCourse(course.course_plan_id)
        }
        else if(coursePlanStatus === "not_enrolled"){
            setStatus("not_enrolled")
        }
    }, [isLoading,coursePlanStatus]);

    useEffect(() => {
        if (currentCardIndex === 0){
            setIsShow(true)
        }
        else if (currentCardIndex === 1 && status === "enrolled"){
            setIsShow(true)
        }
        else if (currentCardIndex === 2 && status === "completed"){
            setIsShow(true)
        }
        else {
            setIsShow(false)
        }

    }, [currentCardIndex]);

    return (
        <div  className={`bg-white p-2 my-2 rounded shadow relative
                        ${isShow ? "block" : "hidden" }
        `}>
            <img src={course.course_cover} className={"w-full h-52 object-cover rounded"} alt="background image"/>
            {/*<div className={"absolute top-4 right-4 flex flex-col items-center bg-white rounded-lg px-1 py-2"}>*/}
            {/*    <div className={"text-xl font-bold"}>{records.length }</div>*/}
            {/*    <div className={"text-xs"}>Classes</div>*/}
            {/*</div>*/}
            {/*<div>{courses_plan_id}</div>*/}
            <div className={"text-lg font-semibold mt-2"}>
                {course.course_name_en}
            </div>
            <div className={"text-sm text-gray-400 mb-5"}>
                {course.course_name_zh}
            </div>
            <div className={"text-sm text-gray-400 flex items-center"}>
                <GoClock/>
                {
                    course && <span
                        className={"ml-1"}>{datetimeFormat(course.start_datetime)}</span>
                }

            </div>
            <div className={`absolute bottom-2 right-2 flex justify-center items-center text-white w-[120px]
                                border rounded-lg py-2 px-4 bg-[#4dabf7]`}>
                {
                    status === "not_enrolled" && (
                        <div onClick={clickHandler}>Enroll</div>
                    )
                }
                {
                    status === "enrolled" && (
                        <div onClick={clickHandler}>Continue</div>
                    )
                }
                {
                    status === "completed" && (
                        <div onClick={clickHandler}>Review</div>
                    )
                }
                <GoArrowRight/>
            </div>
        </div>
    )
}


export default function Index() {
    const navigate = useNavigate();
    const {coursePlanNotStart,isLoading,isError} = useCoursePlansNotStart();
    const currentActiveCardIndex = useInfoCardStore(state => state.currentCard);





    return (
        <div className={""}>
            <NavBar ifShowBackArrow={false}>Education</NavBar>
            <div className={"p-2"}>
                <UiInfoCard data={coursePlanNotStart}/>
            </div>
            <div className={"h-[calc(100vh-260px)] overflow-y-auto border-blue-500 px-2 "}>
                {
                    currentActiveCardIndex ===2 && <div className={"bg-orange-400 p-2 text-sm rounded text-white"}
                                                        onClick={() => navigate(`/course_plan/report`)}
                    >
                        Completed records are incorrect or not showing up? Please click here to report!
                    </div>
                }
                {
                    !isLoading && !isError && coursePlanNotStart.map((course,index) => (
                        <CourseCard key={index} course={course}/>
                    ))
                }
            </div>
        </div>
    )
}