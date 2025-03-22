import { Actor, HttpAgent, Identity } from "@dfinity/agent";

const idlFactory = ({ IDL }: { IDL: any }) => {
  const Role = IDL.Variant({
    user: IDL.Null,
    assistant: IDL.Null,
    system: IDL.Null,
  });

  const ChatMessage = IDL.Record({
    role: Role,
    content: IDL.Text,
  });

  const Request = IDL.Record({
    model: IDL.Text,
    messages: IDL.Vec(ChatMessage),
  });

  return IDL.Service({
    v0_chat: IDL.Func([Request], [IDL.Text], []),
  });
};

export const createActor = (
  canisterId: string,
  agentOrIdentity?: HttpAgent | Identity
) => {
  let agent: HttpAgent;

  if (!agentOrIdentity) {
    // No agent or identity provided, create a default agent for mainnet
    agent = new HttpAgent({ host: "https://ic0.app" });
  } else if (agentOrIdentity instanceof HttpAgent) {
    // An agent was provided directly
    agent = agentOrIdentity;
  } else {
    // An identity was provided, create an agent with it
    agent = new HttpAgent({
      identity: agentOrIdentity,
      host: "https://ic0.app", // Default to mainnet
    });
  }

  // For local development only
  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};
