
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
  HelpCircle,
  X,
  Shuffle
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
  const [isLandscape, setIsLandscape] = useState(false);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  
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

  const handleCardDragStart = (e: React.DragEvent, cardId: string) => {
    setDraggedCard(cardId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCardDragEnd = () => {
    setDraggedCard(null);
  };

  const handleCardDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleCardDrop = (e: React.DragEvent, targetCardId: string) => {
    e.preventDefault();
    const draggedCardId = e.dataTransfer.getData('text/plain') || draggedCard;
    
    if (draggedCardId && draggedCardId !== targetCardId) {
      const draggedIndex = hand.findIndex(card => card.id === draggedCardId);
      const targetIndex = hand.findIndex(card => card.id === targetCardId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newHand = [...hand];
        const [draggedCard] = newHand.splice(draggedIndex, 1);
        newHand.splice(targetIndex, 0, draggedCard);
        setHand(newHand);
      }
    }
    setDraggedCard(null);
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
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl border-4 border-casino-gold">
          <div className="sticky top-0 bg-white border-b-4 border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Game Controls & Rules</h2>
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
            <div className="bg-blue-50 p-4 rounded-lg border-4 border-blue-200">
              <h3 className="font-bold text-lg mb-2 text-gray-900">Game Controls</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-800">
                <li><strong>Drag & Drop:</strong> Drag cards to rearrange your hand</li>
                <li><strong>Click to Select:</strong> Click cards to select/deselect them</li>
                <li><strong>Arrange Cards:</strong> Auto-sort by suit and rank</li>
                <li><strong>Draw/Discard:</strong> Pick from deck or discard pile, then discard one card</li>
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
    <div className={`min-h-screen casino-bg relative overflow-hidden ${isLandscape && window.innerWidth < 768 ? 'force-landscape' : ''}`}>
      {/* Game Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/80 backdrop-blur-md border-b-4 border-casino-gold/50">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/')}
              className="bg-white text-gray-900 hover:bg-gray-100 border-2 border-gray-300 shadow-xl font-bold"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Exit
            </Button>
            <Badge className="bg-casino-gold text-black font-bold px-4 py-2 shadow-xl border-2 border-yellow-600">
              {roomCode}
            </Badge>
            {gameMode && (
              <Badge className="bg-blue-600 text-white px-4 py-2 font-bold border-2 border-blue-400">
                {gameMode === 'bot' ? 'vs AI' : gameMode === 'quick' ? 'Quick Match' : 'Multiplayer'}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowRules(true)}
              className="bg-white text-casino-gold hover:bg-casino-gold hover:text-black border-2 border-casino-gold font-bold"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              Rules
            </Button>
            <Badge className="bg-red-600 text-white border-2 border-red-400 px-4 py-2 shadow-xl font-bold">
              <Timer className="w-3 h-3 mr-1" />
              {turnTimer}s
            </Badge>
            <Badge className="bg-white text-gray-900 border-2 border-gray-300 px-4 py-2 shadow-xl font-bold">
              <Users className="w-4 h-4 mr-1" />
              {guestId}
            </Badge>
          </div>
        </div>
      </div>

      {/* Turn Indicator - Moved to top right */}
      <div className="absolute top-24 right-4 z-30">
        {isMyTurn ? (
          <div className="bg-green-600 text-white font-bold px-8 py-4 rounded-full shadow-xl flex items-center gap-3 border-4 border-green-400 text-xl">
            <CheckCircle className="w-6 h-6" />
            Your Turn - Make Your Move!
          </div>
        ) : (
          <div className="bg-white text-gray-900 px-8 py-4 rounded-full shadow-xl flex items-center gap-3 border-4 border-gray-300 font-bold text-xl">
            <Timer className="w-6 h-6" />
            Waiting for {currentPlayer?.name}
          </div>
        )}
      </div>

      {/* Game Table */}
      <div className="pt-20 pb-4 px-4 h-screen flex flex-col">
        {/* Opponents - Compact Display with better grouping */}
        <div className="flex justify-center mb-4">
          <div className="flex gap-6 max-w-6xl flex-wrap justify-center">
            {players.filter(p => p.id !== 'guest1234').map((player, index) => (
              <div key={player.id} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-casino-gold border-4 border-white flex items-center justify-center shadow-xl">
                    <span className="text-black font-bold text-sm">
                      {player.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="bg-white rounded-lg px-3 py-2 shadow-xl border-2 border-gray-300">
                    <span className="text-gray-900 text-sm font-bold">{player.name}</span>
                    {player.isCurrentTurn && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block ml-2" />
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  {/* Stacked cards display for space efficiency */}
                  <div className="relative">
                    {/* Background cards for stacking effect */}
                    <PlayingCard
                      suit="spades"
                      rank="A"
                      faceDown
                      size="sm"
                      className="absolute top-1 left-1 shadow-lg"
                    />
                    <PlayingCard
                      suit="spades"
                      rank="A"
                      faceDown
                      size="sm"
                      className="absolute top-0.5 left-0.5 shadow-lg"
                    />
                    <PlayingCard
                      suit="spades"
                      rank="A"
                      faceDown
                      size="sm"
                      className="relative shadow-xl z-10"
                    />
                    <div className="absolute -right-2 -top-2 bg-casino-gold text-black text-xs font-bold px-2 py-1 rounded-full shadow-xl border-2 border-white z-20">
                      {player.cardCount}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Casino Table Central Area */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <div className="felt-table rounded-[3rem] p-8 max-w-4xl w-full relative">
            <div className="absolute inset-4 border-4 border-casino-gold/30 rounded-[2.5rem] pointer-events-none"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-casino-gold text-2xl font-bold opacity-40 drop-shadow-lg">
              RUMMY ROYAL
            </div>
            
            <div className="flex items-center justify-center gap-12">
              {/* Deck */}
              <div className="text-center group">
                <div className="mb-4 relative">
                  <PlayingCard
                    suit="spades"
                    rank="A"
                    faceDown
                    size="md"
                    onClick={handleDrawCard}
                    className={`${isMyTurn ? 'hover:scale-110 cursor-pointer shadow-2xl' : 'cursor-not-allowed opacity-60'} transition-all duration-300`}
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-casino-gold rounded-full flex items-center justify-center text-black text-sm font-bold border-2 border-white shadow-xl">
                    52
                  </div>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 shadow-xl border-2 border-gray-300">
                  <span className="text-gray-900 font-bold text-sm">DECK</span>
                </div>
              </div>

              {/* Joker */}
              <div className="text-center group">
                <div className="mb-4 relative">
                  <PlayingCard
                    suit={jokerCard.suit}
                    rank={jokerCard.rank}
                    size="md"
                    isJoker
                    className="shadow-2xl ring-4 ring-casino-gold/70"
                  />
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-casino-gold text-black px-3 py-1 rounded-full text-sm font-bold border-2 border-white shadow-xl">
                    JOKER
                  </div>
                </div>
                <div className="bg-casino-gold rounded-lg px-4 py-2 shadow-xl border-2 border-yellow-600">
                  <span className="text-black font-bold text-sm">WILD</span>
                </div>
              </div>

              {/* Discard Pile */}
              <div className="text-center group">
                <div className="mb-4 relative">
                  <PlayingCard
                    suit={discardPile.suit}
                    rank={discardPile.rank}
                    size="md"
                    onClick={handleDrawDiscard}
                    className={`${isMyTurn ? 'hover:scale-110 cursor-pointer shadow-2xl' : 'cursor-not-allowed opacity-60'} transition-all duration-300`}
                  />
                </div>
                <div className="bg-white rounded-lg px-4 py-2 shadow-xl border-2 border-gray-300">
                  <span className="text-gray-900 font-bold text-sm">DISCARD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Player Hand Area - Improved with overlapping cards */}
        <div className="space-y-4">
          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleArrange}
              disabled={hasArranged}
              className="bg-white text-gray-900 hover:bg-gray-100 disabled:bg-gray-400 disabled:text-gray-600 border-2 border-gray-300 shadow-xl font-bold"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              {hasArranged ? 'Arranged' : 'Arrange'}
            </Button>
            
            <Button
              onClick={handleDiscard}
              disabled={!isMyTurn || selectedCards.length !== 1}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:text-gray-600 text-white shadow-xl font-bold border-2 border-orange-500"
            >
              Discard ({selectedCards.length})
            </Button>
            
            <Button
              onClick={handleDeclare}
              disabled={!isMyTurn}
              className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:text-gray-600 text-white shadow-xl font-bold border-2 border-green-600"
            >
              <Trophy className="w-4 h-4 mr-1" />
              Declare
            </Button>
          </div>

          {/* Hand Cards - Overlapping with reversed stacking so numbers are visible */}
          <div className="flex justify-center">
            <div className="relative flex" style={{ width: 'fit-content' }}>
              {hand.map((card, index) => (
                <div
                  key={card.id}
                  className="relative"
                  style={{ 
                    marginLeft: index > 0 ? '-2rem' : '0',
                    zIndex: selectedCards.includes(card.id) ? 50 : 30 + index // Reversed z-index order
                  }}
                >
                  <PlayingCard
                    suit={card.suit}
                    rank={card.rank}
                    isSelected={selectedCards.includes(card.id)}
                    onClick={() => handleCardSelect(card.id)}
                    onDragStart={(e) => handleCardDragStart(e, card.id)}
                    onDragEnd={handleCardDragEnd}
                    onDragOver={handleCardDragOver}
                    onDrop={(e) => handleCardDrop(e, card.id)}
                    draggable={true}
                    cardId={card.id}
                    size="md"
                    className="shadow-xl hover:shadow-2xl transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <GameRulesModal />
    </div>
  );
};

export default Game;
