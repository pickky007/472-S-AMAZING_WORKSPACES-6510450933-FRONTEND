import React, { useState, useEffect } from 'react';
import { Workspace } from '../models/Workspace';
import { MessageService } from '../services/messageService';
import { Message } from '../models/Message';
import { IUserLogin } from '../types/user.types';
import { FaTrash } from 'react-icons/fa';
import { Snackbar, Alert } from '@mui/material';


interface ChatPageProps {
    workspace: Workspace;
    user: IUserLogin;
}

export const ChatPage: React.FC<ChatPageProps> = ({ workspace, user }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [useRegex, setUseRegex] = useState<boolean>(false);


    const fetchMessages = async () => {
        try {
            const fetchedMessages = await MessageService.getAllMessagesByWorkspaceId(workspace.id);
            setMessages(fetchedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSearchMessages = async () => {
        try {
            if (!searchQuery.trim()) {
                // If the search query is empty, fetch all messages
                await fetchMessages();
            } else {
                // If there's a search query, perform the search
                const searchedMessages = await MessageService.getSearchMessage(workspace.id, searchQuery, useRegex);
                setMessages(searchedMessages ?? [
                    new Message({
                        date: new Date(),
                        id: "",
                        message: "No messages found",
                        username: "System"
                    })
                ]);
            }
        } catch (error) {
            console.error('Error searching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const message = await MessageService.sendMessage({
                id: '',
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
    
            console.log("Before setting Snackbar:", snackbarOpen); // ตรวจสอบค่าก่อนเปลี่ยน
            setSnackbarOpen(true);
            console.log("After setting Snackbar:", snackbarOpen); // ตรวจสอบค่าหลังเปลี่ยน
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Chat Page</h1>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    style={styles.input}
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div style={styles.toggleContainer}>
                    <label style={styles.toggleLabel}>
                        <span>Use Regular Expression</span>
                        <input
                            type="checkbox"
                            checked={useRegex}
                            onChange={(e) => setUseRegex(e.target.checked)}
                            style={styles.toggleInput}
                        />
                        <span style={{
                            ...styles.slider,
                            backgroundColor: useRegex ? '#007bff' : '#ccc',
                        }}>
                            <span style={{
                                ...styles.sliderBefore,
                                transform: useRegex ? 'translateX(20px)' : 'translateX(0)',
                            }}></span>
                        </span>
                    </label>
                </div>
                <button style={styles.button} onClick={handleSearchMessages}>Search</button>
            </div>
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
                            <p style={styles.messageDate}>
                                <em>{msg.date?.toLocaleString() ?? "ERROR NO DATE INFORMATION"}</em>
                            </p>
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

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    Success! Message deleted.
                </Alert>
            </Snackbar>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    title: {
        fontSize: '24px',
        marginBottom: '10px',
    },
    searchContainer: {
        marginBottom: '20px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    toggleContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    toggleLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative' as 'relative', // TypeScript-compatible value
        userSelect: 'none' as 'none',      // Explicit CSS value
        gap: '10px',
    },
    toggleInput: {
        position: 'absolute' as 'absolute', // Correct type definition
        opacity: 0,
        cursor: 'pointer',
        height: 0,
        width: 0,
    },
    slider: {
        position: 'relative' as 'relative',
        display: 'inline-block',
        width: '40px',
        height: '20px',
        backgroundColor: '#ccc',
        borderRadius: '20px',
        transition: '0.4s',
    },
    sliderBefore: {
        position: 'absolute' as 'absolute',
        content: '""',
        height: '14px',
        width: '14px',
        left: '3px',
        bottom: '3px',
        backgroundColor: 'white',
        borderRadius: '50%',
        transition: '0.4s',
    },
    chatContainer: {
        display: 'flex' as 'flex',
        flexDirection: 'column' as 'column', // Explicitly cast as 'column'
        height: 'calc(100vh - 200px)',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        marginTop: '20px',
        overflow: 'hidden' as 'hidden', // Type-safe value for overflow

    },
    messagesTitle: {
        fontSize: '18px',
        marginBottom: '10px',
    },
    messagesList: {
        flex: 1, // Take up all available space
        maxHeight: 'calc(100vh - 200px)', // Ensure it doesn't exceed viewport space
        overflowY: 'auto' as const, // Enable scrolling for overflowing messages
        marginBottom: '10px',
    },
    messageItem: {
        padding: '10px',
        borderBottom: '1px solid #eee',
    },
    messageDate: {
        fontSize: '12px',
        color: '#888',
    },
    messageContent: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    textarea: {
        width: '100%',
        height: '60px',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    trashIcon: { color: 'black', cursor: 'pointer', marginLeft: '10px' },
};