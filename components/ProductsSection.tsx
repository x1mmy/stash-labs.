'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Counter } from './Counter';

const products = [
  {
    name: 'LifeCycle',
    tagline: 'Digital Expiry Tracking',
    description: 'For retailers, pharmacies, and cafes tracking fresh stock',
    stat: { value: 35, suffix: '%', label: 'Reduce waste by' },
    accentColor: 'lifecycle',
    url: 'https://www.lifecycle.cloud/',
    features: [
      'Real-time expiry monitoring',
      'Automated alerts & notifications',
      'Waste reduction analytics',
    ],
  },
  {
    name: 'TimeTally',
    tagline: 'Payroll Made Simple',
    description: 'For businesses with employees who need payroll done in 1 hour, not 5',
    stat: { value: 5, suffix: '+ hours', label: 'Save per week' },
    accentColor: 'timetally',
    url: 'https://www.timetally.com.au/',
    features: [
      'One-click timesheet approval',
      'Automated pay calculations',
      'Compliance built-in',
    ],
  },
];

export function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="products" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-30" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Products<span className="text-stash-orange">.</span>
          </motion.h2>

          <motion.p
            className="text-xl text-neutral-400 text-center mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Built for Australian small businesses. No feature bloat. Just tools that solve real problems.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                className="relative group"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className={`
                    relative glass-strong rounded-3xl p-8 lg:p-10 h-full
                    border transition-all duration-300 overflow-hidden
                    ${product.accentColor === 'lifecycle'
                      ? 'border-lifecycle-green/20 hover:border-lifecycle-green/40'
                      : 'border-timetally-blue/20 hover:border-timetally-blue/40'
                    }
                  `}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Accent glow on hover */}
                  <motion.div
                    className={`
                      absolute inset-0 opacity-0 transition-opacity duration-300
                      ${product.accentColor === 'lifecycle'
                        ? 'bg-gradient-to-br from-lifecycle-green/10 to-transparent'
                        : 'bg-gradient-to-br from-timetally-blue/10 to-transparent'
                      }
                    `}
                    animate={hoveredIndex === index ? { opacity: 1 } : { opacity: 0 }}
                  />

                  {/* Accent bar */}
                  <div
                    className={`
                      absolute top-0 left-0 w-1.5 h-24 rounded-r-full transition-all duration-300
                      ${product.accentColor === 'lifecycle'
                        ? 'bg-lifecycle-green'
                        : 'bg-timetally-blue'
                      }
                      ${hoveredIndex === index ? 'h-full' : ''}
                    `}
                  />

                  <div className="space-y-6 relative z-10">
                    {/* Header */}
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {product.name}
                        <span className={product.accentColor === 'lifecycle' ? 'text-lifecycle-green' : 'text-timetally-blue'}>.</span>
                      </h3>
                      <p className="text-lg font-medium text-neutral-400">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-300 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Stat */}
                    <div className={`
                      inline-block px-6 py-4 rounded-xl glass
                      ${product.accentColor === 'lifecycle'
                        ? 'border-lifecycle-green/30'
                        : 'border-timetally-blue/30'
                      }
                    `}>
                      <p className="text-sm font-medium text-neutral-400 mb-1">
                        {product.stat.label}
                      </p>
                      <p className={`
                        text-4xl font-bold
                        ${product.accentColor === 'lifecycle'
                          ? 'text-lifecycle-green'
                          : 'text-timetally-blue'
                        }
                      `}>
                        <Counter
                          value={product.stat.value}
                          suffix={product.stat.suffix}
                        />
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 pt-4">
                      {product.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.2 + idx * 0.1 }}
                        >
                          <div className={`
                            w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0
                            ${product.accentColor === 'lifecycle'
                              ? 'bg-lifecycle-green'
                              : 'bg-timetally-blue'
                            }
                          `} />
                          <p className="text-neutral-300">{feature}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-4">
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 group
                          ${product.accentColor === 'lifecycle'
                            ? 'text-lifecycle-green hover:text-lifecycle-green-light'
                            : 'text-timetally-blue hover:text-timetally-blue-light'
                          }
                        `}
                      >
                        Visit {product.name}
                        <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
