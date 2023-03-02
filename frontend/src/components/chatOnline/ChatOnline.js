import React from 'react'
import './chatOnline.css'

const ChatOnline = () => {
    return (
        <div className='chatOnline'>
            <div className='chatOnlineFriend'>
                <div className='chatOnlineImgContainer'>
                    <img
                        className='chatOnlineImg'
                        src="/images/chat1.jpg"
                        alt="" />
                    <div className='chatOnlineBadge'></div>

                </div>
                <span className='chatOnlineName'>Siddik</span>
            </div>
            <div className='chatOnlineFriend'>
                <div className='chatOnlineImgContainer'>
                    <img
                        className='chatOnlineImg'
                        src="/images/chat1.jpg"
                        alt="" />
                    <div className='chatOnlineBadge'></div>

                </div>
                <span className='chatOnlineName'>Siddik</span>
            </div>
            <div className='chatOnlineFriend'>
                <div className='chatOnlineImgContainer'>
                    <img
                        className='chatOnlineImg'
                        src="/images/chat1.jpg"
                        alt="" />
                    <div className='chatOnlineBadge'></div>

                </div>
                <span className='chatOnlineName'>Siddik</span>
            </div>

        </div>
    )
}

export default ChatOnline