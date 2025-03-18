import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react"
import "../../../css/components/card-flip.css"

const CardFlip = ({ contentFront, contentBack }) => {
    const [isFlipped, setIsFlipped] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [cardHeight, setCardHeight] = useState('auto')
    const frontRef = useRef(null)
    const backRef = useRef(null)

    // Update card height when component mounts or content changes
    useEffect(() => {
        updateCardHeight()
        // Add resize listener to handle dynamic content changes
        window.addEventListener('resize', updateCardHeight)
        return () => window.removeEventListener('resize', updateCardHeight)
    }, [contentFront, contentBack])

    function updateCardHeight() {
        if (frontRef.current && backRef.current) {
            // Get the height of both sides and use the larger one
            const frontHeight = frontRef.current.scrollHeight
            const backHeight = backRef.current.scrollHeight
            setCardHeight(`${Math.max(frontHeight, backHeight)}px`)
        }
    }

    function handleFlip (){
        if(!isAnimating){
            setIsFlipped(!isFlipped)
            setIsAnimating(true)
        }
    }

    return (
        <div className="flex items-center justify-center w-full h-full cursor-pointer border-[1px] rounded-lg" style={{ minHeight: cardHeight }}>
            <div className="flip-card w-full " style={{ minHeight: cardHeight }} onClick={handleFlip} onMouseEnter={handleFlip} onMouseLeave={handleFlip}>
                <motion.div
                    className="flip-card-inner w-full"
                    style={{ minHeight: cardHeight }}
                    initial={false}
                    animate={{rotateY: isFlipped ? 180 : 360}}
                    transition={{ duration: 0.6, animationDirection: "normal"}}
                    onAnimationComplete={() => setIsAnimating(false)}
                >
                    <div
                    ref={frontRef}
                    className={`flip-card-front w-full bg-cover p-4 overflow-hidden `}
                    style={{ minHeight: cardHeight, backgroundColor: 'var(--background)' }}
                    >
                        {contentFront}
                    </div>
                    <div
                    ref={backRef}
                    className={`flip-card-back w-full bg-cover p-4 overflow-hidden `}
                    style={{ minHeight: cardHeight, backgroundColor: 'var(--background)' }}
                    >
                        {contentBack}
                    </div>


                </motion.div>

            </div>
        </div>
    )
}

export default CardFlip
