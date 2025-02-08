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
     * @deprecated
     */
    static async getMockupMessage(workspaceId: string): Promise<Message[]> {

        return [
            Message.fromResponse({
                datetime: new Date(Date.UTC(2025, 0, 1, 0, 0, 0, 0)),
                owner_name: "A",
                owner_username: "A",
                text: "Happy Newyear!",
            }),
            Message.fromResponse({
                datetime: new Date(Date.UTC(2025, 0, 1, 1, 0, 0, 0)),
                owner_name: "A",
                owner_username: "A",
                text: "Hello Everyone?",
            }),
            Message.fromResponse({
                datetime: new Date(Date.UTC(2025, 0, 1, 1, 30, 0, 0)),
                owner_name: "B",
                owner_username: "B",
                text: "Happy Newya :D",
            }),
            Message.fromResponse({
                datetime: new Date(Date.UTC(2025, 0, 1, 2, 30, 0, 0)),
                owner_name: "C",
                owner_username: "C",
                text: "Please enter your name and password for this message to be sent to the server and your account will be automatically updated when the message is sent back again and the next message",
            })
        ];
    }

    /**
     * @param message **ต้องกำหนด message.workspace_id, message.text และ message.owner_username มาด้วย**
     */
    static async sendMessage(message: IMessageCreate): Promise<Message> {
        try {
            const response = await axios.post<IMessageResponse>(
                ENDPOINTS.WORKSPACE.SEND_MESSAGE(message.workspace_id),
                {
                    text: message.text,
                    owner_username: message.owner_username,
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
}