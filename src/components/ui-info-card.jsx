import {useUserStore} from "@/store/user-store.js";
import {useInfoCardStore} from "@/store/info-card-store.js";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

function getFormattedTodayDate() {
    const today  = new Date();
    return today.toLocaleDateString('en-US');
}

const UiInfoCard  = ({data}) => {
    const user = useUserStore(state => state.user);
    const formattedDate = getFormattedTodayDate();
    const [currentCardIndex,setCurrentCardIndex] = useInfoCardStore(state => [state.currentCard,state.setCurrentCard]);

    const [enrolledCoursesIDs,completedCoursesIDs] = useInfoCardStore(state => [state.enrolledCoursesIDs,state.completedCoursesIDs]);

    const [activeNumber, setActiveNumber] = useState( 0);
    const [onGoingNumber, setOnGoingNumber] = useState(0);
    const [completedNumber, setCompletedNumber] = useState(0);
    const {t} = useTranslation();

    useEffect(() => {
        if(data){
           setActiveNumber(data.length);
        }
    }, [data]);

    useEffect(() => {
        if(enrolledCoursesIDs){
            setOnGoingNumber(enrolledCoursesIDs.length);
        }
    }, [enrolledCoursesIDs]);

    useEffect(() => {
        if(completedCoursesIDs){
            setCompletedNumber(completedCoursesIDs.length);
        }
    }, [completedCoursesIDs]);



    const cardData = [
        {
            title: t("Active"),
            count: activeNumber
        },
        {
            title: t("On Going"),
            count:  onGoingNumber
        },
        {
            title: t("Completed"),
            count:  completedNumber
        }
    ]


    return (
        <div className={"w-full bg-white rounded-lg p-5 shadow"}>
            <div className={"flex justify-between items-center h-16"}>
                <div>
                    <div className={"text-xs text-gray-400"}>{formattedDate}</div>

                    <div className={`text-lg font-semibold h-7 ${!user && "animate-pulse"}`}>
                        {
                            user ? `Hey ${user?.name}!` : ""
                        }
                    </div>
                </div>
                {
                    user && <img src={user?.picture} alt="avatar" className={`w-16 h-16 rounded-xl `}/>
                }
            </div>
            <div className={"flex justify-between mt-4"}>
                {
                    cardData.map((card,index) => (
                        <div key={index}
                             className={`w-[70px] ${currentCardIndex === index ? 'bg-blue-500 text-white' : ''} rounded-xl flex flex-col justify-center items-center py-3 cursor-pointer`}
                             onClick={() => setCurrentCardIndex(index)}
                        >
                            <div className={"text-3xl"}>{card.count}</div>
                            <div className={`text-xs  ${currentCardIndex === index ? 'text-gray-100' : ''}`}>{card.title}</div>
                        </div>
                    ))
                }


            </div>
        </div>
    );
}

export default UiInfoCard;