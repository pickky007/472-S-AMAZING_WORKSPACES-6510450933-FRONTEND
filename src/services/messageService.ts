import axios from "../apis/axios";
import { ENDPOINTS } from "../apis/endpoints";
import { Message } from "../models/Message";
import { IMessageCreate, IMessageResponse } from "../types/message.types";

export class MessageService {
    static async getAllMessagesByWorkspaceId(
        workspaceId: string,
    ): Promise<Message[]> {
        try {
            const response = await axios.get<IMessageResponse[]>(
                ENDPOINTS.WORKSPACE.GET_MESSAGES(workspaceId),
                {
                    withCredentials: true,
                },
            );
            return response.data.map((message) => Message.fromResponse(message));
        } catch (error) {
            throw new Error('Failed to fetch messages');
        }
    }

    /**
     * @param message **ต้องกำหนด message.workspace_id, message.text และ message.owner_username มาด้วย**
     */
    static async sendMessage(message: IMessageCreate): Promise<Message> {
        try {
            const response = await axios.post<IMessageResponse>(
                ENDPOINTS.WORKSPACE.SEND_MESSAGE(),
                {
                    
                    message: message.message,
                    username: message.username,
                    workspace_id: message.workspace_id
                },
                {
                    withCredentials: true,
                },
            );
            return Message.fromResponse(response.data);
        } catch (error) {
            throw new Error('Failed to send message :(');
        }
    }

    static async deleteMessage(id:string){
        try {
            const response = await axios.post<IMessageResponse>(
                ENDPOINTS.WORKSPACE.DELETE_MESSAGE(),
                {
                    id: id+''
                },
                {
                    withCredentials: true,
                },
            );
        } catch (error) {
            throw new Error('Failed to delete message :(' + error);
        }
    }

    static async getSearchMessage(workspace_id: string, query: string, regex: boolean = false): Promise<Message[] | null> {
        try {
            const response = await axios.get<IMessageResponse[]>(
                ENDPOINTS.WORKSPACE.SEARCH_MESSAGES(workspace_id, query, regex),
                {
                    withCredentials: true,
                },
            );
            if (response.data == null) return null;
            return response.data.map((message) => Message.fromResponse(message));
        } catch (error) {
            throw new Error('Failed to fetch messages');
        }
    }

}