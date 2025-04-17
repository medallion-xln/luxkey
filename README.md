# LuxKey - Luxury Real Estate Platform

LuxKey is a modern, full-stack web platform for browsing and interacting with luxury real estate listings. Built with Bun and HTMX, it offers a fast, SEO-friendly, and interactive experience without the complexity of a JavaScript-heavy frontend.

## Features

- 🚀 Fast and responsive interface
- 🔍 Advanced property search
- 📱 Mobile-friendly design
- 🎨 Modern, clean UI with Tailwind CSS
- ⚡ HTMX for dynamic interactions
- 🔒 SEO optimized

## Prerequisites

- [Bun](https://bun.sh) (v1.0.0 or later)
- Node.js (v18 or later)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/luxkey.git
   cd luxkey
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Start the development server:
   ```bash
   bun run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
luxkey/
├── src/
│   ├── index.ts          # Main server file
│   └── views/            # EJS templates
│       ├── layout.ejs    # Base layout
│       └── index.ejs     # Home page
├── public/
│   └── css/
│       └── styles.css    # Custom styles
├── package.json
├── tsconfig.json
└── README.md
```

## Development

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run start` - Start production server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 