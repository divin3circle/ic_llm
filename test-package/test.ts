import { LLMClient, Model } from "icp-llm-client";

async function test() {
  const client = new LLMClient();

  try {
    console.log("Testing simple prompt...");
    const response = await client.prompt(
      Model.Llama3_1_8B,
      "What is the Internet Computer? Be brief."
    );
    console.log("Response:", response);

    if (LLMClient.isResponseTruncated(response)) {
      console.log("Note: Response was truncated (200 token limit)");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

test();
