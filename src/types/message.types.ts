export interface IMessageResponse {
    username: string;
    date: Date;
    message: string;
}
  
export interface IMessageCreate {
    username: string;
    message: string;
    workspace_id: string;
}