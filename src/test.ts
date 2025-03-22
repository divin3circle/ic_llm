import { LLMClient, Model } from "./index";
import { HttpAgent } from "@dfinity/agent";

async function main() {
  // Test with default settings (mainnet)
  console.log("Testing with default settings (mainnet)...");
  const defaultClient = new LLMClient();

  // Test with custom host option
  console.log("\nTesting with custom host...");
  const customHostClient = new LLMClient({
    host: "https://ic0.app", // Explicitly set mainnet
  });

  try {
    // Test the client with default settings
    console.log("Testing prompt with default client...");
    const response = await defaultClient.prompt(
      Model.Llama3_1_8B,
      "What is the Internet Computer? Be very brief."
    );
    console.log("Response from default client:", response);

    // Test the client with custom host
    console.log("\nTesting prompt with custom host client...");
    const customResponse = await customHostClient.prompt(
      Model.Llama3_1_8B,
      "What is the Internet Computer? Answer in one sentence."
    );
    console.log("Response from custom host client:", customResponse);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
