import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createConversation } from '../../features/messenger/conversationSlice'

const CreateConversation = () => {

    const dispatch = useDispatch()
    const { conversation } = useSelector(state => state.conversation)

     const handleSubmit = () => {
        
        e.preventDefault()

        const conversation = {
            senderId: userId,
            receiverId: receiverId,
        }

        dispatch(createConversation(conversation))
     }

  return (
    <div>CreateConversation</div>
  )
}

export default CreateConversation