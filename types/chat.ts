import { OpenAIModel } from './openai';


export interface ToolUsage {
    id: string;
    name: string;
    content: string;
    loading: boolean;
}
export interface Message {
  role: Role;
  content: string;
  toolUsage?: ToolUsage[];
}

export type Role = 'assistant' | 'user';

export interface ChatBody {
  model: OpenAIModel;
  messages: Message[];
  key: string;
  prompt: string;
  temperature: number;
}

export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
  model: OpenAIModel;
  prompt: string;
  temperature: number;
  folderId: string | null;
}
