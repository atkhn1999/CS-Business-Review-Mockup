# Customer Success Platform

A modern, interactive business review presentation platform designed for Customer Success teams. Create beautiful, data-driven presentations that showcase partnership value and track objectives.

## Features

- **Drag-and-Drop Slide Management**: Easily reorder slides to customize your presentation flow
- **Team & Stakeholder Management**: Track key contacts from both sides of the partnership
- **Mission & Goals Tracking**: Define long-term strategic goals with custom fields
- **Objectives & KPIs**: Set short/medium-term objectives with measurable KPIs
- **Value Realization**: Document and showcase achieved benefits
- **Presentation Mode**: Beautiful full-screen presentation view
- **Import/Export**: Save and load presentation data as JSON
- **Responsive Design**: Works on all devices

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm run export
```

The exported static files will be in the `out` directory, ready for deployment to Netlify.

## Deployment to Netlify

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to Netlify and click "New site from Git"
3. Choose your repository
4. Set build settings:
   - Build command: `npm run build && npm run export`
   - Publish directory: `out`
5. Deploy!

## Usage Guide

### Creating Your Presentation

1. **Customer Info**: Click on the customer name in the header to edit
2. **Add Team Members**: Navigate to the Team slide and add your Receptive AI team
3. **Add Stakeholders**: Add key customer stakeholders with their contact info
4. **Set Mission**: Define your partnership mission statement
5. **Create Goals**: Add long-term strategic goals
6. **Define Objectives**: Set measurable objectives with KPIs
7. **Track Value**: Document achieved value and benefits

### Presentation Flow

- Use the slide manager on the left to reorder slides
- Hide/show slides using the eye icon
- Click "Present" to enter full-screen presentation mode
- Navigate with arrow keys or on-screen controls

### Data Management

- **Export**: Click Export in the header to save your data as JSON
- **Import**: Click Import to load previously saved data
- All data is automatically saved to browser storage

## Technology Stack

- **Next.js 14**: React framework with static export
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern utility-first CSS
- **Zustand**: State management
- **DnD Kit**: Drag and drop functionality

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this for your customer success presentations!