# 🪐 3D Solar System Visualization

A stunning, interactive 3D solar system built with **Next.js** and **Three.js**, featuring realistic planetary textures, orbital mechanics, and real-time speed controls.

![Solar System Preview](https://img.shields.io/badge/Built%20with-Next.js%20%7C%20Three.js-blue)

## ✨ Features

- **🌍 Realistic 3D Planets**: All 8 planets with authentic NASA textures
- **🌟 Interactive Controls**: Adjust orbital speeds for each planet in real-time
- **🎮 Camera Navigation**: Orbit, zoom, and pan around the solar system
- **🌌 Immersive Environment**: Milky Way background with ambient lighting
- **⏸️ Pause/Resume**: Control animation playback
- **🎨 Modern UI**: Glassmorphism design with gradient effects
- **📱 Responsive**: Works on desktop and mobile devices
- **✨ Post-processing**: Bloom effects for enhanced visuals

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd 10_solar_system_threejs
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Post-processing**: Three.js EffectComposer with UnrealBloomPass
- **Fonts**: Geist Sans & Geist Mono

## 📦 Project Structure

```
├── app/
│   ├── layout.js          # Root layout with fonts
│   ├── page.js           # Main page component
│   └── globals.css       # Global styles & Tailwind imports
├── components/
│   ├── CanvasWrapper.jsx # Main 3D scene & animation logic
│   ├── ControlsPanel.jsx # Speed controls UI component
│   └── solarSystem.jsx   # 3D objects setup & configuration
├── public/
│   └── textures/         # Planet texture files (not included)
└── ...config files
```

## 🎮 Controls

### Camera Controls

- **Left Click + Drag**: Rotate camera around solar system
- **Right Click + Drag**: Pan camera
- **Scroll Wheel**: Zoom in/out

### Speed Controls

- **Sliders**: Adjust individual planet orbital speeds (0 - 0.02)
- **Pause/Resume Button**: Control animation playback
- **Real-time Updates**: Changes apply instantly

## 🌍 Planet Configuration

| Planet  | Orbital Radius | Size | Default Speed | Texture Source       |
| ------- | -------------- | ---- | ------------- | -------------------- |
| Mercury | 4 units        | 0.3  | 0.01          | 2k_mercury.jpg       |
| Venus   | 6 units        | 0.5  | 0.008         | 2k_venus_surface.jpg |
| Earth   | 8 units        | 0.6  | 0.007         | 2k_earth_daymap.jpg  |
| Mars    | 10 units       | 0.4  | 0.006         | 2k_mars.jpg          |
| Jupiter | 13 units       | 1.2  | 0.004         | 2k_jupiter.jpg       |
| Saturn  | 16 units       | 1.0  | 0.0035        | 2k_saturn.jpg        |
| Uranus  | 19 units       | 0.9  | 0.002         | 2k_uranus.jpg        |
| Neptune | 22 units       | 0.9  | 0.0015        | 2k_neptune.jpg       |

## 🖼️ Textures Setup

**Note**: This project requires planet texture files. Download high-quality planet textures and place them in `public/textures/`:

Required texture files:

- `2k_mercury.jpg`
- `2k_venus_surface.jpg`
- `2k_earth_daymap.jpg`
- `2k_mars.jpg`
- `2k_jupiter.jpg`
- `2k_saturn.jpg`
- `2k_uranus.jpg`
- `2k_neptune.jpg`
- `2k_stars.jpg` (scene background)
- `2k_stars_milky_way.jpg` (skybox)

**Recommended Source**: [Solar System Scope Textures](https://www.solarsystemscope.com/textures/) or NASA's official texture repository.

## 🎨 Key Components

### [`CanvasWrapper`](components/CanvasWrapper.jsx)

Main component handling:

- Three.js scene setup and WebGL rendering
- [`OrbitControls`](components/CanvasWrapper.jsx) for camera interaction
- Animation loop with planetary motion
- Post-processing effects (bloom)
- State management for speeds and pause functionality

### [`ControlsPanel`](components/ControlsPanel.jsx)

UI component providing:

- Individual planet speed sliders
- Real-time speed value display
- Pause/resume animation toggle
- Responsive glassmorphism design

### [`setupSolarSystem`](components/solarSystem.jsx)

3D scene setup including:

- Sun with emissive material
- Planet meshes with realistic textures
- Orbital path rings
- Lighting system (ambient + point light)
- Milky Way skybox background

## 🚀 Build & Deploy

### Production Build

```bash
npm run build
npm start
```

### Deploy on Vercel

This project is optimized for [Vercel deployment](https://vercel.com/new):

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Deploy automatically

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Performance Notes

- Uses `requestAnimationFrame` for smooth 60fps animation
- Implements camera damping for fluid controls
- Optimized texture loading and geometry
- Post-processing effects for enhanced visuals

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- NASA for providing authentic planetary textures
- Three.js community for excellent documentation
- Solar System Scope for texture resources
- Next.js team for the amazing framework

---

**Built with ❤️ using Next.js and Three.js**
