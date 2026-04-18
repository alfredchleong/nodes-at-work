# Polkadot Smart Contract Generator

A Flask application that leverages AI to generate, compile, review, and deploy Solidity smart contracts for the Polkadot ecosystem.

## Overview

This application provides a RESTful API service with the following features:

- **Generate & Compile**: Convert pseudocode into Solidity smart contracts
- **Code Review**: Analyze pseudocode and suggest improvements
- **Deployment**: Deploy compiled smart contracts to the network

The service uses OpenAI's GPT-4o model to generate Solidity code from pseudocode instructions.

## Prerequisites

- Python 3.6+
- Node.js and npm
- OpenAI API key
- Polkadot development environment

## Installation

1. Clone the repository
```
git clone <repository-url>
cd <project-directory>
```

2. Install Python dependencies
```
pip install flask flask_cors requests
```

3. Install Node.js dependencies
```
npm install
```

4. Set up your OpenAI API key
```
# Linux/Mac
export OPENAI_API_KEY=your_api_key

# Windows
set OPENAI_API_KEY=your_api_key
```

## Project Structure

```
/
├── app.py                     # Main Flask application
├── generationsystemprompt.txt # System prompt for code generation
├── reviewsystemprompt.txt     # System prompt for code review
├── contracts/                 # Generated smart contracts
│   └── contract.sol           # Latest generated contract
├── deployment-info.json       # Information about deployed contracts
└── package.json               # Node.js configuration
```

## API Endpoints

### Generate and Compile Smart Contract
```
POST /compile
```
**Request Body:**
```json
{
  "message": "Your pseudocode or description here"
}
```
**Response:**
```json
{
  "message": "Generated Solidity code"
}
```

### Review Pseudocode
```
POST /review
```
**Request Body:**
```json
{
  "message": "Your pseudocode here"
}
```
**Response:**
```json
{
  "message": "Review comments and suggestions"
}
```

### Deploy Smart Contract
```
POST /deploy
```
**Response:**
```json
{
  "message": "Deployment information (JSON string)"
}
```

## Usage Examples

### Generate a Smart Contract

```bash
curl -X POST http://localhost:5000/compile \
  -H "Content-Type: application/json" \
  -d '{"message": "Create a token with name \"PolkaDot Test Token\", symbol \"PDTT\", and total supply of 1,000,000"}'
```

### Review Pseudocode

```bash
curl -X POST http://localhost:5000/review \
  -H "Content-Type: application/json" \
  -d '{"message": "function transfer(address to, uint256 amount) { balances[msg.sender] -= amount; balances[to] += amount; }"}'
```

### Deploy a Contract

```bash
curl -X POST http://localhost:5000/deploy
```

## Running the Application

```bash
python app.py
```

By default, the server will run on port 5000. You can change the port by setting the `PORT` environment variable.

## NPM Scripts

The application expects the following npm scripts to be defined in `package.json`:

- `npm run compile` - Compiles the Solidity code
- `npm run deploy` - Deploys the compiled contract

## Logging

The application uses Python's built-in logging module configured to log at the INFO level. Logs include timestamps and basic information about requests and any errors that occur.

## Error Handling

The application handles errors from the OpenAI API and other operations, returning appropriate HTTP status codes and error messages.

## License

[Your License Here]

## Contributing

[Your Contributing Guidelines Here]