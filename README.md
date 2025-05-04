# Yuca Media: Empowering Creators Through Blockchain

<p align="center">
  <img src="src/assets/images/yuca-media-logo.svg" alt="Yuca Media Logo" width="120" />
</p>

## About Yuca Media

Yuca Media is a digital development company building Web2/Web3 hybrid platforms that bridge the gap between traditional entertainment and blockchain technology. Established in 2025, our mission is to address the severe shortage of work opportunities in the entertainment community by creating decentralized production and funding opportunities for independent artists, filmmakers, and crew members.

### Our Dual Structure

- **Yuca Media**: Our parent company focused on Web2/Web3 platform development, cybersecurity consulting, NFTs, and smart contract services. Our flagship commercial project, the CryptoLottery dApp, generates sustainable revenue.

- **Yuca Studios**: Our creative subsidiary offering blockchain-driven production services for film, music videos, and creative content through community governance.

## Project Overview

This repository contains the frontend application for Yuca Media's web platform, built with modern web technologies and integrated with the Solana blockchain.

### Key Features

- Interactive dashboard for creators to submit, fund, and monitor projects
- Solana wallet integration for secure blockchain transactions
- CryptoLottery dApp with transparent, verifiable drawings
- Community governance tools for voting on creative projects
- ADA-compliant, accessible user interface

## Technology Stack

- **Frontend**: React with Vite for fast development
- **Styling**: Tailwind CSS for modern, responsive design
- **3D Visualization**: Three.js for advanced animations
- **Blockchain**: Solana for fast, low-cost transactions
- **Security**: Comprehensive security measures (see [SECURITY.md](security/SECURITY.md))

## Project Structure

```
/yucamedia-website/
├── public/                  # Static assets served as-is
├── src/
│   ├── assets/              # Images, fonts, and other static resources
│   ├── animations/          # Animation-related code
│   ├── components/          # React components
│   ├── styles/              # CSS and styling files
│   ├── scripts/             # JavaScript utilities and helpers
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── security/                # Security documentation and configuration
│   ├── SECURITY.md          # Security policies
│   ├── .env.sample          # Template for environment variables
│   └── hardening-guides/    # Security hardening documentation
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite build tool configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 7.x or higher
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yucamedia/yucamedia-website.git
   cd yucamedia-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp security/.env.sample .env
   ```
   Update the values in `.env` with your specific configuration.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to http://localhost:3000

### Building for Production

```bash
npm run build
```

The optimized files will be available in the `dist` directory.

## Roadmap

- **Q2 2025**: Finalize business plan, establish legal entities, begin platform development
- **Q3 2025**: Begin hiring core team and develop CryptoLottery beta version
- **Q4 2025**: Launch platform beta; start pre-production for Yuca Studios' first pilot
- **Q2 2026**: Release first Yuca Studios pilot project and open platform to broader creative community

## Accessibility

This project is committed to WCAG 2.1 Level AA compliance. Our accessibility features include:

- Semantic HTML structure
- Keyboard navigation support
- ARIA attributes for screen readers
- Skip-to-content links
- Sufficient color contrast
- Text alternatives for non-text content
- Interactive accessibility widget

## Security

For security policies and guidelines, please see [SECURITY.md](security/SECURITY.md). Security vulnerabilities should be reported to security@yucamedia.com.

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## License

This project is licensed under the terms of the LICENSE file included in this repository.

---

## Recommended VS Code Extensions

For the best development experience, we recommend installing the following VS Code extensions:

- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- GitLens
- Prettier
- ESLint
- GitHub Copilot

---

<p align="center">
  Built with ❤️ by the Yuca Media Team
</p>
