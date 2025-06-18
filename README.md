# ChatBot Pro 🤖

A modern, production-ready AI chatbot web application built with React, TypeScript, and Tailwind CSS. Features secure authentication, real-time chat simulation, voice input, and advanced user experience enhancements.

![ChatBot Pro Screenshot](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center)

## ✨ Features

### 🔐 Authentication System

- **Secure JWT-based authentication** with register/login flows
- **Form validation** with real-time feedback and password strength indicators
- **Demo mode** - Create any account to explore features (data stored locally)
- **Persistent sessions** with automatic token management

### 💬 Advanced Chat Interface

- **Real-time message streaming** with typing indicators
- **Auto-scroll** to latest messages with smooth animations
- **Message rating system** (thumbs up/down for bot responses)
- **Copy message functionality** with visual feedback
- **Input history navigation** (Ctrl + ↑/↓ arrows)
- **Responsive message bubbles** with proper sender identification

### 🎙️ Voice Integration

- **Speech-to-text input** using Web Speech API
- **Visual recording indicators** with real-time feedback
- **Cross-browser compatibility** with graceful fallbacks
- **Error handling** for unsupported browsers

### 📝 Productivity Features

- **Prompt templates** with categorized suggestions
- **Chat export** in JSON and text formats
- **Clear chat history** with confirmation
- **Keyboard shortcuts** for enhanced productivity

### 🎨 Modern Design System

- **Dual theme support** (Light/Dark/System preference)
- **Responsive design** optimized for mobile, tablet, and desktop
- **Smooth animations** and micro-interactions throughout
- **Comprehensive color system** with 6+ color ramps
- **Professional typography** with proper hierarchy
- **8px spacing system** for consistent layouts

### 🛠️ Technical Excellence

- **TypeScript** for type safety and better developer experience
- **Modular architecture** with clean separation of concerns
- **Custom React hooks** for reusable logic
- **Context API** for state management
- **Local storage persistence** for user data and preferences
- **Error boundaries** and comprehensive error handling

## 🚀 Quick Start

### Prerequisites

- Node.js 22+ and npm
- Modern web browser with JavaScript enabled

### Installation

1. **Clone and install dependencies:**

```bash
git clone <repository-url>
cd chatbot-app
npm install
```

2. **Start the development server:**

```bash
npm run dev
```

3. **Open your browser:**
   Navigate to `http://localhost:5173` to access the application.

### Demo Account

This is a demonstration application - simply create any account with a valid email format to explore all features. All data is stored locally in your browser for privacy and security.

## 📱 Usage Guide

### Getting Started

1. **Create an account** or sign in on the welcome screen
2. **Start chatting** by typing a message or using voice input
3. **Explore features** like prompt templates and theme switching

### Keyboard Shortcuts

- `Enter` - Send message
- `Shift + Enter` - New line in message
- `Ctrl + ↑/↓` - Navigate input history
- `Esc` - Close prompt templates (when open)

### Voice Input

1. Click the **microphone icon** in the message input
2. **Speak clearly** when the recording indicator appears
3. Your speech will be **automatically converted to text**
4. **Edit if needed** and send your message

### Prompt Templates

1. Click the **lightbulb icon** to open templates
2. **Browse categories**: Education, Development, Writing, Business
3. **Select a template** to auto-fill your message input
4. **Customize** the prompt before sending

### Export Conversations

1. Use the **export buttons** in the header
2. Choose between **JSON** (structured data) or **TXT** (readable format)
3. Files are **automatically downloaded** with timestamps

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication forms
│   ├── chat/           # Chat interface components
│   ├── layout/         # Layout components (Header)
│   └── ui/             # Base UI components (Button, Input)
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   ├── ChatContext.tsx # Chat functionality
│   └── ThemeContext.tsx # Theme management
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts
│   └── useSpeechRecognition.ts
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
│   ├── constants.ts    # App constants and config
│   └── helpers.ts      # Helper functions
└── main.tsx           # Application entry point
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 🎯 Technical Highlights

### State Management

- **React Context API** for global state management
- **Custom hooks** for encapsulating complex logic
- **Local storage integration** for data persistence

### Performance Optimizations

- **Code splitting** with React.lazy (ready for implementation)
- **Memoization** of expensive computations
- **Optimized re-renders** with proper dependency arrays
- **Efficient bundle size** with tree-shaking

### Accessibility Features

- **Semantic HTML** structure throughout
- **ARIA labels** and roles for screen readers
- **Keyboard navigation** support
- **Focus management** for modal interactions
- **High contrast** color schemes in both themes

### Security Considerations

- **Input validation** and sanitization
- **XSS protection** through React's built-in escaping
- **Secure token storage** with automatic cleanup
- **HTTPS-ready** configuration for production

## 🌐 Browser Support

- **Chrome** 80+ (recommended)
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+

_Voice input requires browsers with Web Speech API support_

## 🔧 Configuration

### Environment Variables

Create a `.env` file for custom configuration:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=ChatBot Pro
```

### Customization

- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Prompts**: Update `PROMPT_TEMPLATES` in `src/utils/constants.ts`
- **Bot responses**: Customize `BOT_RESPONSES` array for different personalities

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Deploy to Vercel

```bash
npx vercel --prod
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the excellent framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Unsplash** for high-quality stock photography

## 📞 Support

For support, email support@chatbotpro.com or join our Slack channel.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**

_Ready for production deployment with modern web standards and best practices._
