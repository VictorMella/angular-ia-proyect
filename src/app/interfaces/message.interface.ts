export interface IMessage {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
  audioUrl?: string;
}
