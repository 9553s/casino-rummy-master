
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Spade, Heart, Diamond, Club, Users, Bot, Zap, Crown } from 'lucide-react';

const Index = () => {
  const [guestId, setGuestId] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Generate guest ID
    const randomId = Math.floor(1000 + Math.random() * 9000);
    setGuestId(`Guest${randomId}`);
  }, []);

  const handlePlayerVsBot = () => {
    console.log('Starting Player vs Bot game');
    // Navigate to bot game
  };

  const handleQuickJoin = () => {
    console.log('Quick joining available room');
    // Navigate to quick join
  };

  const handlePlayWithFriends = () => {
    console.log('Play with friends selected');
    navigate('/friends');
  };

  return (
    <div className="min-h-screen casino-bg relative overflow-hidden">
      {/* Floating card decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <Spade className="absolute top-20 left-10 text-white/10 w-16 h-16 animate-float" style={{ animationDelay: '0s' }} />
        <Heart className="absolute top-32 right-20 text-red-500/10 w-12 h-12 animate-float" style={{ animationDelay: '1s' }} />
        <Diamond className="absolute bottom-40 left-20 text-red-500/10 w-14 h-14 animate-float" style={{ animationDelay: '2s' }} />
        <Club className="absolute bottom-20 right-10 text-white/10 w-18 h-18 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Guest ID Display */}
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium">
          <Users className="w-4 h-4 mr-2" />
          {guestId}
        </Badge>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          {/* Main Title */}
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-casino-gold via-casino-gold-light to-casino-gold bg-clip-text mb-4 animate-pulse-gold">
              RUMMY
            </h1>
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="flex gap-1">
                <Spade className="w-8 h-8 text-white" />
                <Heart className="w-8 h-8 text-red-500" />
                <Diamond className="w-8 h-8 text-red-500" />
                <Club className="w-8 h-8 text-white" />
              </div>
            </div>
            <p className="text-xl text-white/80 font-medium">Master the Game of Cards</p>
          </div>

          {/* Game Mode Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Player vs Bot */}
            <Card className="group hover:scale-105 transition-all duration-300 glass-effect border-casino-gold/30 hover:border-casino-gold">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-casino-gold to-casino-gold-dark flex items-center justify-center">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Player vs Bot</h3>
                  <p className="text-white/70 text-sm">Challenge our smart AI opponent</p>
                </div>
                <Button 
                  onClick={handlePlayerVsBot}
                  className="w-full bg-casino-gold hover:bg-casino-gold-dark text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  Start Game
                </Button>
              </CardContent>
            </Card>

            {/* Quick Join */}
            <Card className="group hover:scale-105 transition-all duration-300 glass-effect border-casino-gold/30 hover:border-casino-gold">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Quick Join</h3>
                  <p className="text-white/70 text-sm">Jump into any available room instantly</p>
                </div>
                <Button 
                  onClick={handleQuickJoin}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  Join Now
                </Button>
              </CardContent>
            </Card>

            {/* Play with Friends */}
            <Card className="group hover:scale-105 transition-all duration-300 glass-effect border-casino-gold/30 hover:border-casino-gold">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Play with Friends</h3>
                  <p className="text-white/70 text-sm">Create or join private rooms</p>
                </div>
                <Button 
                  onClick={handlePlayWithFriends}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  Let's Play
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-12">
            <p className="text-white/60 text-sm">
              🎯 2-6 Players • 🃏 13 Cards • 🎲 Indian Rummy Rules
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
