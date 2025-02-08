export interface IMessageResponse {
    owner_username: string;
    owner_name: string;
    datetime: Date;
    text: string;
}
  
export interface IMessageCreate {
    owner_username: string;
    text: string;
    workspace_id: string;
}