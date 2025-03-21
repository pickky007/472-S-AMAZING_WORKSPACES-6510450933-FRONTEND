// src/pages/ChatPage.tsx
import React, { useState, useEffect } from 'react';
import { Workspace } from '../models/Workspace';
import { MessageService } from '../services/messageService';
import { Message } from '../models/Message';
import { IUserLogin } from '../types/user.types';
import { FaTrash } from 'react-icons/fa';
interface ChatPageProps {
    workspace: Workspace;
    user: IUserLogin;
}

export const ChatPage: React.FC<ChatPageProps> = ({ workspace, user }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    const fetchMessages = async () => {
        try {
            const fetchedMessages = await MessageService.getAllMessagesByWorkspaceId(workspace.id);
            setMessages(fetchedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [workspace.id]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const message = await MessageService.sendMessage({
                id: '' ,
                username: user.username,
                message: newMessage,
                workspace_id: workspace.id,
            });
            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage('');
            await fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleDeleteMessage = async (messageId: string) => {
        try {
            await MessageService.deleteMessage(messageId);
            setMessages((prevMessages) => prevMessages.filter(msg => msg.id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Chat Page</h1>
            <div style={styles.chatContainer}>
                <h3 style={styles.messagesTitle}>Messages</h3>
                <div style={styles.messagesList}>
                    {messages.map((msg) => (
                        <div key={msg.id} style={styles.messageItem}>
                            <div style={styles.messageContent}>
                                <p><strong>{msg.username}:</strong> {msg.message}</p>
                                {msg.username === user.username && (
                                    <FaTrash style={styles.trashIcon} onClick={() => handleDeleteMessage(msg.id)} />
                                )}
                            </div>
                            <p style={styles.messageDate}><em>{msg.date?.toLocaleString() ?? "ERROR NO DATE INFORMATION"}</em></p>
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
        overflowY: 'auto' as const,
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
    messageContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
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
    },
    trashIcon: { color: 'black', cursor: 'pointer', marginLeft: '10px' }
};
