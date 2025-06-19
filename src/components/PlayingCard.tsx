
import React from 'react';
import { Heart, Diamond, Spade, Club } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Suit = 'hearts' | 'diamonds' | 'spades' | 'clubs';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

interface PlayingCardProps {
  suit: Suit;
  rank: Rank;
  isSelected?: boolean;
  isHighlighted?: boolean;
  isJoker?: boolean;
  faceDown?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

const PlayingCard: React.FC<PlayingCardProps> = ({
  suit,
  rank,
  isSelected = false,
  isHighlighted = false,
  isJoker = false,
  faceDown = false,
  size = 'md',
  onClick,
  className
}) => {
  const getSuitIcon = (suit: Suit) => {
    const iconProps = { className: "w-full h-full" };
    switch (suit) {
      case 'hearts': return <Heart {...iconProps} />;
      case 'diamonds': return <Diamond {...iconProps} />;
      case 'spades': return <Spade {...iconProps} />;
      case 'clubs': return <Club {...iconProps} />;
    }
  };

  const isRed = suit === 'hearts' || suit === 'diamonds';
  
  const sizeClasses = {
    sm: 'w-12 h-16',
    md: 'w-16 h-22',
    lg: 'w-20 h-28'
  };

  if (faceDown) {
    return (
      <div
        className={cn(
          'relative rounded-lg cursor-pointer transition-all duration-300 card-shadow',
          'bg-card-back border-2 border-blue-700',
          sizeClasses[size],
          isSelected && 'transform -translate-y-2 shadow-lg',
          'hover:scale-105',
          className
        )}
        onClick={onClick}
      >
        <div className="absolute inset-2 rounded border-2 border-blue-400 bg-gradient-to-br from-blue-600 to-blue-800">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-6 h-6 text-white">
              <Spade className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative bg-white rounded-lg cursor-pointer transition-all duration-300 card-shadow border-2',
        sizeClasses[size],
        isSelected && 'transform -translate-y-3 shadow-xl border-casino-gold',
        isHighlighted && 'ring-2 ring-casino-gold ring-opacity-75',
        isJoker && 'ring-2 ring-purple-500 ring-opacity-75',
        !isSelected && !isJoker && 'border-gray-300',
        'hover:scale-105 hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      {/* Top-left corner */}
      <div className={cn(
        'absolute top-1 left-1 flex flex-col items-center',
        isRed ? 'text-red-500' : 'text-black'
      )}>
        <span className="text-xs font-bold leading-none">{rank}</span>
        <div className="w-3 h-3">
          {getSuitIcon(suit)}
        </div>
      </div>

      {/* Center suit symbol */}
      <div className={cn(
        'absolute inset-0 flex items-center justify-center',
        isRed ? 'text-red-500' : 'text-black'
      )}>
        <div className="w-8 h-8">
          {getSuitIcon(suit)}
        </div>
      </div>

      {/* Bottom-right corner (rotated) */}
      <div className={cn(
        'absolute bottom-1 right-1 flex flex-col-reverse items-center rotate-180',
        isRed ? 'text-red-500' : 'text-black'
      )}>
        <span className="text-xs font-bold leading-none">{rank}</span>
        <div className="w-3 h-3">
          {getSuitIcon(suit)}
        </div>
      </div>

      {/* Joker indicator */}
      {isJoker && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></div>
      )}

      {/* Selection glow effect */}
      {isSelected && (
        <div className="absolute inset-0 rounded-lg bg-casino-gold bg-opacity-20 pointer-events-none"></div>
      )}
    </div>
  );
};

export default PlayingCard;
