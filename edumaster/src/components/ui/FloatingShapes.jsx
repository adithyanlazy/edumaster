import { motion } from 'framer-motion'

const shapes = [
  { size: 300, x: '10%', y: '20%', color: 'rgba(52, 87, 213, 0.06)', delay: 0 },
  { size: 200, x: '75%', y: '15%', color: 'rgba(52, 87, 213, 0.04)', delay: 2 },
  { size: 250, x: '60%', y: '60%', color: 'rgba(30, 40, 68, 0.04)', delay: 4 },
  { size: 150, x: '20%', y: '70%', color: 'rgba(52, 87, 213, 0.05)', delay: 1 },
  { size: 180, x: '85%', y: '45%', color: 'rgba(30, 40, 68, 0.03)', delay: 3 },
]

export default function FloatingShapes({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background: `radial-gradient(circle, ${shape.color} 0%, transparent 70%)`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  )
}
