import NavBar from "@/components/nav-bar.jsx";
import {useParams} from "react-router-dom";
import {useCourseVideoPlans} from "@/api/course_video_plan.js";
import Block from "@/components/block.jsx";
import {GoClock} from "react-icons/go";
import {datetimeFormat} from "@/tools.js";

export default function Record() {
    const {id} = useParams()
    const    {courseVideoPlan, isLoading, isError}  = useCourseVideoPlans(id)

    console.log(courseVideoPlan)


    return <div>
        <NavBar ifShowBackArrow={true}>Course Record</NavBar>
        <div>
            {!isLoading && !isError && courseVideoPlan.map((record) => (
                <Block key={record.code}>
                    <div className={"text-lg font-bold"}>{record.video_name_en}</div>
                    <div className={"text-sm text-gray-500"}>{record.video_name_zh}</div>
                    {/*<div>{record.code}</div>*/}
                    <div className={"flex divide-x border w-[192px] my-3"}>
                        {
                            record.code.split("").map((char, index) => (
                                <div key={index} className={"text-2xl w-8 h-8 text-center"}>{char}</div>
                            ))
                        }
                    </div>
                    <div className={"text-sm text-gray-400 flex items-center"}>
                        <GoClock/>
                        <span className={"ml-1"}>{datetimeFormat(record.start_datetime)}</span>
                    </div>
                </Block>
            ))}
        </div>
    </div>
}