
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
  style?: React.CSSProperties;
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
  className,
  style
}) => {
  const getSuitIcon = (suit: Suit) => {
    const iconProps = { className: "w-full h-full drop-shadow-sm" };
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
          'relative rounded-xl cursor-pointer transition-all duration-300 card-shadow',
          'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 border-2 border-blue-500/50',
          sizeClasses[size],
          isSelected && 'transform -translate-y-3 shadow-2xl ring-2 ring-casino-gold',
          'hover:scale-110 hover:shadow-xl',
          className
        )}
        onClick={onClick}
        style={style}
      >
        <div className="absolute inset-2 rounded-lg border-2 border-blue-300/30 bg-gradient-to-br from-blue-500/20 to-blue-800/40">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-6 h-6 text-blue-200">
              <Spade className="w-full h-full drop-shadow-lg" />
            </div>
          </div>
          {/* Decorative pattern */}
          <div className="absolute inset-1 rounded border border-blue-300/10">
            <div className="absolute top-1 left-1 w-2 h-2 bg-blue-300/20 rounded-full"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-300/20 rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-blue-300/20 rounded-full"></div>
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-300/20 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative bg-gradient-to-br from-white via-gray-50 to-white rounded-xl cursor-pointer transition-all duration-300 card-shadow border-2',
        sizeClasses[size],
        isSelected && 'transform -translate-y-4 shadow-2xl border-casino-gold ring-2 ring-casino-gold/50',
        isHighlighted && 'ring-2 ring-casino-gold ring-opacity-75 shadow-lg',
        isJoker && 'ring-2 ring-purple-500 ring-opacity-75 shadow-purple-300/50',
        !isSelected && !isJoker && 'border-gray-300/80',
        'hover:scale-110 hover:shadow-xl hover:border-casino-gold/50',
        className
      )}
      onClick={onClick}
      style={style}
    >
      {/* Card shine effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Top-left corner */}
      <div className={cn(
        'absolute top-1.5 left-1.5 flex flex-col items-center z-10',
        isRed ? 'text-red-500' : 'text-gray-800',
        'drop-shadow-sm'
      )}>
        <span className="text-xs font-bold leading-none">{rank}</span>
        <div className="w-3 h-3">
          {getSuitIcon(suit)}
        </div>
      </div>

      {/* Center suit symbol */}
      <div className={cn(
        'absolute inset-0 flex items-center justify-center z-10',
        isRed ? 'text-red-500' : 'text-gray-800',
        'drop-shadow-md'
      )}>
        <div className="w-8 h-8">
          {getSuitIcon(suit)}
        </div>
      </div>

      {/* Bottom-right corner (rotated) */}
      <div className={cn(
        'absolute bottom-1.5 right-1.5 flex flex-col-reverse items-center rotate-180 z-10',
        isRed ? 'text-red-500' : 'text-gray-800',
        'drop-shadow-sm'
      )}>
        <span className="text-xs font-bold leading-none">{rank}</span>
        <div className="w-3 h-3">
          {getSuitIcon(suit)}
        </div>
      </div>

      {/* Joker indicator */}
      {isJoker && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full border-2 border-white shadow-lg z-20">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-purple-600"></div>
        </div>
      )}

      {/* Selection glow effect */}
      {isSelected && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-casino-gold/20 via-casino-gold/10 to-transparent pointer-events-none z-10"></div>
      )}

      {/* Highlight effect */}
      {isHighlighted && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-casino-gold/15 via-transparent to-casino-gold/15 pointer-events-none z-10 animate-pulse"></div>
      )}
    </div>
  );
};

export default PlayingCard;
