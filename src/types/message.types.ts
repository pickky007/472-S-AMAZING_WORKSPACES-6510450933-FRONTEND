export interface IMessageResponse {
    id: string;
    username: string;
    date: Date;
    message: string;
}
  
export interface IMessageCreate {
    id: string;
    username: string;
    message: string;
    workspace_id: string;
}