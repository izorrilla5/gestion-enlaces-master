import * as React from "react";
import Lottie from 'react-lottie';
import * as heartbeatLoading from './heartbeat-loading.json'


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: heartbeatLoading,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    },
    speed: 2
};

const Loading = (props) => {
    return (
        <Lottie
            options={defaultOptions}
            source={require('./heartbeat-loading.json')}
            height={+props.height || 400}
            width={+props.width || 400}
        />
    )
}

export default Loading;
