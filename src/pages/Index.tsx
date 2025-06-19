
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Spade, Heart, Diamond, Club, Users, Bot, Zap, Crown, Sparkles, Star } from 'lucide-react';

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
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Spade className="absolute top-20 left-10 text-white/8 w-20 h-20 animate-float-gentle" style={{ animationDelay: '0s' }} />
        <Heart className="absolute top-32 right-20 text-red-500/8 w-16 h-16 animate-float-gentle" style={{ animationDelay: '1s' }} />
        <Diamond className="absolute bottom-40 left-20 text-red-500/8 w-18 h-18 animate-float-gentle" style={{ animationDelay: '2s' }} />
        <Club className="absolute bottom-20 right-10 text-white/8 w-22 h-22 animate-float-gentle" style={{ animationDelay: '3s' }} />
        <Star className="absolute top-1/2 left-1/4 text-casino-gold/10 w-12 h-12 animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
        <Sparkles className="absolute top-1/3 right-1/3 text-casino-gold/10 w-14 h-14 animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Guest ID Display */}
      <div className="absolute top-6 right-6 z-10">
        <Badge variant="secondary" className="glass-effect text-white border-white/20 px-6 py-3 text-base font-semibold backdrop-blur-md">
          <Users className="w-5 h-5 mr-2" />
          {guestId}
        </Badge>
      </div>

      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-6xl">
          {/* Main Title */}
          <div className="text-center mb-16">
            <h1 className="text-7xl md:text-9xl font-bold gold-shimmer mb-6 tracking-wider">
              RUMMY
            </h1>
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex gap-2">
                <Spade className="w-10 h-10 text-white drop-shadow-lg" />
                <Heart className="w-10 h-10 text-red-400 drop-shadow-lg" />
                <Diamond className="w-10 h-10 text-red-400 drop-shadow-lg" />
                <Club className="w-10 h-10 text-white drop-shadow-lg" />
              </div>
            </div>
            <p className="text-2xl text-white/90 font-semibold tracking-wide">Master the Game of Cards</p>
            <div className="mt-4 flex items-center justify-center gap-6 text-casino-gold/80">
              <span className="flex items-center gap-1 text-sm">
                <Star className="w-4 h-4" />
                Premium Experience
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Sparkles className="w-4 h-4" />
                Real-time Multiplayer
              </span>
            </div>
          </div>

          {/* Game Mode Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Player vs Bot */}
            <Card className="group hover:scale-105 transition-all duration-500 glass-effect border-casino-gold/20 hover:border-casino-gold/60 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-casino-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 text-center relative z-10">
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-casino-gold via-casino-gold-light to-casino-gold-dark flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                    <Bot className="w-12 h-12 text-black" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-casino-gold transition-colors duration-300">Player vs Bot</h3>
                  <p className="text-white/80 text-base leading-relaxed">Challenge our intelligent AI opponent and sharpen your skills</p>
                </div>
                <Button 
                  onClick={handlePlayerVsBot}
                  className="w-full premium-button text-black font-bold py-4 rounded-xl text-lg shadow-lg group-hover:shadow-xl transition-all duration-300"
                >
                  <Bot className="w-5 h-5 mr-2" />
                  Start Challenge
                </Button>
              </CardContent>
            </Card>

            {/* Quick Join */}
            <Card className="group hover:scale-105 transition-all duration-500 glass-effect border-green-500/20 hover:border-green-400/60 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 text-center relative z-10">
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                    <Zap className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">Quick Join</h3>
                  <p className="text-white/80 text-base leading-relaxed">Jump into any available room instantly and start playing</p>
                </div>
                <Button 
                  onClick={handleQuickJoin}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-green-400/20"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Join Instantly
                </Button>
              </CardContent>
            </Card>

            {/* Play with Friends */}
            <Card className="group hover:scale-105 transition-all duration-500 glass-effect border-purple-500/20 hover:border-purple-400/60 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="p-10 text-center relative z-10">
                <div className="mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-500">
                    <Crown className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">Play with Friends</h3>
                  <p className="text-white/80 text-base leading-relaxed">Create private rooms and invite your friends to play</p>
                </div>
                <Button 
                  onClick={handlePlayWithFriends}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-400/20"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Create Room
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-16">
            <div className="glass-effect rounded-2xl px-8 py-6 max-w-2xl mx-auto border border-white/10">
              <p className="text-white/90 text-lg font-medium mb-2">
                🎯 2-6 Players • 🃏 13 Cards • 🎲 Indian Rummy Rules
              </p>
              <p className="text-white/70 text-sm">
                Experience the ultimate card game with stunning visuals and smooth gameplay
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
