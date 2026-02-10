# Sample: Hello Foundry Local!

This is a simple example of how to use the Foundry Local SDK to run a model locally and make requests to it. The example demonstrates how to set up the SDK, initialize a model, and make a request to the model.

Before Start, first [install foundry](https://learn.microsoft.com/en-us/azure/ai-foundry/foundry-local/get-started?view=foundry-classic)
```bash
brew tap microsoft/foundrylocal
brew install foundrylocal
```

Install the Foundry Local SDK and OpenAI packages using npm:

```bash
npm install 
```

Run the application using Node.js:

```bash
node src/app.js
```

Run the foundry local list:

```bash
foundry model list
```

Run the check for status:

```bash
foundry service status
```