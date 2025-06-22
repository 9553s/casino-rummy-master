
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Settings, 
  Users, 
  Timer, 
  Trophy,
  Plus,
  Minus,
  Crown
} from 'lucide-react';

interface RoomSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: (settings: RoomSettings) => void;
  roomCode?: string;
  isInGame?: boolean;
}

interface RoomSettings {
  rounds: number;
  gameMode: 'classic' | 'quick' | 'tournament';
  timePerTurn: number;
  pointsToWin: number;
}

const RoomSettings: React.FC<RoomSettingsProps> = ({
  isOpen,
  onClose,
  onCreateRoom,
  roomCode,
  isInGame = false
}) => {
  const [settings, setSettings] = useState<RoomSettings>({
    rounds: 5,
    gameMode: 'classic',
    timePerTurn: 30,
    pointsToWin: 500
  });

  const handleRoundsChange = (increment: boolean) => {
    setSettings(prev => ({
      ...prev,
      rounds: increment 
        ? Math.min(prev.rounds + 1, 20) 
        : Math.max(prev.rounds - 1, 1)
    }));
  };

  const handleTimeChange = (increment: boolean) => {
    setSettings(prev => ({
      ...prev,
      timePerTurn: increment 
        ? Math.min(prev.timePerTurn + 15, 120) 
        : Math.max(prev.timePerTurn - 15, 15)
    }));
  };

  const handleSubmit = () => {
    onCreateRoom(settings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-4 border-casino-gold">
        <CardHeader className="bg-casino-gold text-black border-b-4 border-yellow-600">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Settings className="w-6 h-6" />
            {isInGame ? 'Room Settings' : 'Create Room'}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {roomCode && (
            <div className="text-center">
              <Badge className="bg-blue-600 text-white px-4 py-2 text-lg font-bold">
                Room: {roomCode}
              </Badge>
            </div>
          )}

          {/* Number of Rounds */}
          <div className="space-y-2">
            <Label className="text-lg font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-casino-gold" />
              Number of Rounds
            </Label>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleRoundsChange(false)}
                disabled={settings.rounds <= 1}
                className="w-10 h-10 p-0"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold text-casino-gold">
                  {settings.rounds}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleRoundsChange(true)}
                disabled={settings.rounds >= 20}
                className="w-10 h-10 p-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Game Mode */}
          <div className="space-y-2">
            <Label className="text-lg font-bold flex items-center gap-2">
              <Crown className="w-5 h-5 text-casino-gold" />
              Game Mode
            </Label>
            <div className="grid grid-cols-1 gap-2">
              {(['classic', 'quick', 'tournament'] as const).map((mode) => (
                <Button
                  key={mode}
                  variant={settings.gameMode === mode ? "default" : "outline"}
                  onClick={() => setSettings(prev => ({ ...prev, gameMode: mode }))}
                  className={`justify-start ${
                    settings.gameMode === mode 
                      ? 'bg-casino-gold text-black hover:bg-yellow-500' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {mode === 'classic' && 'Classic Rummy'}
                  {mode === 'quick' && 'Quick Match'}
                  {mode === 'tournament' && 'Tournament'}
                </Button>
              ))}
            </div>
          </div>

          {/* Time Per Turn */}
          <div className="space-y-2">
            <Label className="text-lg font-bold flex items-center gap-2">
              <Timer className="w-5 h-5 text-casino-gold" />
              Time Per Turn (seconds)
            </Label>
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleTimeChange(false)}
                disabled={settings.timePerTurn <= 15}
                className="w-10 h-10 p-0"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold text-casino-gold">
                  {settings.timePerTurn}s
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleTimeChange(true)}
                disabled={settings.timePerTurn >= 120}
                className="w-10 h-10 p-0"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Points to Win */}
          <div className="space-y-2">
            <Label className="text-lg font-bold">Points to Win</Label>
            <Input
              type="number"
              value={settings.pointsToWin}
              onChange={(e) => setSettings(prev => ({ 
                ...prev, 
                pointsToWin: Math.max(100, Math.min(1000, parseInt(e.target.value) || 500))
              }))}
              min="100"
              max="1000"
              step="50"
              className="text-center text-lg font-bold"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-casino-gold text-black hover:bg-yellow-500 font-bold"
            >
              {isInGame ? 'Update Settings' : 'Create Room'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoomSettings;
