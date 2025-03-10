'use client'
import { EpisodesProvider } from './context/EpisodesContext';
import { LocationsProvider } from './context/LocationsContext';
import Navbar from './components/Navbar';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head />
      <body>
        <EpisodesProvider>
          <LocationsProvider>
            <Navbar />
            {children}
          </LocationsProvider>
        </EpisodesProvider>
      </body>
    </html>
  );
}
