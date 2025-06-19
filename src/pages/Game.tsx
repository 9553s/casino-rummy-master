
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
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
  Settings,
  HelpCircle,
  X
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
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gameMode = searchParams.get('mode');
  
  const [guestId] = useState('Guest1234');
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [hasArranged, setHasArranged] = useState(false);
  const [turnTimer, setTurnTimer] = useState(30);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [showRules, setShowRules] = useState(false);
  
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

  // Enhanced player setup based on game mode
  const [players] = useState<Player[]>(() => {
    const basePlayer = { id: 'guest1234', name: guestId, cardCount: 13, isCurrentTurn: true, position: 0 };
    
    if (gameMode === 'bot') {
      return [
        basePlayer,
        { id: 'bot1', name: 'AI Opponent', cardCount: 13, isCurrentTurn: false, position: 1 }
      ];
    } else if (gameMode === 'quick') {
      return [
        basePlayer,
        { id: 'player2', name: 'Player2', cardCount: 13, isCurrentTurn: false, position: 1 },
        { id: 'player3', name: 'Player3', cardCount: 13, isCurrentTurn: false, position: 2 }
      ];
    } else {
      // Default multiplayer setup
      return [
        basePlayer,
        { id: 'guest5678', name: 'Guest5678', cardCount: 13, isCurrentTurn: false, position: 1 },
        { id: 'guest9012', name: 'Guest9012', cardCount: 13, isCurrentTurn: false, position: 2 },
        { id: 'guest3456', name: 'Guest3456', cardCount: 13, isCurrentTurn: false, position: 3 },
        { id: 'guest7890', name: 'Guest7890', cardCount: 13, isCurrentTurn: false, position: 4 }
      ];
    }
  });

  const [discardPile] = useState<GameCard>({ suit: 'hearts', rank: 'K', id: 'discard' });
  const [jokerCard] = useState<GameCard>({ suit: 'diamonds', rank: '7', id: 'joker' });

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTurnTimer(prev => {
        if (prev <= 1) {
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
  };

  const handleDrawDiscard = () => {
    console.log('Drawing from discard pile');
  };

  const handleDiscard = () => {
    if (selectedCards.length === 1) {
      console.log('Discarding card:', selectedCards[0]);
      setSelectedCards([]);
    }
  };

  const handleDeclare = () => {
    console.log('Player declares!');
  };

  const currentPlayer = players.find(p => p.isCurrentTurn);
  const isMyTurn = currentPlayer?.id === 'guest1234';

  const GameRulesModal = () => (
    showRules && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">Game Rules</h2>
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
              <h3 className="font-semibold text-lg mb-2">Quick Controls</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Click cards to select them</li>
                <li>Use "Arrange Cards" to auto-sort your hand</li>
                <li>Draw from deck or discard pile on your turn</li>
                <li>Select 1 card and click "Discard" to end turn</li>
                <li>Click "Declare" when you have valid combinations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Winning Combinations</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Pure Sequence:</strong> 3+ consecutive cards (same suit)</li>
                <li><strong>Set:</strong> 3+ cards of same rank</li>
                <li><strong>Impure Sequence:</strong> Consecutive cards with joker</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen casino-bg relative overflow-hidden">
      {/* Game Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/60 backdrop-blur-md border-b border-casino-gold/30">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
              className="bg-white/90 border-gray-300 text-gray-800 hover:bg-gray-100 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Exit
            </Button>
            <Badge className="bg-casino-gold text-black font-semibold px-3 py-1 shadow-lg">
              {roomCode}
            </Badge>
            {gameMode && (
              <Badge className="bg-blue-500/80 text-white px-3 py-1">
                {gameMode === 'bot' ? 'vs AI' : gameMode === 'quick' ? 'Quick Match' : 'Multiplayer'}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowRules(true)}
              variant="outline"
              size="sm"
              className="bg-white/90 border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-black"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              Rules
            </Button>
            <Badge className="bg-red-500/80 text-red-100 border-red-500/50 px-3 py-1 shadow-lg">
              <Timer className="w-3 h-3 mr-1" />
              {turnTimer}s
            </Badge>
            <Badge variant="secondary" className="bg-white/90 text-gray-800 border-gray-300 px-3 py-1 shadow-lg">
              <Users className="w-4 h-4 mr-1" />
              {guestId}
            </Badge>
          </div>
        </div>
      </div>

      {/* Game Table */}
      <div className="pt-16 pb-4 px-4 h-screen flex flex-col">
        {/* Opponents - Compact Display */}
        <div className="flex justify-center mb-4">
          <div className="grid grid-cols-4 gap-4 max-w-4xl">
            {players.filter(p => p.id !== 'guest1234').map((player, index) => (
              <div key={player.id} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-casino-gold border-2 border-white flex items-center justify-center shadow-lg">
                    <span className="text-black font-bold text-xs">
                      {player.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="bg-white/90 rounded px-2 py-1 shadow-lg">
                    <span className="text-gray-800 text-xs font-semibold">{player.name}</span>
                    {player.isCurrentTurn && (
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse inline-block ml-1" />
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  {/* Grouped cards display */}
                  <div className="relative">
                    <PlayingCard
                      suit="spades"
                      rank="A"
                      faceDown
                      size="sm"
                      className="shadow-lg"
                    />
                    <div className="absolute -right-2 -top-1 bg-casino-gold text-black text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
                      {player.cardCount}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Casino Table Central Area */}
        <div className="flex-1 flex items-center justify-center mb-4">
          <div className="felt-table rounded-[3rem] p-8 max-w-4xl w-full relative">
            <div className="absolute inset-4 border-2 border-casino-gold/20 rounded-[2.5rem] pointer-events-none"></div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-casino-gold text-lg font-bold opacity-30">
              RUMMY ROYAL
            </div>
            
            <div className="flex items-center justify-center gap-8">
              {/* Deck */}
              <div className="text-center group">
                <div className="mb-3 relative">
                  <PlayingCard
                    suit="spades"
                    rank="A"
                    faceDown
                    size="md"
                    onClick={handleDrawCard}
                    className={`${isMyTurn ? 'hover:scale-110 cursor-pointer shadow-2xl' : 'cursor-not-allowed opacity-60'} transition-all duration-300`}
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-casino-gold rounded-full flex items-center justify-center text-black text-xs font-bold">
                    52
                  </div>
                </div>
                <div className="bg-white/90 rounded px-3 py-1 shadow-lg">
                  <span className="text-gray-800 font-bold text-sm">DECK</span>
                </div>
              </div>

              {/* Joker */}
              <div className="text-center group">
                <div className="mb-3 relative">
                  <PlayingCard
                    suit={jokerCard.suit}
                    rank={jokerCard.rank}
                    size="md"
                    isJoker
                    className="shadow-2xl ring-4 ring-casino-gold/50"
                  />
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-casino-gold text-black px-2 py-0.5 rounded-full text-xs font-bold">
                    JOKER
                  </div>
                </div>
                <div className="bg-casino-gold rounded px-3 py-1 shadow-lg">
                  <span className="text-black font-bold text-sm">WILD</span>
                </div>
              </div>

              {/* Discard Pile */}
              <div className="text-center group">
                <div className="mb-3 relative">
                  <PlayingCard
                    suit={discardPile.suit}
                    rank={discardPile.rank}
                    size="md"
                    onClick={handleDrawDiscard}
                    className={`${isMyTurn ? 'hover:scale-110 cursor-pointer shadow-2xl' : 'cursor-not-allowed opacity-60'} transition-all duration-300`}
                  />
                </div>
                <div className="bg-white/90 rounded px-3 py-1 shadow-lg">
                  <span className="text-gray-800 font-bold text-sm">DISCARD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Hand Area - Improved */}
        <div className="space-y-4">
          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <Button
              onClick={handleArrange}
              disabled={hasArranged}
              size="sm"
              className="bg-white text-gray-800 hover:bg-gray-100 disabled:bg-gray-300 border-2 border-gray-300 shadow-lg font-semibold"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              {hasArranged ? 'Arranged' : 'Arrange'}
            </Button>
            
            <Button
              onClick={handleDiscard}
              disabled={!isMyTurn || selectedCards.length !== 1}
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white shadow-lg font-semibold"
            >
              Discard ({selectedCards.length})
            </Button>
            
            <Button
              onClick={handleDeclare}
              disabled={!isMyTurn}
              size="sm"
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white shadow-lg font-semibold"
            >
              <Trophy className="w-4 h-4 mr-1" />
              Declare
            </Button>
          </div>

          {/* Hand Cards - Improved spacing and visibility */}
          <div className="flex justify-center">
            <div className="flex gap-2 max-w-full overflow-x-auto pb-2 px-4" style={{ scrollbarWidth: 'thin' }}>
              {hand.map((card, index) => (
                <PlayingCard
                  key={card.id}
                  suit={card.suit}
                  rank={card.rank}
                  isSelected={selectedCards.includes(card.id)}
                  onClick={() => handleCardSelect(card.id)}
                  size="md"
                  className="flex-shrink-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.05}s` }}
                />
              ))}
            </div>
          </div>

          {/* Turn Indicator */}
          <div className="text-center">
            {isMyTurn ? (
              <div className="bg-green-500 text-white font-bold px-4 py-2 rounded-full shadow-xl inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Your Turn - Make Your Move!
              </div>
            ) : (
              <div className="bg-white/90 text-gray-800 px-4 py-2 rounded-full shadow-xl inline-flex items-center gap-2 border-2 border-gray-300">
                <Timer className="w-4 h-4" />
                Waiting for {currentPlayer?.name}
              </div>
            )}
          </div>
        </div>
      </div>

      <GameRulesModal />
    </div>
  );
};

export default Game;
