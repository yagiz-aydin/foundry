import { FoundryLocalManager } from "foundry-local-sdk";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// Model informations 
const alias = "qwen2.5-0.5b";
const foundryLocalManager = new FoundryLocalManager()
const modelInfo = await foundryLocalManager.init(alias)

// Langchain 
const llm = new ChatOpenAI({
    model: modelInfo.id,
    configuration: {
        baseURL: foundryLocalManager.endpoint,
        apiKey: foundryLocalManager.apiKey
    },
    temperature: 0.6,
    streaming: false
});

// Prompt 
const prompt = ChatPromptTemplate.fromMessages([
    {
        role: "system",
        content: "You are a helpful assistant that fixes the grammar and spelling mistakes in the input text."
    },
    {
        role: "user",
        content: "{input}"
    }
]);

// Chain 
const chain = prompt.pipe(llm);
const input = "I love werk werk.";
console.log(`Fixing '${input}'...`);

// Invoke chain
chain.invoke({
    input
}).then(aiMsg => {
    console.log(`Response: ${aiMsg.content}`);
}).catch(err => {
    console.error("Error:", err);
});