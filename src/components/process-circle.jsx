import React from 'react';



const ProcessCircle= ({ progress }) => {
    // 确保进度在 0 到 100 的范围内
    const normalizedProgress = Math.max(0, Math.min(100, progress));

    // 圆的半径
    const radius = 16;
    // 圆的周长
    const circumference = 2 * Math.PI * radius;

    // 计算 stroke-dashoffset 的值
    const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;


    return (
        <div className="relative size-14">
            <svg className="size-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-gray-200 "
                    strokeWidth="2"
                ></circle>
                <g className="origin-center -rotate-90 transform">
                    {normalizedProgress > 0 && (
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            className="stroke-current text-blue-600 "
                            strokeWidth="2"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                        ></circle>
                    )}
                </g>
            </svg>
        </div>
    );
};

export default ProcessCircle;
