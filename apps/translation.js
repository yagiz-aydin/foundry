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
        content: "You are a helpful assistant that translates {input_language} to {output_language}."
    },
    {
        role: "user",
        content: "{input}"
    }
]);

// Chain 
const chain = prompt.pipe(llm);

// Input values 
const input_language = "English"
const output_language = "French"
const input = "I love to code.";
console.log(`Translating '${input}' to ${output_language}...`);

// Invoke chain
chain.invoke({
    input_language,
    output_language,
    input
}).then(aiMsg => {
    console.log(`Response: ${aiMsg.content}`);
}).catch(err => {
    console.error("Error:", err);
});