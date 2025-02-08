import { IMessageResponse, IMessageCreate } from "../types/message.types";

export class Message {
    text: string;
    owner_name: string;
    owner_username: string;
    date: Date;

    constructor(data: IMessageResponse) {
        this.text = data.text;
        this.owner_name = data.owner_name;
        this.owner_username = data.owner_username;
        this.date = data.datetime;
    }

    toJSON(workspace_id: string): IMessageCreate {
        return {
            text: this.text,
            workspace_id: workspace_id,
            owner_username: this.owner_username
        };
    }

    static fromResponse(data: IMessageResponse): Message {
        return new Message(data);
    }
}