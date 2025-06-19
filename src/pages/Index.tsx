
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Spade, Users, Zap, Hash, HelpCircle, X } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [showRules, setShowRules] = useState(false);

  const handleStartChallenge = () => {
    // Create a bot game room
    const botRoomCode = `BOT${Math.floor(100 + Math.random() * 900)}`;
    navigate(`/game/${botRoomCode}?mode=bot`);
  };

  const handleJoinInstantly = () => {
    // Create a quick match room
    const quickRoomCode = `QCK${Math.floor(100 + Math.random() * 900)}`;
    navigate(`/game/${quickRoomCode}?mode=quick`);
  };

  const GameRulesModal = () => (
    showRules && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">How to Play Indian Rummy</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRules(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-6 space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg mb-2">Objective</h3>
              <p>Form valid sequences and sets with your 13 cards to declare and win the game.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Card Values</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Ace (A) = 1 point</li>
                <li>Number cards = Face value</li>
                <li>Jack, Queen, King = 10 points each</li>
                <li>Joker = 0 points (can substitute any card)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Valid Combinations</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Pure Sequence:</strong> 3+ consecutive cards of same suit (e.g., 4♠ 5♠ 6♠)</li>
                <li><strong>Impure Sequence:</strong> Consecutive cards with joker (e.g., 4♠ Joker 6♠)</li>
                <li><strong>Set:</strong> 3+ cards of same rank, different suits (e.g., 7♠ 7♥ 7♣)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">How to Win</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Form at least 2 sequences (1 must be pure)</li>
                <li>Remaining cards must form valid sets/sequences</li>
                <li>Click "Declare" when ready</li>
                <li>Invalid declaration = 80 points penalty</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Gameplay</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Draw a card from deck or discard pile</li>
                <li>Discard one card to end your turn</li>
                <li>First player to declare with valid combinations wins</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen casino-bg relative overflow-hidden">
      {/* Casino Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 border-4 border-casino-gold/20 rounded-full animate-pulse-soft"></div>
        <div className="absolute top-1/4 right-20 w-12 h-12 border-4 border-white/10 rounded-full animate-float-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border-4 border-casino-gold/15 rounded-full animate-pulse-soft"></div>
      </div>

      {/* Game Rules Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={() => setShowRules(true)}
          variant="outline"
          className="bg-white/90 border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-black shadow-lg"
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
              <Spade className="w-16 h-16 text-casino-gold drop-shadow-lg animate-float-gentle" />
              <h1 className="text-6xl font-bold gold-shimmer drop-shadow-2xl">
                RUMMY ROYAL
              </h1>
              <Spade className="w-16 h-16 text-casino-gold drop-shadow-lg animate-float-gentle" />
            </div>
            <p className="text-xl text-white-contrast font-medium max-w-2xl mx-auto">
              Experience the classic Indian Rummy in a luxurious casino environment. 
              Master the art of sequences and sets!
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Player vs Bot */}
            <Card className="bg-white shadow-2xl border-2 border-gray-200 hover:border-casino-gold hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Player vs Bot</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Challenge our AI opponent and sharpen your skills in a quick match
                </p>
                <Button 
                  onClick={handleStartChallenge}
                  className="w-full premium-button font-bold py-3 text-lg shadow-xl hover:shadow-2xl"
                >
                  Start Challenge
                </Button>
              </CardContent>
            </Card>

            {/* Join Room with Code */}
            <Card className="bg-white shadow-2xl border-2 border-gray-200 hover:border-casino-gold hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg">
                  <Hash className="w-8 h-8 text-white drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Join Room with Code</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Enter a room code to join your friends in an exciting match
                </p>
                <Button 
                  onClick={() => navigate('/friends')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 text-lg shadow-xl hover:shadow-2xl"
                >
                  Join Room
                </Button>
              </CardContent>
            </Card>

            {/* Create Room */}
            <Card className="bg-white shadow-2xl border-2 border-gray-200 hover:border-casino-gold hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-casino-gold to-casino-gold-dark flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-black drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">Create Room/Join Room</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Set up a private room or join instantly with other players
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate('/friends')}
                    className="w-full premium-button font-bold py-3 text-lg shadow-xl hover:shadow-2xl"
                  >
                    Create Room
                  </Button>
                  <Button 
                    onClick={handleJoinInstantly}
                    variant="outline"
                    className="w-full border-2 border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-black font-bold py-3 text-lg shadow-lg hover:shadow-xl"
                  >
                    Join Instantly
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="flex justify-center gap-8 flex-wrap">
            <Badge className="bg-white/90 text-gray-800 border-gray-300 px-6 py-3 text-base shadow-lg">
              <Spade className="w-5 h-5 mr-2" />
              Classic Indian Rummy
            </Badge>
            <Badge className="bg-white/90 text-gray-800 border-gray-300 px-6 py-3 text-base shadow-lg">
              <Users className="w-5 h-5 mr-2" />
              2-6 Players
            </Badge>
            <Badge className="bg-white/90 text-gray-800 border-gray-300 px-6 py-3 text-base shadow-lg">
              <Zap className="w-5 h-5 mr-2" />
              Fast Gameplay
            </Badge>
          </div>
        </div>
      </div>

      <GameRulesModal />
    </div>
  );
};

export default Index;
