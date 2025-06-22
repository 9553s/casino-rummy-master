import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Spade, Users, Zap, Hash, HelpCircle, X, RotateCcw } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [showRules, setShowRules] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  const handleStartChallenge = () => {
    const botRoomCode = `BOT${Math.floor(100 + Math.random() * 900)}`;
    navigate(`/game/${botRoomCode}?mode=bot`);
  };

  const handleJoinRoom = () => {
    navigate('/friends');
  };

  const handleJoinInstantly = () => {
    const quickRoomCode = `PUB${Math.floor(100 + Math.random() * 900)}`;
    navigate(`/game/${quickRoomCode}?mode=public`);
  };

  const handleCreateRoom = () => {
    navigate('/friends');
  };

  const GameRulesModal = () => (
    showRules && (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl border-4 border-casino-gold">
          <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">How to Play Indian Rummy</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRules(false)}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-6 space-y-4 text-gray-800">
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Game Controls</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                <li><strong>Drag & Drop:</strong> Rearrange cards by dragging</li>
                <li><strong>Landscape Mode:</strong> App auto-rotates for better card view</li>
                <li><strong>Select Cards:</strong> Click to select/deselect cards</li>
                <li><strong>Arrange:</strong> Auto-sort cards by suit and rank</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Objective</h3>
              <p className="text-gray-800">Form valid sequences and sets with your 13 cards to declare and win the game.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Valid Combinations</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                <li><strong>Pure Sequence:</strong> 3+ consecutive cards of same suit (e.g., 4♠ 5♠ 6♠)</li>
                <li><strong>Impure Sequence:</strong> Consecutive cards with joker (e.g., 4♠ Joker 6♠)</li>
                <li><strong>Set:</strong> 3+ cards of same rank, different suits (e.g., 7♠ 7♥ 7♣)</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
              <h3 className="font-bold text-lg mb-2 text-gray-900">How to Win</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                <li>Form at least 2 sequences (1 must be pure)</li>
                <li>Remaining cards must form valid sets/sequences</li>
                <li>Click "Declare" when ready</li>
                <li>Invalid declaration = 80 points penalty</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className={`min-h-screen casino-bg relative overflow-hidden ${isLandscape && window.innerWidth < 768 ? 'force-landscape' : ''}`}>
      {/* Landscape orientation indicator */}
      {!isLandscape && window.innerWidth < 768 && (
        <div className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 text-center shadow-2xl border-4 border-casino-gold">
            <RotateCcw className="w-16 h-16 mx-auto mb-4 text-casino-gold" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Rotate Your Device</h2>
            <p className="text-gray-700">Please rotate your device to landscape mode for the best gaming experience.</p>
          </div>
        </div>
      )}

      {/* Casino Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 border-4 border-casino-gold/30 rounded-full animate-pulse-soft"></div>
        <div className="absolute top-1/4 right-20 w-12 h-12 border-4 border-white/20 rounded-full animate-float-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border-4 border-casino-gold/25 rounded-full animate-pulse-soft"></div>
      </div>

      {/* Game Rules Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={() => setShowRules(true)}
          className="bg-white text-casino-gold hover:bg-casino-gold hover:text-black border-2 border-casino-gold shadow-xl font-bold"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          How to Play
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="text-center space-y-12 max-w-4xl w-full">
          {/* Header */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Spade className="w-16 h-16 text-casino-gold drop-shadow-2xl animate-float-gentle" />
              <h1 className="text-6xl font-bold gold-shimmer drop-shadow-2xl">
                RUMMY ROYAL
              </h1>
              <Spade className="w-16 h-16 text-casino-gold drop-shadow-2xl animate-float-gentle" />
            </div>
            <p className="text-xl text-white font-bold max-w-2xl mx-auto drop-shadow-lg bg-black/40 rounded-lg p-4 border-2 border-casino-gold/30">
              Experience the classic Indian Rummy in a luxurious casino environment. 
              Master the art of sequences and sets!
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Player vs Bot */}
            <Card className="bg-white shadow-2xl border-4 border-gray-300 hover:border-casino-gold hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-xl border-4 border-blue-300">
                  <Zap className="w-8 h-8 text-white drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Player vs Bot</h3>
                <p className="text-gray-700 mb-6 leading-relaxed font-medium">
                  Challenge our AI opponent and sharpen your skills in a quick match
                </p>
                <Button 
                  onClick={handleStartChallenge}
                  className="w-full premium-button font-bold py-3 text-lg shadow-xl hover:shadow-2xl border-2 border-casino-gold"
                >
                  Start Challenge
                </Button>
              </CardContent>
            </Card>

            {/* Join Room with Code */}
            <Card className="bg-white shadow-2xl border-4 border-gray-300 hover:border-casino-gold hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shadow-xl border-4 border-green-300">
                  <Hash className="w-8 h-8 text-white drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Join Room with Code</h3>
                <p className="text-gray-700 mb-6 leading-relaxed font-medium">
                  Enter a room code to join your friends in an exciting match
                </p>
                <Button 
                  onClick={handleJoinRoom}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg shadow-xl hover:shadow-2xl border-2 border-green-500"
                >
                  Join Room
                </Button>
              </CardContent>
            </Card>

            {/* Create Room */}
            <Card className="bg-white shadow-2xl border-4 border-gray-300 hover:border-casino-gold hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-casino-gold to-yellow-600 flex items-center justify-center shadow-xl border-4 border-yellow-300">
                  <Users className="w-8 h-8 text-black drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Create Room</h3>
                <p className="text-gray-700 mb-6 leading-relaxed font-medium">
                  Set up a private room or join instantly with other players
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={handleCreateRoom}
                    className="w-full premium-button font-bold py-3 text-lg shadow-xl hover:shadow-2xl border-2 border-casino-gold"
                  >
                    Create Room
                  </Button>
                  <Button 
                    onClick={handleJoinInstantly}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 text-lg shadow-xl hover:shadow-2xl border-2 border-purple-500"
                  >
                    Join Instantly
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="flex justify-center gap-8 flex-wrap">
            <Badge className="bg-white text-gray-900 border-4 border-gray-300 px-6 py-3 text-base shadow-xl font-bold">
              <Spade className="w-5 h-5 mr-2" />
              Classic Indian Rummy
            </Badge>
            <Badge className="bg-white text-gray-900 border-4 border-gray-300 px-6 py-3 text-base shadow-xl font-bold">
              <Users className="w-5 h-5 mr-2" />
              2-6 Players
            </Badge>
            <Badge className="bg-white text-gray-900 border-4 border-gray-300 px-6 py-3 text-base shadow-xl font-bold">
              <Zap className="w-5 h-5 mr-2" />
              Fast Gameplay
            </Badge>
          </div>

          {/* How to Play Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-casino-gold/30">
            <h2 className="text-3xl font-bold text-white mb-4 gold-shimmer">How to Play</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-casino-gold">Game Controls</h3>
                <ul className="space-y-2 text-white font-medium">
                  <li>• <strong>Drag & Drop:</strong> Rearrange cards by dragging</li>
                  <li>• <strong>Landscape Mode:</strong> Auto-rotates for better view</li>
                  <li>• <strong>Select Cards:</strong> Click to select/deselect</li>
                  <li>• <strong>Arrange:</strong> Auto-sort by suit and rank</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-casino-gold">Winning Strategy</h3>
                <ul className="space-y-2 text-white font-medium">
                  <li>• Form at least 2 sequences (1 pure)</li>
                  <li>• Create sets with same rank cards</li>
                  <li>• Use jokers wisely for sequences</li>
                  <li>• Declare when all cards are arranged</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GameRulesModal />
    </div>
  );
};

export default Index;
