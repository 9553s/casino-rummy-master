
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Users, 
  Copy, 
  Check, 
  Crown, 
  Settings,
  Play,
  UserPlus,
  Timer,
  Spade
} from 'lucide-react';

interface Player {
  id: string;
  name: string;
  isHost: boolean;
  avatar?: string;
}

const Lobby = () => {
  const { roomCode } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [isHost] = useState(searchParams.get('host') === 'true');
  const [maxPlayers] = useState(parseInt(searchParams.get('players') || '2'));
  const [paperJoker] = useState(searchParams.get('joker') === 'true');
  const [linkCopied, setLinkCopied] = useState(false);
  const [guestId] = useState('Guest1234');
  
  const [players, setPlayers] = useState<Player[]>([
    { id: 'guest1234', name: guestId, isHost: isHost }
  ]);

  const joinLink = `${window.location.origin}/join/${roomCode}`;

  useEffect(() => {
    // Simulate other players joining
    const timer = setTimeout(() => {
      if (players.length < maxPlayers) {
        const newPlayer = {
          id: `guest${Math.floor(1000 + Math.random() * 9000)}`,
          name: `Guest${Math.floor(1000 + Math.random() * 9000)}`,
          isHost: false
        };
        setPlayers(prev => [...prev, newPlayer]);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [players.length, maxPlayers]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(joinLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      navigate(`/game/${roomCode}`);
    }
  };

  const canStartGame = players.length >= 2 && players.length <= maxPlayers;

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
          onClick={() => navigate('/friends')}
          variant="outline"
          className="bg-white border-gray-300 text-gray-800 hover:bg-gray-100 shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          {/* Room Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-casino-gold via-casino-gold-light to-casino-gold bg-clip-text mb-4">
              Room {roomCode}
            </h1>
            <div className="flex items-center justify-center gap-4">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {players.length}/{maxPlayers} Players
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {paperJoker ? 'With Joker' : 'No Joker'}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Room Settings & Share */}
            <div className="lg:col-span-1 space-y-4">
              {/* Room Code Card */}
              <Card className="bg-white border-gray-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-gray-800 text-lg flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Room Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Room Code</label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={roomCode}
                        readOnly
                        className="bg-gray-50 border-gray-300 text-gray-800 font-mono text-center"
                      />
                      <Button
                        size="sm"
                        onClick={handleCopyLink}
                        className="bg-casino-gold hover:bg-casino-gold-dark text-black"
                      >
                        {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-600 text-sm mb-1">Join Link</label>
                    <div className="p-2 bg-gray-50 rounded border border-gray-200 text-gray-600 text-xs break-all">
                      {joinLink}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Host Controls */}
              {isHost && (
                <Card className="bg-white border-gray-200 shadow-xl">
                  <CardContent className="p-4">
                    <Button
                      onClick={handleStartGame}
                      disabled={!canStartGame}
                      className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white font-semibold py-3"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {players.length < 2 ? 'Waiting for Players...' : 'Start Game'}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Players List */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-gray-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-gray-800 text-xl flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users className="w-6 h-6" />
                      Players ({players.length}/{maxPlayers})
                    </span>
                    {players.length < maxPlayers && (
                      <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">
                        <UserPlus className="w-3 h-3 mr-1" />
                        Waiting for players...
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Current Players */}
                  {players.map((player, index) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-casino-gold to-casino-gold-dark flex items-center justify-center">
                          <span className="text-black font-bold">
                            {player.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-800 font-medium">{player.name}</span>
                            {player.isHost && (
                              <Crown className="w-4 h-4 text-casino-gold" />
                            )}
                          </div>
                          <span className="text-gray-500 text-sm">Player {index + 1}</span>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                        Ready
                      </Badge>
                    </div>
                  ))}

                  {/* Empty Slots */}
                  {Array.from({ length: maxPlayers - players.length }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserPlus className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <span className="text-gray-400 font-medium">Waiting for player...</span>
                        <div className="text-gray-300 text-sm">Player {players.length + index + 1}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Game Info */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm flex items-center justify-center gap-4">
              <span className="flex items-center gap-1">
                <Spade className="w-4 h-4" />
                13 Cards per Player
              </span>
              <span className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                Indian Rummy Rules
              </span>
              <span className="flex items-center gap-1">
                <Crown className="w-4 h-4" />
                First to Declare Wins
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
