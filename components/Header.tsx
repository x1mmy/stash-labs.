'use client';

import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-neutral-950/80 border-b border-white/5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-6 lg:px-12 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-white">Stash Labs</span>
            <span className="text-stash-orange">.</span>
          </motion.div>

          <motion.nav
            className="hidden md:flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="#about"
              className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#approach"
              className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Approach
            </a>
            <a
              href="#products"
              className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
            >
              Products
            </a>
          </motion.nav>
        </div>
      </div>
    </motion.header>
  );
}
