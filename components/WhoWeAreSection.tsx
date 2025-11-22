'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function WhoWeAreSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { label: 'Students', value: '3' },
    { label: 'Location', value: 'Sydney' },
    { label: 'Focus', value: 'SMB' },
  ];

  return (
    <section ref={ref} id="about" className="py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 sm:mb-8 text-center tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About the team
            <span className="text-stash-orange">.</span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-neutral-400 text-center mb-12 sm:mb-20 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We're three computer science students from Sydney who identified real problems
            in the SMB space and decided to solve them properly.
          </motion.p>

          {/* Stats grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass rounded-2xl p-6 sm:p-8 text-center group hover:bg-white/5 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-stash-orange mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-neutral-400 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main content card */}
          <motion.div
            className="glass-strong rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-neutral-300 leading-relaxed">
              <p>
                We code together, validate with customers together, and we're committed
                to shipping tools that actually work. No fluff, no over-engineering—just
                real software solving real problems.
              </p>
              <p>
                Our approach is simple: identify friction in small business operations,
                build the solution we'd want to use ourselves, and iterate based on actual
                user feedback. Every feature ships with a purpose.
              </p>
              <div className="pt-4 sm:pt-6 border-t border-white/10">
                <p className="text-neutral-400 italic">
                  Backend infrastructure, frontend polish, and everything in between—we handle
                  the full stack because that's what it takes to build something that actually works.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-stash-orange/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
