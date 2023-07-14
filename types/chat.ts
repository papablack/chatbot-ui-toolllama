import { OpenAIModel } from './openai';

export interface BaseUsage {
    block_id: string;
    occurence : number;
    type: "tool" | "llm";
}

export interface LLMUsage extends BaseUsage {
    type: "llm";
    block_id: string;
    occurence : number;
    agent_scratchpad: string;
    input: string;
    prompt: string;
    response: string;
}


export interface ToolUsage extends BaseUsage {
    type: "tool";
    block_id: string;
    occurence : number;
    thought: string;
    tool_name: string;
    tool_description: string;
    tool_input: string;
    output: string;
}
export interface Message {
  role: Role;
  content: string;
  tools: ToolUsage[] | LLMUsage[];
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
