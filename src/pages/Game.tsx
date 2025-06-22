
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PlayingCard, { Suit, Rank } from '@/components/PlayingCard';
import ScoreBoard from '@/components/ScoreBoard';
import { 
  ArrowLeft, 
  Users, 
  Timer, 
  RotateCcw,
  CheckCircle,
  Trophy,
  HelpCircle,
  X,
  LogOut
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
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [hasArranged, setHasArranged] = useState(false);
  const [turnTimer, setTurnTimer] = useState(30);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [showRules, setShowRules] = useState(false);
  const [showScoreBoard, setShowScoreBoard] = useState(false);
  const [hasWithdrawn, setHasWithdrawn] = useState(false);
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

  // Timer countdown
  useEffect(() => {
    if (hasWithdrawn) return;
    
    const timer = setInterval(() => {
      setTurnTimer(prev => {
        if (prev <= 1) {
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTurn, hasWithdrawn]);

  // Handle click outside to deselect card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.playing-card') && !target.closest('.game-button')) {
        setSelectedCard(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleCardSelect = (cardId: string) => {
    if (hasWithdrawn) return;
    setSelectedCard(prev => prev === cardId ? null : cardId);
  };

  const handleCardDragStart = (e: React.DragEvent, cardId: string) => {
    if (hasWithdrawn) return;
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
    if (hasWithdrawn) return;
    
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
    if (!hasArranged && !hasWithdrawn) {
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
    if (!hasWithdrawn) {
      console.log('Drawing card from deck');
    }
  };

  const handleDrawDiscard = () => {
    if (!hasWithdrawn) {
      console.log('Drawing from discard pile');
    }
  };

  const handleDiscard = () => {
    if (selectedCard && !hasWithdrawn) {
      console.log('Discarding card:', selectedCard);
      setSelectedCard(null);
    }
  };

  const handleDeclare = () => {
    if (!hasWithdrawn) {
      console.log('Player declares!');
    }
  };

  const handleWithdraw = () => {
    setHasWithdrawn(true);
    setSelectedCard(null);
    setShowScoreBoard(true);
  };

  const currentPlayer = players.find(p => p.isCurrentTurn);
  const isMyTurn = currentPlayer?.id === 'guest1234' && !hasWithdrawn;

  const GameRulesModal = () => (
    showRules && (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2">
        <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-casino-gold">
          <div className="sticky top-0 bg-white border-b-4 border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Game Rules</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowRules(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div className="p-4 space-y-3 text-gray-800">
            <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-200">
              <h3 className="font-bold text-lg mb-2">Controls</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Select:</strong> Click to select one card</li>
                <li><strong>Drag:</strong> Drag cards to rearrange</li>
                <li><strong>Arrange:</strong> Auto-sort by suit and rank</li>
                <li><strong>Draw/Discard:</strong> Pick and discard cards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Winning</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Pure Sequence:</strong> 3+ consecutive cards (same suit)</li>
                <li><strong>Set:</strong> 3+ cards of same rank</li>
                <li><strong>Impure Sequence:</strong> Consecutive with joker</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen casino-bg relative overflow-hidden">
      {/* Mobile-First Header - Ultra Compact */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/90 backdrop-blur-md border-b-2 border-casino-gold/50">
        <div className="flex items-center justify-between p-2 gap-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate('/')}
              size="sm"
              className="bg-white text-gray-900 hover:bg-gray-100 border border-gray-300 font-bold text-xs px-2 py-1 h-8"
            >
              <ArrowLeft className="w-3 h-3" />
            </Button>
            <Badge className="bg-casino-gold text-black font-bold px-2 py-1 text-xs">
              {roomCode}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <Button
              onClick={() => setShowRules(true)}
              size="sm"
              className="bg-white text-casino-gold hover:bg-casino-gold hover:text-black border border-casino-gold font-bold game-button text-xs px-2 py-1 h-8"
            >
              <HelpCircle className="w-3 h-3" />
            </Button>
            <Badge className="bg-red-600 text-white border border-red-400 px-2 py-1 font-bold text-xs">
              {turnTimer}s
            </Badge>
            <Button
              onClick={handleWithdraw}
              disabled={hasWithdrawn}
              size="sm"
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold text-xs px-2 py-1 h-8"
            >
              <LogOut className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Turn Indicator - Mobile Optimized */}
      <div className="absolute top-14 right-2 z-30">
        {isMyTurn ? (
          <div className="bg-green-600 text-white font-bold px-4 py-2 rounded-full shadow-xl flex items-center gap-2 border-2 border-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            Your Turn!
          </div>
        ) : hasWithdrawn ? (
          <div className="bg-gray-600 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 border-2 border-gray-400 font-bold text-sm">
            Withdrawn
          </div>
        ) : (
          <div className="bg-white text-gray-900 px-4 py-2 rounded-full shadow-xl flex items-center gap-2 border-2 border-gray-300 font-bold text-sm">
            <Timer className="w-4 h-4" />
            Wait...
          </div>
        )}
      </div>

      {/* Game Layout - Ultra Responsive */}
      <div className="pt-16 pb-2 px-2 h-screen flex flex-col gap-2">
        {/* Opponents - Ultra Compact */}
        <div className="flex justify-center">
          <div className="flex gap-3 flex-wrap justify-center">
            {players.filter(p => p.id !== 'guest1234').map((player) => (
              <div key={player.id} className="text-center">
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-6 h-6 rounded-full bg-casino-gold border-2 border-white flex items-center justify-center shadow-lg">
                    <span className="text-black font-bold text-xs">
                      {player.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="bg-white rounded px-2 py-1 shadow-lg border border-gray-300">
                    <span className="text-gray-900 text-xs font-bold">{player.name}</span>
                    {player.isCurrentTurn && (
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse inline-block ml-1" />
                    )}
                  </div>
                </div>
                <div className="relative">
                  <PlayingCard
                    suit="spades"
                    rank="A"
                    faceDown
                    size="sm"
                    className="shadow-lg"
                  />
                  <div className="absolute -right-1 -top-1 bg-casino-gold text-black text-xs font-bold px-1 py-0.5 rounded-full shadow-lg border border-white">
                    {player.cardCount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Casino Table - Responsive */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="felt-table rounded-3xl p-4 w-full max-w-4xl relative">
            <div className="absolute inset-2 border-2 border-casino-gold/30 rounded-2xl pointer-events-none"></div>
            
            <div className="flex items-center justify-center gap-6 sm:gap-12">
              {/* Deck */}
              <div className="text-center group">
                <div className="mb-2 relative">
                  <PlayingCard
                    suit="spades"
                    rank="A"
                    faceDown
                    size="lg"
                    onClick={handleDrawCard}
                    className={`${isMyTurn ? 'hover:scale-110 cursor-pointer shadow-2xl' : 'cursor-not-allowed opacity-60'} transition-all duration-300`}
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-casino-gold rounded-full flex items-center justify-center text-black text-xs font-bold border border-white shadow-lg">
                    52
                  </div>
                </div>
                <div className="bg-white rounded px-2 py-1 shadow-lg border border-gray-300">
                  <span className="text-gray-900 font-bold text-xs">DECK</span>
                </div>
              </div>

              {/* Joker */}
              <div className="text-center group">
                <div className="mb-2 relative">
                  <PlayingCard
                    suit={jokerCard.suit}
                    rank={jokerCard.rank}
                    size="lg"
                    isJoker
                    className="shadow-2xl ring-2 ring-casino-gold/70"
                  />
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-casino-gold text-black px-2 py-0.5 rounded-full text-xs font-bold border border-white shadow-lg">
                    JOKER
                  </div>
                </div>
                <div className="bg-casino-gold rounded px-2 py-1 shadow-lg border border-yellow-600">
                  <span className="text-black font-bold text-xs">WILD</span>
                </div>
              </div>

              {/* Discard */}
              <div className="text-center group">
                <div className="mb-2">
                  <PlayingCard
                    suit={discardPile.suit}
                    rank={discardPile.rank}
                    size="lg"
                    onClick={handleDrawDiscard}
                    className={`${isMyTurn ? 'hover:scale-110 cursor-pointer shadow-2xl' : 'cursor-not-allowed opacity-60'} transition-all duration-300`}
                  />
                </div>
                <div className="bg-white rounded px-2 py-1 shadow-lg border border-gray-300">
                  <span className="text-gray-900 font-bold text-xs">DISCARD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Mobile First */}
        <div className="flex justify-center gap-2 px-2">
          <Button
            onClick={handleArrange}
            disabled={hasArranged || hasWithdrawn}
            size="sm"
            className="bg-white text-gray-900 hover:bg-gray-100 disabled:bg-gray-400 disabled:text-gray-600 border border-gray-300 shadow-lg font-bold game-button text-xs px-3 py-2"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            {hasArranged ? 'Done' : 'Sort'}
          </Button>
          
          <Button
            onClick={handleDiscard}
            disabled={!isMyTurn || !selectedCard}
            size="sm"
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:text-gray-600 text-white shadow-lg font-bold border border-orange-500 game-button text-xs px-3 py-2"
          >
            Discard {selectedCard ? '(1)' : '(0)'}
          </Button>
          
          <Button
            onClick={handleDeclare}
            disabled={!isMyTurn}
            size="sm"
            className="bg-green-700 hover:bg-green-800 disabled:bg-gray-400 disabled:text-gray-600 text-white shadow-lg font-bold border border-green-600 game-button text-xs px-3 py-2"
          >
            <Trophy className="w-3 h-3 mr-1" />
            Declare
          </Button>
        </div>

        {/* Hand Cards - Ultra Responsive */}
        <div className="flex justify-center pb-2">
          <div className="relative flex overflow-x-auto" style={{ width: 'fit-content', maxWidth: '100%' }}>
            {hand.map((card, index) => (
              <div
                key={card.id}
                className="relative transition-all duration-300 playing-card flex-shrink-0"
                style={{ 
                  marginLeft: index > 0 ? '-2rem' : '0',
                  zIndex: selectedCard === card.id ? 50 : 30 + index,
                  transform: selectedCard === card.id ? 'translateY(-30px)' : 'translateY(0px)'
                }}
              >
                <PlayingCard
                  suit={card.suit}
                  rank={card.rank}
                  isSelected={selectedCard === card.id}
                  onClick={() => handleCardSelect(card.id)}
                  onDragStart={(e) => handleCardDragStart(e, card.id)}
                  onDragEnd={handleCardDragEnd}
                  onDragOver={handleCardDragOver}
                  onDrop={(e) => handleCardDrop(e, card.id)}
                  draggable={!hasWithdrawn}
                  cardId={card.id}
                  size="lg"
                  className="shadow-xl hover:shadow-2xl transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <GameRulesModal />
      
      {showScoreBoard && (
        <ScoreBoard
          isOpen={showScoreBoard}
          onClose={() => setShowScoreBoard(false)}
          players={[
            {
              id: 'guest1234',
              name: guestId,
              totalPoints: hasWithdrawn ? 80 : 0,
              roundsWon: 0,
              lastRoundPoints: hasWithdrawn ? 80 : 0,
              finalHand: hasWithdrawn ? hand.map(card => ({...card})) : undefined,
              position: 0
            },
            ...players.filter(p => p.id !== 'guest1234').map((player, index) => ({
              id: player.id,
              name: player.name,
              totalPoints: 25 + (index * 10),
              roundsWon: index === 0 ? 1 : 0,
              lastRoundPoints: 25 + (index * 10),
              position: index + 1
            }))
          ]}
          isGameComplete={hasWithdrawn}
          currentRound={1}
          totalRounds={5}
          onPlayAgain={() => setShowScoreBoard(false)}
        />
      )}
    </div>
  );
};

export default Game;
