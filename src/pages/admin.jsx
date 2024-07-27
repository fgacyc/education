import NavBar from "@/components/nav-bar.jsx";
import Block from "@/components/block.jsx";
import {DatePicker, Select} from "@arco-design/web-react";
import {fromUrlToImageName, getMaxAndMinDate} from "@/tools.js";
import {useUserStore} from "@/store/user-store.js";
import {useEffect, useState} from "react";
import {GoListUnordered} from "react-icons/go";
import {useNavigate} from "react-router-dom";
import {useCourses} from "@/api/course.js";
import {fetchVideos} from "@/api/course_video.js";
import {createCoursePlan} from "@/api/course_plan.js";
import {createCourseVideoPlan} from "@/api/course_video_plan.js";
import i18n from "i18next";

const Option = Select.Option;
const lang =  i18n.language;
const UID = useUserStore.getState().UID;


function VideoCard({video,index,dateTimes,setDateTimes}) {
    function onChange(dateStr) {
        const dateTimesCopy = [...dateTimes];
        dateTimesCopy[index] = {
            course_video_id: video.video_id,
            start_datetime: dateStr,
            code: Math.floor(100000 + Math.random() * 900000).toString()
        };
        setDateTimes(dateTimesCopy);
    }


    return (
        <div className={"flex flex-col p-2 rounded"}>
            <div className={"flex mb-3"}>
                <div className={"w-1/3"}>
                    <img src={fromUrlToImageName(video.video_url)} alt={video.video_name_en}
                         className={"w-full h-20 object-cover"}/>
                </div>
                <div className={"w-2/3 pl-2 flex flex-col justify-between"}>
                    <div className={"text-sm text-gray-600"}>{
                        lang === 'zh' ? video.video_name_zh : video.video_name_en
                    }</div>
                    <div className={"flex justify-between"}>
                        <div className={"text-xs text-gray-400"}>{
                            lang === 'zh' ? video.lecturer_name_zh : video.lecturer_name_en
                        }</div>
                        <div className={"text-xs text-gray-400"}>{video.video_duration}</div>
                    </div>
                </div>
            </div>
            <DatePicker
                showNowBtn={false}
                showTime={{
                    defaultValue: '00:00:00',
                }}
                format='YYYY-MM-DD HH:mm:ss'
                onChange={onChange}
            />
        </div>
    )
}

export default function Admin() {
    const {courses, isLoading, isError} = useCourses()
    const [currentSelectedCourse, setCurrentSelectedCourse] = useState(localStorage.getItem('currentSelectedCourse') || null);
    const [videos, setVideos] = useState([]);
    const [dateTimes, setDateTimes] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        if (currentSelectedCourse === null) return;
        localStorage.setItem('currentSelectedCourse', currentSelectedCourse);

        fetchVideos(currentSelectedCourse).then((data) => {
            setVideos(data);
        })

    }, [currentSelectedCourse]);


    async function saveHandler(){
        if (dateTimes.length !== videos.length) {
            alert('Please select the date time for all videos');
            return;
        }
        const dateList = dateTimes.map((data) => data.start_datetime);
        const {maxDate,minDate} = getMaxAndMinDate(dateList);

        let course_plan_id = await  createCoursePlan(
            currentSelectedCourse,
            UID,
            minDate,
            maxDate
        )
         // console.log("course_plan_id", course_plan_id)
        if(course_plan_id ===false){
            alert('Failed to create course plan');
            return;
        }

        // createCoursePlan
        const promises = dateTimes.map((data) => {
            return createCourseVideoPlan(
                course_plan_id,
                data.course_video_id,
                data.start_datetime,
                data.code
            )
        })
        const results = await Promise.all(promises);
        let isSuccess = results.every((result) => result===true);
        if (isSuccess) {
            alert('Created Course Plan Successfully');
            // navigator("/admin/records");
        } else {
            alert('Failed to create course video plan');
        }

    }

    return (
        <>
            <NavBar ifShowBackArrow={false}>Admin</NavBar>
            <Block>
                <Select
                    placeholder='Select a course'
                    onChange={setCurrentSelectedCourse}
                >
                    {!isLoading && !isError && courses.map((course, index) => (
                        <Option key={index} value={course.course_id}>
                            {lang === 'zh' ? course.course_name_zh : course.course_name_en}
                        </Option>
                    ))}
                </Select>
            </Block>
            <div className={"divide-y bg-white m-2 p-2 rounded h-[calc(100vh-215px)] overflow-y-auto"}>
                {
                    videos.length > 0 && videos.map((video, index) => (
                        <VideoCard video={video} key={index}
                                   dateTimes={dateTimes}
                                   index={index}
                                   setDateTimes={setDateTimes}/>
                    ))
                }
            </div>
            <div className={"absolute bottom-0 flex py-2 bg-white w-full"}>
                <div className={"ml-2 flex flex-col justify-center items-center w-[90px] text-[#0068ff]"}
                     onClick={() => navigator("/admin/records")}
                >
                    <GoListUnordered className={"h-8 w-8 "}/>
                    <div className={"text-[10px]"}>View Record</div>
                </div>
                <button className={"bg-[#0068ff] text-white p-3 rounded-lg w-[calc(100vw-115px)] mr-2"}
                        onClick={saveHandler}
                >
                    Create
                </button>
            </div>
        </>
    )
}