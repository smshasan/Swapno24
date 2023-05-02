import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { loadUser } from '../../features/users/authSlice';

import './messenger.css'
import Conversations from "../conversations/Conversations";
import Message from "../message/Message";
import ChatOnline from "../chatOnline/ChatOnline";
import axios from "axios";

import {io} from "socket.io-client"


const Messenger = () => {

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    
    const socket = useRef()

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    console.log('data', user)
    
    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:5000");
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()

            })

            console.log('data', data)

        })

    }, [socket.current])

    useEffect(() => {
        socket.current.emit("addUser", user?._id)
        socket.current.on("getUsers", (users) => {
           console.log('socketUsers',users)
        })
   }, [socket.current, user?._id])

    //Get Conversations
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

    //Handle Message Submit (Post => /message/create)
    const handleSubmitMessage = async (e) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members?.find(member => member._id !==user?._id)

        socket.current.emit("sendMessage", {
            senderId: user?._id,
            receiverId,
            text: newMessage
        })

        try {
            const { data } = await axios.post(`/api/v1/message/create`, message)
            setMessages([...messages, data.saved_message])
            setNewMessage('')
        } catch (err) {
            console.log(err)
        }
    }

    //Get Messages
    useEffect(() => {
        const getMessages = async (id) => {
            try {
                const { data } = await axios.get(`/api/v1/message/${id}`)
                setMessages(data.messages)
                // console.log('message', data)
            } catch (err) {
                console.log(err)
            }

        }
        getMessages(currentChat?._id)
    }, [currentChat?._id])

    console.log('messages', messages)

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
        setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])


    //ScrollRef
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, scrollRef.current])

    return (
        <Fragment>

            <div className='messenger container'>

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

                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>

                        {
                            currentChat ? <>
                                <div className='chatBoxTop'>
                                    {
                                        messages?.map(smg => (
                                            <div ref={scrollRef}>
                                                <Message key={smg._id} message={smg} own={smg.sender === user?._id} />
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
                {/* <div className='chatOnline'>
                    <div className='chatOnlineWrapper'>
                        <ChatOnline />
                    </div>
                </div> */}

            </div>

        </Fragment>
    )
}
export default Messenger;