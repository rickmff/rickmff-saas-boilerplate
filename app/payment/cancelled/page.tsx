"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { XCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function Cancelled() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-b from-background to-background/80">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-lg border border-border/50"
            >
                <div className="flex flex-col items-center text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                        <XCircle className="h-16 w-16 text-destructive/80" />
                    </motion.div>

                    <h1 className="text-2xl font-bold tracking-tight">Payment Cancelled</h1>

                    <div className="w-16 h-1 bg-destructive/30 rounded-full" />

                    <p className="text-muted-foreground">
                        Your payment has been cancelled. No charges were made to your account.
                    </p>
                </div>

                <div className="pt-4">
                    <Button className="w-full group transition-all duration-300" asChild>
                        <Link href="/pricing" className="flex items-center justify-center">
                            <span>Return to Pricing</span>
                            <motion.span
                                initial={{ x: -5, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="ml-2 group-hover:translate-x-1 transition-transform"
                            >
                                →
                            </motion.span>
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}