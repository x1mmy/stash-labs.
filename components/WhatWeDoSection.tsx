'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function WhatWeDoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-925 to-neutral-950" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            We build software for small businesses that actually works
            <span className="text-stash-orange">.</span>
          </h2>

          <div className="space-y-6 text-lg md:text-xl text-neutral-400 leading-relaxed">
            <p>
              We're three computer science students from Sydney who identified real gaps in the market.
              No corporate nonsense. No over-engineered solutions.
            </p>
            <p>
              We build practical SaaS tools for Australian SMBs—because we saw problems that needed fixing,
              and we had the skills to fix them properly.
            </p>
            <p className="text-neutral-500 italic">
              Simple, effective software built by people who actually understand the problem.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
