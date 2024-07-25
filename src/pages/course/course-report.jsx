import NavBar from "@/components/nav-bar.jsx";
import {useCourses} from "@/api/course.js";
import {useEffect, useState} from "react";
import {useUserStore} from "@/store/user-store.js";
import Block from "@/components/block.jsx";
import {Checkbox  } from "@arco-design/web-react";
import {createReport} from "@/api/report.js";
const CheckboxGroup = Checkbox.Group;


export default function CourseReport() {
    const {courses, isLoading, isError} = useCourses();
    const [courseOptions, setCourseOptions] = useState([]);
    const lang = useUserStore(state => state.language);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const UID = useUserStore(state => state.UID);


    useEffect(() => {
        if (isLoading) return;
        if (!courses) return;

        const options = courses.map(course => {
            if (lang === 'zh') {
                return {
                    label: course.course_name_zh,
                    value: course.course_id
                }
            }else{
                return {
                    label: course.course_name_en,
                    value: course.course_id
                }
            }
        });
        setCourseOptions(options);

    }, [isLoading]);

    function handleSubmit(){
        if (!selectedCourse)return;
        if(selectedCourse.length === 0) {
            alert("Please select at least one course");
            return;
        }

       const promises = selectedCourse.map(courseId => {
           return createReport(UID, courseId);
       });

        Promise.all(promises).then(() => {
            alert("Report submitted successfully");
        }).catch(() => {
            alert("Failed to submit report");
        })
    }

    return (
        <div  className={"h-screen relative"}>
            <NavBar ifShowBackArrow={true}>Report</NavBar>
            <Block>
                <div className={"text-base font-bold mb-4"}>
                    Select courses you already completed:
                </div>
                <CheckboxGroup
                    options={courseOptions}
                    direction='vertical'
                    onChange={(value) => setSelectedCourse(value)}
                />
            </Block>

            <button className={"bg-[#0068ff] text-white p-3 rounded-lg absolute bottom-5 w-[calc(100%-32px)] mx-4"}
                    onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    )
}