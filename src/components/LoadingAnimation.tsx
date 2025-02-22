import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-[#212121] p-4 sm:p-8 rounded-2xl">
        <div className="text-[#7c7c7c] font-[Poppins] text-2xl flex items-center">
          <p>loading</p>
          <div className="overflow-hidden relative h-[40px] ml-2">
            <motion.div
              animate={{
                y: [0, -40, -80, -120, -160, 0],
              }}
              transition={{
                duration: 4,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex flex-col items-start"
            >
              <span className="block h-[40px] text-[#956afa] pl-1.5">buttons</span>
              <span className="block h-[40px] text-[#956afa] pl-1.5">forms</span>
              <span className="block h-[40px] text-[#956afa] pl-1.5">switches</span>
              <span className="block h-[40px] text-[#956afa] pl-1.5">cards</span>
              <span className="block h-[40px] text-[#956afa] pl-1.5">buttons</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;