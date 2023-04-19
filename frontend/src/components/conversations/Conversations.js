import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './conversations.css'
const Conversations = ({conversation, currentUser}) => {

    console.log('conversations', conversation?.members)

    const [user, setUser] = useState(null)

    useEffect(() => {
      
        const friendId = conversation?.members.find(member => member !== currentUser._id)
         console.log('friendId: ', friendId)
        const getUser = async (id) => {
            try {
                const {data} = await axios.get(`/api/v1/user/${id}`)
                setUser(data.user)
                console.log('data', data)
            } catch (err) {
                console.log(err)
            }
            
        }

        getUser(friendId)
      
    }, [conversation, currentUser])

    return (
        <div className='conversation'>
            <img
                className='conversationImg'
                src={user?.avatar.url}
                alt=''
            />
            <span className='conversationName'>
                {user?.name}
            </span>
        </div>
    )
}

export default Conversations