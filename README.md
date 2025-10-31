# Tattva Calculator

A React application for calculating and displaying the current Tattva (elemental energy) based on the ancient Vedic system of time cycles.

## What are Tattwas?

Tattwas are the five fundamental elements in Hindu and yogic philosophy:

1. **Akasha** (Ether/Space) - Represented by a purple/violet oval on a black background
2. **Vayu** (Air) - Represented by a blue circle on an orange background
3. **Tejas** (Fire) - Represented by a red triangle on a red background
4. **Apas** (Water) - Represented by a white crescent on a silver background
5. **Prithvi** (Earth) - Represented by a yellow square on a purple background

## How It Works

The application calculates two levels of tattva influence:

- **Macrotide**: The primary tattva influencing a 24-minute period
- **Microtide**: The secondary tattva within each macrotide, lasting approximately 4.8 minutes

The complete tattva cycle repeats every 2 hours (120 minutes), starting from sunrise (default: 6:00 AM).

## Features

- Real-time tattva calculation based on current time
- Visual representation of each tattva with geometric shapes and colors
- Display of both macrotide and microtide
- Countdown timer showing remaining time for current tattwas
- Responsive design for various screen sizes

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/babydraco3432/tattva-calculator.git
cd tattva-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open in your browser at [http://localhost:3000](http://localhost:3000).

## Available Scripts

### `npm start`

Runs the app in development mode. The page will reload when you make changes.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for best performance.

## Technology Stack

- React 19.2.0
- JavaScript (ES6+)
- CSS-in-JS for styling
- React Hooks for state management

## Project Structure

```
tattva-calculator/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── TattvaDisplay.js    # Main display component
│   │   └── TattvaShape.js      # Shape rendering component
│   ├── utils/
│   │   └── tattvaCalculator.js # Tattva calculation logic
│   ├── App.js                   # Main app component
│   └── index.js                 # Entry point
├── package.json
└── README.md
```

## Future Enhancements

- Location-based sunrise calculation
- Customizable sunrise time
- Historical tattva lookup
- Calendar view with tattva predictions
- Notifications for tattva transitions
- Additional information about each tattva's properties and influences

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
