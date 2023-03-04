import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { loadUser } from '../../features/users/authSlice';

// import { fetchConversation } from "../../features/messenger/conversationSlice";


import './messenger.css'
import Conversations from "../conversations/Conversations";
import Message from "../message/Message";
import ChatOnline from "../chatOnline/ChatOnline";
import axios from "axios";



const Messenger = () => {

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')

    const scrollRef = useRef()



    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    const { conversation } = useSelector((state) => state.conversation)
    console.log('data', user)
    console.log('conversation', conversation)







    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    useEffect(() => {
        const getConversations = async (userId) => {
            try {
                const res = await axios.get(`/api/v1/conversations/${userId}`)
                setConversations(res.data.conversation)
                console.log("res", res.data.conversation)
                console.log("resId", res.data)
            } catch (err) {
                console.log(err)
            }
        }
        getConversations(user?._id)
    }, [user?._id])

    useEffect(() => {
        const getMessages = async (id) => {
            try {
                const { data } = await axios.get(`/api/v1/message/${id}`)
                setMessages(data.messages)
                console.log('message', data)
            } catch (err) {
                console.log(err)
            }

        }
        getMessages(currentChat?._id)
    }, [currentChat])

    console.log('messages', messages)


    const handleSubmitMessage = async (e) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        try {
            const { data } = await axios.post(`/api/v1/message/create`, message)
            setMessages([...messages, data.saved_message])
            setNewMessage('')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <Fragment>

            <div className='messenger'>

                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>

                        <input placeholder="Search for friends" className='chatMenuInput' />

                        {
                            conversations.map(con => (
                                <div onClick={() => setCurrentChat(con)}>
                                    <Conversations conversation={con} currentUser={user} />
                                </div>
                            ))
                        }

                        {/* <Conversations />
                            <Conversations />
                            <Conversations /> */}
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>

                        {
                            currentChat ? <>



                                <div className='chatBoxTop'>
                                    {
                                        messages?.map(message => (
                                            <div ref={scrollRef}>
                                                <Message key={message._id} message={message} own={message.sender === user?._id} />
                                            </div>

                                        ))

                                    }
                                </div>
                                
                                <div className='chatBoxBottom'>
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="Ask if you have any query..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    >
                                    </textarea>

                                    <button
                                        className="chatSubmitButton"
                                        onClick={handleSubmitMessage}
                                    >
                                        Send
                                    </button>
                                </div></> : <span className="noConversationText">Open conversation to start a chat</span>}
                    </div>
                </div>
                <div className='chatOnline'>
                    <div className='chatOnlineWrapper'>
                        <ChatOnline />
                    </div>
                </div>

            </div>

        </Fragment>
    )
}
export default Messenger;