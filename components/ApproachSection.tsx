'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const principles = [
  {
    title: 'Validation first, ego second',
    description: 'We talk to businesses before we code. A lot.',
  },
  {
    title: 'Direct relationships',
    description: 'No sales team, no gatekeeping. You talk to us.',
  },
  {
    title: 'No feature bloat',
    description: 'We solve one problem really well instead of five problems badly.',
  },
  {
    title: 'Your feedback shapes everything',
    description: 'Beta customers drive our roadmap. Not marketing, not assumptions.',
  },
];

export function ApproachSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} id="approach" className="py-32 relative overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-925 via-neutral-950 to-neutral-925" />

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
            This is how we work<span className="text-stash-orange">.</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl glass p-8 hover:bg-white/5 border border-white/5 hover:border-stash-orange/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-neutral-400 text-lg leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                {/* Subtle accent gradient on hover */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-stash-orange/20 to-transparent rounded-full blur-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
