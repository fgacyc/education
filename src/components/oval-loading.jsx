import {Oval} from "react-loader-spinner";

export default function OvalLoading() {
    return <Oval
        visible={true}
        height="80"
        width="80"
        color="#0A74DA"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
        secondaryColor="#0A74DA"
    />
}