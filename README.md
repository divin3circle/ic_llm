# ICP LLM Client

A TypeScript client for interacting with the LLM canister on the Internet Computer.

## Installation

```bash
npm install icp-llm-client
```

## Usage

```typescript
import { LLMClient, Model } from "icp-llm-client";

// Create a client instance
const client = new LLMClient();

// Simple prompt
const response = await client.prompt(
  Model.Llama3_1_8B,
  "What is the Internet Computer?"
);

// Chat with multiple messages
const chatResponse = await client.chat(Model.Llama3_1_8B, [
  {
    role: { system: null },
    content: "You are a helpful assistant",
  },
  {
    role: { user: null },
    content: "What is the Internet Computer?",
  },
]);
```

## Limitations

### Model Support

- Currently only supports Llama 3.1 8B model
- More models planned based on community feedback

### Request Constraints

- Maximum 10 messages per chat request
- Prompt length across all messages cannot exceed 10kiB
- Output is limited to 200 tokens (responses will be truncated)

### Privacy Considerations

- Prompts are not completely private
- AI Worker operators can theoretically see prompts
- User identity remains anonymous
- DFINITY only logs aggregate metrics (request counts, token usage)

## Best Practices

1. **Handle Truncated Responses**

   ```typescript
   const response = await client.prompt(Model.Llama3_1_8B, "Your prompt");
   if (response.length >= 200) {
     console.log("Response was truncated. Consider breaking up your request.");
   }
   ```

2. **Keep Prompts Concise**

   ```typescript
   // Good - concise prompt
   const response = await client.prompt(
     Model.Llama3_1_8B,
     "What is ICP? Be brief."
   );

   // Avoid - too long
   const longResponse = await client.prompt(
     Model.Llama3_1_8B,
     "Write a detailed essay about the Internet Computer..."
   );
   ```

3. **Break Up Long Conversations**

   ```typescript
   // Instead of sending many messages at once
   const messages = [
     { role: { system: null }, content: "You are a helpful assistant" },
     { role: { user: null }, content: "Question 1" },
     { role: { assistant: null }, content: "Answer 1" },
     { role: { user: null }, content: "Question 2" },
     // ... more messages
   ];

   // Break into multiple requests
   const firstPart = await client.chat(Model.Llama3_1_8B, messages.slice(0, 5));
   const secondPart = await client.chat(Model.Llama3_1_8B, messages.slice(5));
   ```

## Error Handling

```typescript
try {
  const response = await client.prompt(Model.Llama3_1_8B, "Your prompt");
  console.log(response);
} catch (error) {
  if (error.message.includes("10kiB")) {
    console.error("Prompt too long. Please reduce the length.");
  } else if (error.message.includes("10 messages")) {
    console.error("Too many messages. Please reduce the number of messages.");
  } else {
    console.error("An error occurred:", error);
  }
}
```

## License

MIT
