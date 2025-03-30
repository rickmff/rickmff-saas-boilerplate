"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Success() {
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
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 200
                        }}
                    >
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </motion.div>

                    <h1 className="text-2xl font-bold tracking-tight">Payment Successful!</h1>

                    <div className="w-16 h-1 bg-green-500/30 rounded-full" />

                    <p className="text-muted-foreground">
                        Thank you for your purchase. Your payment has been processed successfully and your subscription is now active.
                    </p>
                </div>

                <div className="pt-4 space-y-3">
                    <Button className="w-full group transition-all duration-300" asChild>
                        <Link href="/dashboard" className="flex items-center justify-center">
                            <span>Go to Dashboard</span>
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>

                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/dashboard/billing">View Subscription Details</Link>
                    </Button>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="bg-muted/50 p-4 rounded-lg mt-4"
                >
                    <p className="text-sm text-center font-medium">
                        A confirmation email has been sent to your inbox
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}