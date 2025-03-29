import { S } from "@fullcalendar/core/internal-common";
import { IMessageResponse, IMessageCreate } from "../types/message.types";

export class Message {
    id: string;
    message: string;
    username: string;
    date: Date;

    constructor(data: IMessageResponse) {
        this.id = data.id;
        this.message = data.message;
        this.username = data.username;
        this.date = data.date;
    }

    toJSON(workspace_id: string): IMessageCreate {
        return {
            id: this.id,
            message: this.message,
            workspace_id: workspace_id,
            username: this.username
        };
    }

    static fromResponse(data: IMessageResponse): Message {
        return new Message(data);
    }
}