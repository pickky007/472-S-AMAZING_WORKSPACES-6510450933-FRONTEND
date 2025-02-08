// src/pages/ChatPage.tsx
import React, { useState, useEffect } from 'react';
import { Workspace } from '../models/Workspace';
import { MessageService } from '../services/messageService';
import { Message } from '../models/Message';
import { IUserLogin } from '../types/user.types';

interface ChatPageProps {
    workspace: Workspace;
    user: IUserLogin;
}

export const ChatPage: React.FC<ChatPageProps> = ({ workspace, user }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const fetchedMessages = await MessageService.getMockupMessage(workspace.id);
                setMessages(fetchedMessages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [workspace.id]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const message = await MessageService.sendMessage({
                owner_username: user.username,
                text: newMessage,
                workspace_id: workspace.id,
            });
            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Chat Page</h1>
            <h2 style={styles.subtitle}>Workspace Information</h2>
            <p><strong>ID:</strong> {workspace.id}</p>
            <p><strong>Name:</strong> {workspace.name}</p>
            <p><strong>Description:</strong> {workspace.description}</p>
            <p><strong>Owner:</strong> {workspace.owner}</p>
            <div style={styles.chatContainer}>
                <h3 style={styles.messagesTitle}>Messages</h3>
                <div style={{ ...styles.messagesList, maxHeight: '300px', overflowY: 'auto', marginBottom: '10px' }}>
                    {messages.map((msg, index) => (
                        <div key={index} style={styles.messageItem}>
                            <p><strong>{msg.owner_name}:</strong> {msg.text}</p>
                            <p style={styles.messageDate}><em>{msg.date.toLocaleString()}</em></p>
                        </div>
                    ))}
                </div>
                <textarea
                    style={styles.textarea}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button style={styles.button} onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    },
    title: {
        fontSize: '24px',
        marginBottom: '10px'
    },
    subtitle: {
        fontSize: '20px',
        marginBottom: '10px'
    },
    chatContainer: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        marginTop: '20px'
    },
    messagesTitle: {
        fontSize: '18px',
        marginBottom: '10px'
    },
    messagesList: {
        maxHeight: '300px',
        overflowY: 'auto',
        marginBottom: '10px'
    },
    messageItem: {
        padding: '10px',
        borderBottom: '1px solid #eee'
    },
    messageDate: {
        fontSize: '12px',
        color: '#888'
    },
    textarea: {
        width: '100%',
        height: '60px',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px'
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};
