import { ActorSubclass, Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { createActor } from "./utils/actor";
import { HttpAgent } from "@dfinity/agent";

export enum Model {
  Llama3_1_8B = "llama3.1:8b",
}

export type Role = "user" | "assistant" | "system";

export interface ChatMessage {
  role: { [key: string]: null };
  content: string;
}

interface Request {
  model: string;
  messages: ChatMessage[];
}

export class LLMClient {
  private actor: ActorSubclass;
  private static CANISTER_ID = "w36hm-eqaaa-aaaal-qr76a-cai";
  private static MAX_MESSAGES = 10;
  private static MAX_PROMPT_SIZE = 10 * 1024;

  constructor(options?: { identity?: Identity; host?: string }) {
    // Create an agent with the provided options
    const agent = new HttpAgent({
      identity: options?.identity,
      host: options?.host || "https://ic0.app", // Default to mainnet
    });

    // Make sure to fetch the root key when in development and not connecting to mainnet
    if (
      process.env.NODE_ENV !== "production" &&
      options?.host &&
      options.host !== "https://ic0.app"
    ) {
      try {
        agent.fetchRootKey();
      } catch (err) {
        console.warn(
          "Unable to fetch root key. Check if your replica is running"
        );
        console.error(err);
      }
    }

    this.actor = createActor(LLMClient.CANISTER_ID, agent);
  }

  private validateMessages(messages: ChatMessage[]): void {
    if (messages.length > LLMClient.MAX_MESSAGES) {
      throw new Error(
        `Maximum ${LLMClient.MAX_MESSAGES} messages allowed per request`
      );
    }

    const totalSize = messages.reduce(
      (acc, msg) => acc + msg.content.length,
      0
    );
    if (totalSize > LLMClient.MAX_PROMPT_SIZE) {
      throw new Error(
        `Total prompt size cannot exceed ${LLMClient.MAX_PROMPT_SIZE} bytes`
      );
    }
  }

  async prompt(model: Model, promptStr: string): Promise<string> {
    const messages = [
      {
        role: { user: null },
        content: promptStr,
      },
    ];
    this.validateMessages(messages);

    const request: Request = {
      model: model,
      messages,
    };

    return (await this.actor.v0_chat(request)) as string;
  }

  async chat(model: Model, messages: ChatMessage[]): Promise<string> {
    this.validateMessages(messages);

    const request: Request = {
      model: model,
      messages,
    };

    return (await this.actor.v0_chat(request)) as string;
  }

  // A Helper method to check if a response was truncated
  static isResponseTruncated(response: string): boolean {
    return response.length >= 200;
  }
}
