import {useNavigate, useSearchParams} from "react-router-dom";
import {VerificationCode} from "@arco-design/web-react";
import Block from "@/components/block.jsx";
import {useState} from "react";
import {check_if_code_correct} from "@/api/course_video_plan.js";
import {useUserStore} from "@/store/user-store.js";
import NavBar from "@/components/nav-bar.jsx";
import {createUserVideoCompletion} from "@/api/user_video_completetion.js";

export default function CourseComplete() {
    // course video plan id
    const [searchParams] = useSearchParams();
    const course_video_plan_id = searchParams.get("course_video_plan_id");
    const [verificationCode, setVerificationCode] = useState("")
    const UID = useUserStore.getState().UID;
    const navigation = useNavigate();

    async function handleSubmit() {
        if(verificationCode.length !== 6){
            alert("Please enter a valid code")
            return;
        }

        const isCodeValid = await check_if_code_correct(course_video_plan_id,verificationCode);

        if(!isCodeValid){
            alert("Code is not correct")
            return;
        }

        const  res = await  createUserVideoCompletion(UID,course_video_plan_id)
        if (res){
            alert("Success Completed")
            navigation(-1)
        }else {
            alert("Failed to complete")
        }

    }

    return (
        <div className={"h-screen relative"}>
            <NavBar ifShowBackArrow={true}>Lesson Complete</NavBar>
           <Block title={"Lesson Code"}>
               <VerificationCode
                   onChange={setVerificationCode}
                   length={6}
                   separator={({ index, character }) => {
                       return index === 2 ? '-' : ''
                   }}
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