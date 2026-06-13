"use client"

import { motion } from "motion/react"
import { Map } from "lucide-react"

type LearnPageProps = { lang: "en" | "fr" | "ar" }

export function LearnPage({ lang }: LearnPageProps) {
  return (
    <main className="text-zinc-900" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-32"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-emerald-50 border border-emerald-200 mb-8"
          >
            <Map className="w-10 h-10 text-emerald-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl mb-4">Learn</h1>
          <p className="text-xl text-zinc-500 max-w-md mx-auto">
            Something&apos;s coming — we&apos;re curating stories and knowledge rooted in Algerian ecology.
          </p>
        </motion.div>
      </div>
    </main>
  )
}
