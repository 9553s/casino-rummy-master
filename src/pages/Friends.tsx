
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Plus, Hash, Link2, Settings } from 'lucide-react';

const Friends = () => {
  const [view, setView] = useState<'main' | 'join' | 'create' | 'settings'>('main');
  const [roomCode, setRoomCode] = useState('');
  const [playerCount, setPlayerCount] = useState(2);
  const [paperJoker, setPaperJoker] = useState(true);
  const [guestId] = useState('Guest1234');
  const navigate = useNavigate();

  const handleBack = () => {
    if (view === 'main') {
      navigate('/');
    } else {
      setView('main');
    }
  };

  const handleJoinRoom = () => {
    if (roomCode.trim()) {
      console.log(`Joining room with code: ${roomCode}`);
      // Navigate to lobby with room code
      navigate(`/lobby/${roomCode}`);
    }
  };

  const handleCreateRoom = () => {
    const newRoomCode = `RMY${Math.floor(100 + Math.random() * 900)}`;
    console.log(`Creating room with settings: ${playerCount} players, Joker: ${paperJoker}`);
    // Navigate to lobby as host
    navigate(`/lobby/${newRoomCode}?host=true&players=${playerCount}&joker=${paperJoker}`);
  };

  const renderMainView = () => (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <Hash className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Join Room with Code</h3>
          <p className="text-gray-600 mb-6">Enter a room code to join your friends</p>
          <Button 
            onClick={() => setView('join')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3"
          >
            Enter Code
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-200 hover:border-casino-gold hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-casino-gold to-casino-gold-dark flex items-center justify-center">
            <Plus className="w-8 h-8 text-black" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Create Room</h3>
          <p className="text-gray-600 mb-6">Set up a new room for your friends</p>
          <Button 
            onClick={() => setView('settings')}
            className="w-full bg-casino-gold hover:bg-casino-gold-dark text-black font-semibold py-3"
          >
            Create New Room
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderJoinView = () => (
    <Card className="bg-white border-gray-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-gray-800 text-center text-2xl">Join Room</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Room Code</label>
          <Input
            placeholder="Enter room code (e.g., RMY123)"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            className="bg-gray-50 border-gray-300 text-gray-800 placeholder:text-gray-500 text-center text-lg font-mono"
            maxLength={6}
          />
        </div>
        <Button 
          onClick={handleJoinRoom}
          disabled={!roomCode.trim()}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 text-white font-semibold py-3"
        >
          Join Room
        </Button>
      </CardContent>
    </Card>
  );

  const renderSettingsView = () => (
    <Card className="bg-white border-gray-200 shadow-xl">
      <CardHeader>
        <CardTitle className="text-gray-800 text-center text-2xl flex items-center justify-center gap-2">
          <Settings className="w-6 h-6" />
          Room Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-3 font-medium">Number of Players</label>
          <div className="grid grid-cols-5 gap-2">
            {[2, 3, 4, 5, 6].map((num) => (
              <Button
                key={num}
                variant={playerCount === num ? "default" : "outline"}
                onClick={() => setPlayerCount(num)}
                className={`
                  ${playerCount === num 
                    ? 'bg-casino-gold text-black hover:bg-casino-gold-dark' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {num}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-3 font-medium">Paper Joker</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={paperJoker ? "default" : "outline"}
              onClick={() => setPaperJoker(true)}
              className={`
                ${paperJoker 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              With Joker
            </Button>
            <Button
              variant={!paperJoker ? "default" : "outline"}
              onClick={() => setPaperJoker(false)}
              className={`
                ${!paperJoker 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              Without Joker
            </Button>
          </div>
        </div>

        <Button 
          onClick={handleCreateRoom}
          className="w-full bg-casino-gold hover:bg-casino-gold-dark text-black font-semibold py-3"
        >
          Create Room
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen casino-bg relative overflow-hidden">
      {/* Guest ID Display */}
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="secondary" className="bg-white text-gray-800 border-gray-300 px-4 py-2 text-sm font-medium shadow-lg">
          <Users className="w-4 h-4 mr-2" />
          {guestId}
        </Badge>
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          onClick={handleBack}
          variant="outline"
          className="bg-white border-gray-300 text-gray-800 hover:bg-gray-100 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-casino-gold via-casino-gold-light to-casino-gold bg-clip-text mb-2">
              Play with Friends
            </h1>
            <p className="text-white/70">Create or join a private room</p>
          </div>

          {view === 'main' && renderMainView()}
          {view === 'join' && renderJoinView()}
          {view === 'settings' && renderSettingsView()}
        </div>
      </div>
    </div>
  );
};

export default Friends;
