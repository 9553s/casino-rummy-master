
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
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  draggable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  cardId?: string;
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
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  draggable = false,
  className,
  style,
  cardId
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
  
  // Bigger sizes for better mobile experience
  const sizeClasses = {
    sm: 'w-10 h-14',      // Increased from w-8 h-12
    md: 'w-16 h-22',      // Increased from w-12 h-16
    lg: 'w-18 h-26'       // Increased from w-14 h-20
  };

  const fontSizes = {
    sm: 'text-xs',        // Increased from text-[10px]
    md: 'text-sm',        // Increased from text-xs
    lg: 'text-base'       // Increased from text-sm
  };

  const iconSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3', 
    lg: 'w-4 h-4'
  };

  const centerIconSizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (cardId) {
      e.dataTransfer.setData('text/plain', cardId);
    }
    onDragStart?.(e);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver?.(e);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop?.(e);
  };

  if (faceDown) {
    return (
      <div
        className={cn(
          'relative rounded-lg cursor-pointer transition-all duration-300 card-shadow border-2',
          'bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 border-blue-400',
          sizeClasses[size],
          isSelected && 'transform -translate-y-3 shadow-2xl ring-4 ring-casino-gold border-casino-gold',
          'hover:scale-105 hover:shadow-xl',
          draggable && 'cursor-move',
          className
        )}
        onClick={onClick}
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        draggable={draggable}
        style={style}
      >
        <div className="absolute inset-1 rounded border border-blue-300/40 bg-gradient-to-br from-blue-500/30 to-blue-900/60">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-4 h-4 text-blue-200">
              <Spade className="w-full h-full drop-shadow-lg" />
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
        isSelected && 'transform -translate-y-3 shadow-2xl border-casino-gold ring-4 ring-casino-gold/70 z-30',
        isHighlighted && 'ring-4 ring-casino-gold ring-opacity-75 shadow-lg',
        isJoker && 'ring-4 ring-purple-500 ring-opacity-75 shadow-purple-300/50',
        !isSelected && !isJoker && 'border-gray-400',
        'hover:scale-105 hover:shadow-xl hover:border-casino-gold/70',
        draggable && 'cursor-move hover:cursor-grabbing',
        className
      )}
      onClick={onClick}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      draggable={draggable}
      style={style}
    >
      {/* Card shine effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none"></div>
      
      {/* Top-left corner */}
      <div className={cn(
        'absolute top-1 left-1 flex flex-col items-center z-10',
        isRed ? 'text-red-600' : 'text-gray-900',
        'drop-shadow-sm font-bold',
        fontSizes[size]
      )}>
        <span className="leading-none">{rank}</span>
        <div className={iconSizes[size]}>
          {getSuitIcon(suit)}
        </div>
      </div>

      {/* Center suit symbol */}
      <div className={cn(
        'absolute inset-0 flex items-center justify-center z-10',
        isRed ? 'text-red-600' : 'text-gray-900',
        'drop-shadow-md'
      )}>
        <div className={centerIconSizes[size]}>
          {getSuitIcon(suit)}
        </div>
      </div>

      {/* Bottom-right corner (rotated) */}
      <div className={cn(
        'absolute bottom-1 right-1 flex flex-col-reverse items-center rotate-180 z-10',
        isRed ? 'text-red-600' : 'text-gray-900',
        'drop-shadow-sm font-bold',
        fontSizes[size]
      )}>
        <span className="leading-none">{rank}</span>
        <div className={iconSizes[size]}>
          {getSuitIcon(suit)}
        </div>
      </div>

      {/* Joker indicator */}
      {isJoker && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full border-2 border-white shadow-lg z-20">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 to-purple-600"></div>
        </div>
      )}

      {/* Selection glow effect */}
      {isSelected && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-casino-gold/30 via-casino-gold/15 to-transparent pointer-events-none z-10"></div>
      )}

      {/* Highlight effect */}
      {isHighlighted && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-casino-gold/20 via-transparent to-casino-gold/20 pointer-events-none z-10 animate-pulse"></div>
      )}
    </div>
  );
};

export default PlayingCard;
