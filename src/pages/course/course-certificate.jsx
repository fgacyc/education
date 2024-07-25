import NavBar from "@/components/nav-bar.jsx";
import {useUserStore} from "@/store/user-store.js";
import {useCourseCertificate} from "@/api/certificate.js";
import {useParams} from "react-router-dom";
import OvalLoading from "@/components/oval-loading.jsx";
import {datetimeFormatToMMDDYYYY} from "@/tools.js";

export default function CourseCertificate(){
    const {id} = useParams();
    const lang = useUserStore.getState().language;
    const user = useUserStore.getState().user;
    const UID = useUserStore.getState().UID;
    const {courseCertificate,isLoading,isError} = useCourseCertificate(id,UID);

    console.log("courseCertificate",courseCertificate)
    return (
        <div className={"h-screen relative bg-white"}>
            <NavBar ifShowBackArrow={true}>Certificate</NavBar>
            {
                !isLoading &&!isError && <div className="flex min-h-[80vh] items-center justify-center bg-background p-6">
                    <div className="w-full max-w-[800px] rounded-xl border border-input bg-card p-8 shadow-lg">
                        <div className="flex flex-col items-center justify-center gap-6">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <img src={"/cyc-logo.png"} alt="logo" className="w-20 mb-2"/>
                                <h1 className="text-2xl font-bold text-center">Course Completion Certificate</h1>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <h2 className="text-2xl font-semibold">Congratulations!</h2>
                                <p className="text-lg font-medium">This certificate is awarded to</p>
                                <h3 className="text-2xl font-bold">{user.name}</h3>
                                <p className="text-lg font-medium">for successfully completing the</p>
                                <h4 className="text-xl font-bold h-8">
                                    {lang === "en" ? courseCertificate?.course_name_en : courseCertificate?.course_name_zh}
                                </h4>
                                <p className="text-lg font-medium">
                                    on <span className="font-bold">
                                {courseCertificate && datetimeFormatToMMDDYYYY(courseCertificate.created_at)}
                            </span>
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                {/*<Button>Download Certificate</Button>*/}
                                {/*<Button variant="outline">Share Certificate</Button>*/}
                                <button
                                    className={"bg-[#0068ff] text-white p-3 rounded-lg absolute bottom-5 w-[calc(100%-32px)] mx-4"}
                                    // onClick={viewCertificate}
                                >
                                    Share Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {
                isLoading && <div className={"absolute inset-0 flex justify-center items-center"}>
                    <OvalLoading/>
                </div>
            }
        </div>
    )
}