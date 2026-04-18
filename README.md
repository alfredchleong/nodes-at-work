## Quick Summary
DotBlocks: Build Polkadot smart contracts visually — no coding required.

# 🚀 Full Project Description

**DotBlocks** is a revolutionary step forward in making smart contract development accessible to everyone — not just seasoned developers.

Today, building on blockchains like Polkadot demands mastery of specialized languages like Solidity, Ink!, and Rust. This technical barrier locks out millions of potential innovators: startup founders, artists, DAO creators, educators, and entrepreneurs who have ideas but lack the deep programming skills to bring them to life.

DotBlocks removes this barrier by providing a fully visual, drag-and-drop smart contract editor specifically built for the Polkadot ecosystem. Instead of writing complex code, users can snap together modular building blocks — representing contract functions, events, variables, token operations, and logical flows — to create complete, custom smart contracts. These contracts are then exported and deployed onto the Polkadot Asset Hub with a single click.

In short: **DotBlocks makes creating real blockchain applications as easy as building with LEGO.**

As Web3 adoption accelerates — with decentralized finance (DeFi), gaming, real-world assets (RWA), decentralized identity (DID), and new forms of social media gaining traction — there’s a critical need for tools that lower the cost, time, and expertise needed to participate. DotBlocks empowers a whole new wave of builders to join the Polkadot ecosystem, innovate faster, and take advantage of parachain security, interoperability, and scalability.

By turning blockchain development from a coding exercise into a creative process, DotBlocks opens the door to mass adoption of decentralized technologies.

# 📈 Market Opportunity

The potential impact of DotBlocks is enormous.

The **no-code/low-code platform industry** is already projected to grow into a **multi-billion-dollar market** within the next five years. In traditional software, no-code tools like Webflow, Zapier, and Bubble have already unleashed waves of innovation from non-developers — and **blockchain is next**.

Consider:
- **135M+ users** have learned programming through visual block-based environments like Scratch.
- **1.1B+ internet users** worldwide engage with creator-driven, decentralized platforms — prime targets for decentralized apps (dApps).
- **Enterprises** are actively exploring blockchain adoption but face a shortage of qualified Web3 developers.

Yet today, **blockchain no-code tools barely exist**, and those that do are mostly EVM-focused (Ethereum-compatible) — leaving next-generation ecosystems like **Polkadot underserved**.

Polkadot's modular design, WASM support, and cross-chain capabilities are ideal for real-world decentralized apps. However, the technical learning curve has limited its adoption compared to simpler EVM ecosystems. DotBlocks fills that gap.

**DotBlocks positions itself to be the "Squarespace for Polkadot smart contracts."**

By making it easy to create production-grade smart contracts visually, DotBlocks captures a rapidly growing segment:
- Entrepreneurs wanting to tokenize assets or communities
- DAO operators needing custom governance contracts
- Creators launching games, NFTs, and loyalty programs
- Institutions piloting blockchain use cases in finance, supply chain, and identity

The opportunity is vast, with **Polkadot's own Web3 Foundation committing hundreds of millions of dollars** to support innovation in the ecosystem. DotBlocks directly aligns with that mission by making Polkadot development accessible, fun, and widespread.

# 🛠️ Technical Description

DotBlocks is a web-based smart contract builder engineered for the Polkadot ecosystem using modern, modular, and scalable technologies:

### Core Components:
- **Google Blockly.js**: Provides the visual block-based programming environment, allowing users to drag and connect code blocks intuitively.
- **Custom Code Generators**: Built-in translation engines that convert visual blocks into real, ready-to-deploy smart contract code in **Ink!** (Rust-based) and optionally **Solidity**.
- **Vanilla JavaScript, HTML, CSS**: Lightweight, performant frontend technology stack ensuring fast load times and compatibility across browsers.
- **cargo-contract CLI**: Compiles the generated Ink! smart contracts into WebAssembly (WASM) binaries and handles deployments to the Polkadot Asset Hub.
- **Polkadot-JS API (optional)**: Enables direct blockchain interaction from the frontend for account management, deployment signing, and contract interaction.

### Key Technical Advantages Enabled by Polkadot:
- **WASM Smart Contract Execution**: Native support for high-performance WebAssembly smart contracts via the Substrate framework.
- **Shared Parachain Security**: Deployed contracts benefit from Polkadot’s enterprise-grade security through the Relay Chain consensus model.
- **Cross-Chain Interoperability**: Contracts deployed to Asset Hub can later interact across parachains, enabling broader composability across decentralized applications.
- **Low Gas and Fast Finality**: Extremely low fees for contract deployment and interactions compared to traditional EVM chains, making it ideal for experimentation and innovation.

### How DotBlocks Works:
1. Users assemble their logic using pre-built block categories: Events, Variables, Control Flow, Token Ops, etc.
2. DotBlocks’ parser dynamically generates clean, human-readable pseudo code.
3. When the user compiles the psuedo code is fed through an AI api to convert into smart contract code under specific requirements.
4. Code is automatically compiled via `cargo-contract` and ready for deployment.
5. Users can sign transactions and deploy directly through the DotBlocks interface using the Polkadot-JS wallet connection.

## 🧪 Example: EasyACoin Smart Contract

While there is no single "official" smart contract built solely for this project, during development, we used DotBlocks to create and deploy several custom contracts. One example is **EasyACoin**, a simple mintable token contract:

- Users can mint tokens by sending a transaction.
- Each successful call issues a new balance to the sender.
- A `Minted` event is emitted on success.

This contract, along with others like conditional transfers and basic event triggers, demonstrates that the platform can generate fully functional, **non-boilerplate** smart contracts ready for production deployment.

## 📂 Repository Structure

- `frontend/` — Visual block editor built with Blockly.js
- `contracts/` — Sample smart contracts generated with DotBlocks
- `deployment/` — Scripts and instructions for deploying to Asset Hub

## 🎥 Demo Video
[Watch the demo here](https://youtu.be/e_C6CgF9gcg)

## 🖼️ Screenshots

### Visual Block Editor
![image](https://github.com/user-attachments/assets/1a68ca46-f2cb-436a-ace3-386473223257)

### Deployment to Polkadot Asset Hub
You can verify your contract on Moonscan: https://moonbase.moonscan.io/address/0x6E72291CbdC9B1D8A8581eDA27Bc473fc5B9c9Be

## 🎤 Presentation

- [Canva Slides](https://www.canva.com/design/DAGl1Luz10w/NHlIED-6P4g44mCRlnXzhw/edit?utm_content=DAGl1Luz10w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
  
## 🔮 Future Roadmap

- Expand block palette: add loops, custom functions, oracle integrations
- Collaborative Editing: allow real-time multiple users building contracts
- Local Testing: integrate an internal test sandbox with assertions
- Deployment Enhancements: easier testnet/mainnet switching for Asset Hub
- Interactive Tutorials: add mission-based beginner walkthroughs
- DID/Identity Blocks: extend to decentralized identity (DID) features

# ✅ Submission Requirements Checklist

- [x] Built with smart contracts on Polkadot Asset Hub
- [x] Open-source
- [x] Custom non-boilerplate smart contracts deployed
- [x] Clear README explaining project, demo, contract details
- [x] Demo video
- [x] Screenshots
