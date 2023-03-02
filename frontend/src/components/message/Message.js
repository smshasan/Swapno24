import React from "react";
import './message.css'

import TimeAgo from 'react-timeago'

const Message = ({message, own}) => {
    console.log('message', message)
    return (
        <div className={own ? "message own" : "message"}>
            <div className='messageTop'>
               {own || <img
                    className='messageImg'
                    src='/images/chat1.jpg'
                    alt='message'
                />} 

                <p className='messageText'>
                    {message?.text}
                </p>
            </div>
            <div className='messageBottom'>
                <TimeAgo date={message?.createdAt}/>
            </div>
        </div>
    )
}

export default Message