import { motion, AnimatePresence } from "framer-motion";

interface ToastAnimationProps {
    isVisible: boolean;
    videoSrc: string;
    onComplete?: () => void;
}

export function ToastAnimation({ isVisible, videoSrc, onComplete }: ToastAnimationProps) {
    return (
        <AnimatePresence onExitComplete={onComplete}>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8 } }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={onComplete} // Allow closing by clicking anywhere
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                duration: 0.8
                            }
                        }}
                        exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
                        className="relative w-full max-w-5xl aspect-video p-0 overflow-hidden"
                    >
                        <video
                            autoPlay
                            playsInline
                            className="w-full h-full object-contain mix-blend-screen"
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </video>


                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
