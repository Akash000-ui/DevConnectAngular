export interface NotificationModel{
  id: number;
  sender: { id: number; username: string };
  receiver   : { id: number; username: string };
  message: string;
  status: 'UNREAD' | 'READ';
  createdAt: string;
}
