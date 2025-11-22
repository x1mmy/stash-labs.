'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const beliefs = [
  {
    title: 'Small businesses deserve better tools',
    description: 'Enterprise software is over-engineered and expensive. SMBs need solutions that actually fit their world.',
  },
  {
    title: 'We actually understand the problem',
    description: "We're not consultants guessing what businesses need. We code, we talk to customers, we iterate based on feedback.",
  },
  {
    title: 'Simple beats complex every single time',
    description: 'No feature bloat. No learning curves. Just tools that solve one problem really well.',
  },
  {
    title: 'Australian businesses first',
    description: 'Our products are built for Australian regulations, preferences, and business culture. Not a generic global tool adapted for Aus.',
  },
];

export function WhySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-925 to-neutral-950" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We built this because<span className="text-stash-orange">...</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {beliefs.map((belief, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="flex gap-4">
                  <motion.div
                    className="flex-shrink-0 w-12 h-12 rounded-full bg-stash-orange/10 flex items-center justify-center border border-stash-orange/20"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 107, 53, 0.2)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-stash-orange" />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-stash-orange transition-colors duration-200">
                      {belief.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {belief.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
