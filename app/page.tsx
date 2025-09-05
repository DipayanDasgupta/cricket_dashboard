'use client';

import { useState } from 'react';
import { Header } from './components/header';
import { PlayerSearch } from './components/player-search';
import { PerformanceChart } from './components/performance-chart';
import { Chatbot } from './components/chatbot';
import { playerStats } from './data'; // The single, reliable source of truth
import { StatCard } from './components/stat-card';
import { BarChart, Target, Zap, TrendingUp } from 'lucide-react';

// The type is now derived directly from our reliable data file
type PlayerName = keyof typeof playerStats;

export default function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerName>('Virat Kohli');
  
  // Get the current player's data directly from our local file.
  // This is instantaneous and will never fail.
  const currentPlayerStats = playerStats[selectedPlayer];

  const handlePlayerSelect = (playerName: string) => {
    setSelectedPlayer(playerName as PlayerName);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1 p-4 md:p-8 space-y-8">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold">Player Dashboard</h2>
          <PlayerSearch onPlayerSelect={handlePlayerSelect} selectedPlayer={selectedPlayer} />
        </div>

        {/* The StatCards now use the reliable local data */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Matches" value={currentPlayerStats.career.matches} icon={BarChart} />
          <StatCard title="Runs" value={currentPlayerStats.career.runs.toLocaleString()} icon={TrendingUp} />
          <StatCard title="Average" value={currentPlayerStats.career.average} icon={Target} />
          <StatCard title="Strike Rate" value={currentPlayerStats.career.strikeRate} icon={Zap} />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* The Performance Chart continues to use the reliable local data */}
            <PerformanceChart performanceData={currentPlayerStats.performance} />
          </div>
          <div>
            <Chatbot selectedPlayer={selectedPlayer} />
          </div>
        </div>
      </main>
    </div>
  );
}
