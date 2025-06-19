
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PlayingCard, { Suit, Rank } from '@/components/PlayingCard';
import { 
  ArrowLeft, 
  Users, 
  Timer, 
  RotateCcw,
  CheckCircle,
  Trophy,
  Settings
} from 'lucide-react';

interface GameCard {
  suit: Suit;
  rank: Rank;
  id: string;
}

interface Player {
  id: string;
  name: string;
  cardCount: number;
  isCurrentTurn: boolean;
  position: number;
}

const Game = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  
  const [guestId] = useState('Guest1234');
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [hasArranged, setHasArranged] = useState(false);
  const [turnTimer, setTurnTimer] = useState(30);
  const [currentTurn, setCurrentTurn] = useState(0);
  
  // Sample hand of 13 cards
  const [hand, setHand] = useState<GameCard[]>([
    { suit: 'spades', rank: 'A', id: '1' },
    { suit: 'hearts', rank: '2', id: '2' },
    { suit: 'diamonds', rank: '3', id: '3' },
    { suit: 'clubs', rank: '4', id: '4' },
    { suit: 'spades', rank: '5', id: '5' },
    { suit: 'hearts', rank: '6', id: '6' },
    { suit: 'diamonds', rank: '7', id: '7' },
    { suit: 'clubs', rank: '8', id: '8' },
    { suit: 'spades', rank: '9', id: '9' },
    { suit: 'hearts', rank: '10', id: '10' },
    { suit: 'diamonds', rank: 'J', id: '11' },
    { suit: 'clubs', rank: 'Q', id: '12' },
    { suit: 'spades', rank: 'K', id: '13' },
  ]);

  const [players] = useState<Player[]>([
    { id: 'guest1234', name: guestId, cardCount: 13, isCurrentTurn: true, position: 0 },
    { id: 'guest5678', name: 'Guest5678', cardCount: 13, isCurrentTurn: false, position: 1 },
    { id: 'guest9012', name: 'Guest9012', cardCount: 13, isCurrentTurn: false, position: 2 },
  ]);

  const [discardPile] = useState<GameCard>({ suit: 'hearts', rank: 'K', id: 'discard' });
  const [jokerCard] = useState<GameCard>({ suit: 'diamonds', rank: '7', id: 'joker' });

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTurnTimer(prev => {
        if (prev <= 1) {
          // Auto-play turn or skip
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTurn]);

  const handleCardSelect = (cardId: string) => {
    setSelectedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleArrange = () => {
    if (!hasArranged) {
      // Auto-sort cards by suit and rank
      const sortedHand = [...hand].sort((a, b) => {
        const suitOrder = { spades: 0, hearts: 1, diamonds: 2, clubs: 3 };
        const rankOrder = { A: 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, J: 11, Q: 12, K: 13 };
        
        if (suitOrder[a.suit] !== suitOrder[b.suit]) {
          return suitOrder[a.suit] - suitOrder[b.suit];
        }
        return rankOrder[a.rank] - rankOrder[b.rank];
      });
      
      setHand(sortedHand);
      setHasArranged(true);
    }
  };

  const handleDrawCard = () => {
    console.log('Drawing card from deck');
    // Add draw logic
  };

  const handleDrawDiscard = () => {
    console.log('Drawing from discard pile');
    // Add discard draw logic
  };

  const handleDiscard = () => {
    if (selectedCards.length === 1) {
      console.log('Discarding card:', selectedCards[0]);
      // Add discard logic
      setSelectedCards([]);
    }
  };

  const handleDeclare = () => {
    console.log('Player declares!');
    // Add declare logic
  };

  const currentPlayer = players.find(p => p.isCurrentTurn);
  const isMyTurn = currentPlayer?.id === 'guest1234';

  return (
    <div className={`min-h-screen casino-bg relative overflow-hidden ${window.innerWidth <= 768 ? 'force-landscape' : ''}`}>
      {/* Game Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-md border-b border-casino-gold/30">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/lobby/' + roomCode)}
              variant="outline"
              size="sm"
              className="bg-white border-gray-300 text-gray-800 hover:bg-gray-100 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Leave Game
            </Button>
            <Badge className="bg-casino-gold text-black font-semibold px-4 py-2 shadow-lg">
              Room {roomCode}
            </Badge>
          </div>

          <div className="flex items-center gap-4">
            <Badge className="bg-red-500/20 text-red-400 border-red-500/50 px-4 py-2 shadow-lg">
              <Timer className="w-3 h-3 mr-1" />
              {turnTimer}s
            </Badge>
            <Badge variant="secondary" className="bg-white text-gray-800 border-gray-300 px-4 py-2 shadow-lg">
              <Users className="w-4 h-4 mr-2" />
              {guestId}
            </Badge>
          </div>
        </div>
      </div>

      {/* Game Table */}
      <div className="pt-20 pb-4 px-4 h-screen flex flex-col">
        {/* Opponents */}
        <div className="flex justify-center gap-8 mb-6">
          {players.filter(p => p.id !== 'guest1234').map((player, index) => (
            <div key={player.id} className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-casino-gold flex items-center justify-center shadow-lg">
                  <span className="text-casino-gold font-bold text-sm">
                    {player.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="bg-white/90 rounded-lg px-3 py-1 shadow-lg">
                  <span className="text-gray-800 text-sm font-semibold">{player.name}</span>
                  {player.isCurrentTurn && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block ml-2" />
                  )}
                </div>
              </div>
              <div className="flex justify-center gap-1">
                {Array.from({ length: Math.min(player.cardCount, 8) }).map((_, i) => (
                  <PlayingCard
                    key={i}
                    suit="spades"
                    rank="A"
                    faceDown
                    size="sm"
                    className="transform -ml-2 shadow-lg"
                  />
                ))}
                {player.cardCount > 8 && (
                  <Badge className="ml-2 bg-white text-gray-800 text-xs shadow-lg">
                    +{player.cardCount - 8}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Casino Table Central Area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="felt-table rounded-[3rem] p-12 max-w-5xl w-full relative">
            {/* Table decorations */}
            <div className="absolute inset-4 border-2 border-casino-gold/20 rounded-[2.5rem] pointer-events-none"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-casino-gold text-lg font-bold opacity-30">
              RUMMY
            </div>
            
            <div className="flex items-center justify-center gap-12">
              {/* Deck */}
              <div className="text-center group">
                <div className="mb-4 relative">
                  <PlayingCard
                    suit="spades"
                    rank="A"
                    faceDown
                    size="lg"
                    onClick={handleDrawCard}
                    className={`${isMyTurn ? 'hover:scale-110 cursor-pointer shadow-2xl' : 'cursor-not-allowed opacity-60'} transition-all duration-300`}
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-casino-gold rounded-full flex items-center justify-center text-black text-xs font-bold">
                    52
                  </div>
                </div>
                <div className="bg-white/90 rounded-lg px-4 py-2 shadow-lg">
                  <span className="text-gray-800 font-bold">DECK</span>
                </div>
              </div>

              {/* Joker */}
              <div className="text-center group">
                <div className="mb-4 relative">
                  <PlayingCard
                    suit={jokerCard.suit}
                    rank={jokerCard.rank}
                    size="lg"
                    isJoker
                    className="shadow-2xl ring-4 ring-casino-gold/50"
                  />
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-casino-gold text-black px-2 py-1 rounded-full text-xs font-bold">
                    JOKER
                  </div>
                </div>
                <div className="bg-casino-gold rounded-lg px-4 py-2 shadow-lg">
                  <span className="text-black font-bold">WILD CARD</span>
                </div>
              </div>

              {/* Discard Pile */}
              <div className="text-center group">
                <div className="mb-4 relative">
                  <PlayingCard
                    suit={discardPile.suit}
                    rank={discardPile.rank}
                    size="lg"
                    onClick={handleDrawDiscard}
                    className={`${isMyTurn ? 'hover:scale-110 cursor-pointer shadow-2xl' : 'cursor-not-allowed opacity-60'} transition-all duration-300`}
                  />
                </div>
                <div className="bg-white/90 rounded-lg px-4 py-2 shadow-lg">
                  <span className="text-gray-800 font-bold">DISCARD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Hand Area */}
        <div className="space-y-6">
          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleArrange}
              disabled={hasArranged}
              className="bg-white text-gray-800 hover:bg-gray-100 disabled:bg-gray-300 border-2 border-gray-300 shadow-lg font-semibold"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {hasArranged ? 'Arranged' : 'Arrange Cards'}
            </Button>
            
            <Button
              onClick={handleDiscard}
              disabled={!isMyTurn || selectedCards.length !== 1}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white shadow-lg font-semibold"
            >
              Discard ({selectedCards.length})
            </Button>
            
            <Button
              onClick={handleDeclare}
              disabled={!isMyTurn}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white shadow-lg font-semibold"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Declare Winner
            </Button>
          </div>

          {/* Hand Cards */}
          <div className="flex justify-center">
            <div className="flex gap-3 max-w-full overflow-x-auto pb-4 px-4">
              {hand.map((card, index) => (
                <PlayingCard
                  key={card.id}
                  suit={card.suit}
                  rank={card.rank}
                  isSelected={selectedCards.includes(card.id)}
                  onClick={() => handleCardSelect(card.id)}
                  className="flex-shrink-0 animate-card-deal shadow-xl hover:shadow-2xl transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          </div>

          {/* Turn Indicator */}
          <div className="text-center">
            {isMyTurn ? (
              <div className="bg-green-500 text-white font-bold px-6 py-3 rounded-full shadow-xl inline-flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Your Turn - Make Your Move!
              </div>
            ) : (
              <div className="bg-white text-gray-800 px-6 py-3 rounded-full shadow-xl inline-flex items-center gap-2 border-2 border-gray-300">
                <Timer className="w-5 h-5" />
                Waiting for {currentPlayer?.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
