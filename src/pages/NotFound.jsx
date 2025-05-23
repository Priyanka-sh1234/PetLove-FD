import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


function PageNotFound() {
    return (
        <>
        
            <div className='flex flex-col justify-center align-middle items-center mt-50'>
                <h1>Sorry!! Page Not Found</h1>
                <DotLottieReact
                    className='h-70 w-150 '
                    src="https://lottie.host/15ee82eb-6d33-4fb1-b99f-695e262ac9a7/ZPibTX3vE6.lottie"
                    loop
                    autoplay
                />
            </div>
        </>
    )
}

export default PageNotFound;
