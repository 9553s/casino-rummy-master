
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PlayingCard, { Suit, Rank } from '@/components/PlayingCard';
import { 
  Trophy, 
  Crown, 
  Star,
  Users,
  X,
  RotateCcw
} from 'lucide-react';

interface PlayerScore {
  id: string;
  name: string;
  totalPoints: number;
  roundsWon: number;
  lastRoundPoints: number;
  finalHand?: Array<{
    suit: Suit;
    rank: Rank;
    id: string;
  }>;
  position: number;
}

interface ScoreBoardProps {
  isOpen: boolean;
  onClose: () => void;
  players: PlayerScore[];
  isGameComplete: boolean;
  currentRound: number;
  totalRounds: number;
  onNextRound?: () => void;
  onPlayAgain?: () => void;
  declaredPlayer?: string;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  isOpen,
  onClose,
  players,
  isGameComplete,
  currentRound,
  totalRounds,
  onNextRound,
  onPlayAgain,
  declaredPlayer
}) => {
  if (!isOpen) return null;

  const sortedPlayers = [...players].sort((a, b) => {
    if (isGameComplete) {
      // Sort by rounds won first, then by lowest points
      if (b.roundsWon !== a.roundsWon) {
        return b.roundsWon - a.roundsWon;
      }
      return a.totalPoints - b.totalPoints;
    } else {
      // Sort by last round points for round summary
      return a.lastRoundPoints - b.lastRoundPoints;
    }
  });

  const winner = sortedPlayers[0];
  const declaredPlayerData = players.find(p => p.id === declaredPlayer);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-casino-gold">
        <CardHeader className="bg-casino-gold text-black border-b-4 border-yellow-600">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold">
              <Trophy className="w-8 h-8" />
              {isGameComplete ? 'Final Results' : `Round ${currentRound} Results`}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-black hover:bg-yellow-600"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          {!isGameComplete && (
            <div className="text-black/80 font-semibold">
              Round {currentRound} of {totalRounds}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Winner Announcement */}
          {isGameComplete && (
            <div className="text-center p-6 bg-gradient-to-r from-casino-gold/20 to-yellow-500/20 rounded-xl border-4 border-casino-gold">
              <Crown className="w-16 h-16 text-casino-gold mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🎉 {winner.name} Wins! 🎉
              </h2>
              <div className="text-lg text-gray-700">
                {winner.roundsWon} rounds won • {winner.totalPoints} total points
              </div>
            </div>
          )}

          {/* Player Rankings */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Player Rankings
            </h3>
            
            {sortedPlayers.map((player, index) => (
              <div 
                key={player.id}
                className={`p-4 rounded-xl border-2 ${
                  index === 0 
                    ? 'bg-casino-gold/20 border-casino-gold' 
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-casino-gold text-black' : 'bg-gray-400 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-lg font-bold">{player.name}</span>
                    {index === 0 && <Crown className="w-5 h-5 text-casino-gold" />}
                    {player.id === declaredPlayer && (
                      <Badge className="bg-green-600 text-white">Declared</Badge>
                    )}
                  </div>
                  
                  <div className="text-right">
                    {isGameComplete ? (
                      <div>
                        <div className="text-lg font-bold">{player.roundsWon} rounds won</div>
                        <div className="text-sm text-gray-600">{player.totalPoints} total pts</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-lg font-bold">{player.lastRoundPoints} points</div>
                        <div className="text-sm text-gray-600">{player.totalPoints} total</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Show final hand if player declared or game ended */}
                {(declaredPlayerData || isGameComplete) && player.finalHand && (
                  <div className="mt-4 pt-4 border-t-2 border-gray-200">
                    <div className="text-sm font-semibold mb-2">Final Hand:</div>
                    <div className="flex flex-wrap gap-1">
                      {player.finalHand.map((card, cardIndex) => (
                        <PlayingCard
                          key={cardIndex}
                          suit={card.suit}
                          rank={card.rank}
                          size="sm"
                          className="shadow-md"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {!isGameComplete && onNextRound && (
              <Button
                onClick={onNextRound}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-3"
              >
                Next Round ({currentRound + 1}/{totalRounds})
              </Button>
            )}
            
            {isGameComplete && onPlayAgain && (
              <Button
                onClick={onPlayAgain}
                className="flex-1 bg-casino-gold hover:bg-yellow-500 text-black font-bold text-lg py-3"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Play Again
              </Button>
            )}
            
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 font-bold text-lg py-3"
            >
              {isGameComplete ? 'Exit Game' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreBoard;
