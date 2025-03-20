import { LLMClient, Model } from "./index";

async function main() {
  const client = new LLMClient();

  try {
    // Test simple prompt
    console.log("Testing simple prompt...");
    const response = await client.prompt(
      Model.Llama3_1_8B,
      "What is the Internet Computer? Be very brief, under 50 words."
    );
    console.log("Response:", response);
    console.log(
      "Note: Response is truncated to 200 tokens as per canister limitations"
    );

    // Test chat with multiple messages
    console.log("\nTesting chat with multiple messages...");
    const chatResponse = await client.chat(Model.Llama3_1_8B, [
      {
        role: { system: null },
        content:
          "You are a helpful assistant. Be concise and brief in your responses.",
      },
      {
        role: { user: null },
        content: "What is the Internet Computer? Keep it under 50 words.",
      },
    ]);
    console.log("Chat Response:", chatResponse);
    console.log(
      "Note: Response is truncated to 200 tokens as per canister limitations"
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
