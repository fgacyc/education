import {Routes, Route} from 'react-router-dom';
import Index from "../pages/index.jsx";
import About from "../pages/framework/about.jsx";
import Settings from "@/pages/framework/settings.jsx";
import PrivacyPolicy from "@/pages/framework/privacy-policy.jsx";
import TermsOfService from "@/pages/framework/terms-of-service.jsx";
import Admin from "@/pages/admin.jsx";
import Records from "@/pages/records.jsx";
import Record from "@/pages/record.jsx";
import CoursePlanInfo from "@/pages/course/course-plan-info.jsx";
import CourseOnGoing from "@/pages/course/course-on-going.jsx";
import CourseComplete from "@/pages/course/course-complete.jsx";
import CourseCertificate from "@/pages/course/course-certificate.jsx";
import CourseReview from "@/pages/course/course-review.jsx";

export default function MainRoutes() {
    return (
        <Routes>
            <Route path="/:UID" element={<Index/>}/>
            <Route path="/" element={<Index/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/settings" element={<Settings/>}/>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
            <Route path="/terms-of-service" element={<TermsOfService/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/admin/records" element={<Records/>}/>
            <Route path="/admin/record/:id" element={<Record/>}/>
            <Route path="/course_plan/:id" element={<CoursePlanInfo/>}/>
            <Route path="/course_plan/on-going/:id" element={<CourseOnGoing/>}/>
            <Route path="/course_plan/complete" element={<CourseComplete/>}/>
            <Route path="/course_plan/certificate/:id" element={<CourseCertificate/>}/>
            <Route path="/course_plan/review/:id" element={<CourseReview/>}/>
        </Routes>
    )
}