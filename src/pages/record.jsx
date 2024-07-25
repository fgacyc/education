import NavBar from "@/components/nav-bar.jsx";
import Block from "@/components/block.jsx";
import {useState} from "react";
import {GoClock} from "react-icons/go";
import {datetimeFormat} from "@/tools.js";
import {useCoursePlans} from "@/api/course_plan.js";
import {useNavigate} from "react-router-dom";


function RecordCard({record}) {
    const navigate = useNavigate()


    return <div  className={"bg-white p-2 my-2 rounded shadow"}
                onClick={() => navigate(`/admin/record?id=${record.courses_plan_id}`)}
    >
        <div className={"text-lg font-semibold"}>
            {record.course_name_en}
        </div>
        <div className={"text-sm text-gray-400 mb-4"}>
            {record.course_name_zh}
        </div>
        <div className={"text-sm text-gray-400 flex items-center"}>
            <GoClock/>
            <span className={"ml-1"}>{datetimeFormat(record.start_datetime)}</span>
        </div>
    </div>
}

export default function Record() {
    const [currentTab, setCurrentTab] = useState(0)
    const tabs = ["All", "Completed", "In Progress", "Not Started"]
    const   {coursePlan, isLoading, isError} = useCoursePlans()


    return (
        <div>
            <NavBar ifShowBackArrow={true}>Records</NavBar>
            <Block>
                <div className={"flex bg-white justify-around p-2"}>
                    {
                        tabs.map((tab, index) => {
                            return (
                                <div key={index}
                                     className={`${currentTab === index ? 'text-blue-600' : 'text-gray-400'}`}
                                     onClick={() => setCurrentTab(index)}
                                >
                                    {tab}
                                </div>
                            )
                        })
                    }
                </div>
            </Block>
            <div className={"h-[calc(100vh-100px)] overflow-auto px-2"}>
                <div className={""}>
                    {
                        !isLoading &&!isError && coursePlan.map((record, index) => {
                            return <RecordCard record={record} key={index}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
}