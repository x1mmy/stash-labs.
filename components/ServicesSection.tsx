'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function ServicesSection() {
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
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We also build websites<span className="text-stash-orange">.</span>
          </motion.h2>

          <motion.p
            className="text-xl text-neutral-400 mb-16 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            When a business needs a proper web presence — not a template, not a $10k agency quote — we build it.
            Fast, clean, and actually representing the business.
          </motion.p>

          {/* Case Study Card */}
          <motion.div
            className="relative glass-strong rounded-3xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ y: -4 }}
          >
            {/* Orange accent bar */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-stash-orange rounded-r-full" />

            <div className="flex flex-col md:flex-row gap-8 p-8 lg:p-12 pl-10 lg:pl-14">
              {/* Left: Case study details */}
              <div className="flex-1 space-y-5">
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-stash-orange border border-stash-orange/30 bg-stash-orange/10">
                  Client Work
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Prestige Event Collective
                  </h3>
                  <p className="text-neutral-400 text-sm font-medium uppercase tracking-wider">
                    Sydney · Events &amp; Hospitality
                  </p>
                </div>

                <p className="text-lg text-neutral-300 leading-relaxed">
                  They had no website. We built one. Now it&apos;s live.
                </p>

                <a
                  href="https://www.prestigeeventcollective.com.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-stash-orange hover:text-stash-orange-light font-semibold transition-colors duration-200 group"
                >
                  View live site
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </a>
              </div>

              {/* Right: Stat accent */}
              <div className="md:w-72 flex items-center">
                <div className="glass rounded-2xl p-8 border border-stash-orange/20 w-full">
                  <p className="text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">
                    Result
                  </p>
                  <p className="text-2xl font-bold text-white leading-snug">
                    First client<span className="text-stash-orange">.</span>
                    <br />
                    Fully paid<span className="text-stash-orange">.</span>
                    <br />
                    Live today<span className="text-stash-orange">.</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
