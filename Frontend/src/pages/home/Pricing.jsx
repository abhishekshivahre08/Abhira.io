import { ArrowLeft, Check, Coins } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../App';
import { motion } from "motion/react"
const plans = [
    {
        key: "free",
        name: "Free Plan",
        price: "₹0",
        creadits: 100,
        description: "perfect to explore Abhira.io",
        features: [
            "AI website genration",
            "Responsive HTML Output",
            "Basic animations",
            "Community support"
        ],
        popular: false,
        button: "Get Started"
    },
    {
        key: "pro",
        name: "Pro Plan",
        price: "₹250",
        creadits: 500,
        description: "for professionals who need more",
        features: [
            "Everything in Free",
            "Faster genration",
            "Advanced animations",
            "Priority support"
        ],
        popular: true,
        button: "Upgrade to Pro"
    },
    {
        key: "enterprise",
        name: "Enterprise Plan",
        price: "₹499",
        creadits: "1000",
        description: "for large scale businesses with custom needs",
        features: [
            "unlimited integrations",
            "highest priority support",
            "Team collaboration",
            "Everything in Pro",
           
        ],
        popular: false,
        button: "Contact Sales"
    }
]

function Pricing() {
    const navigate = useNavigate();
    return (<div
        className='relative min-h-screen overflow-hidden bg-[#050505] text-white px-6
    pt-16 pb-24'>
        <div className='absolute inset-0 pointer-events-none'>
            <div className='absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20
    rounded-full blur-[120px]'/>
            <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20
    rounded-full blur-[120px]'/>
        </div>
        <button className='relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 
  hover:text-white transition-all duration-300 border border-zinc-700 
  hover:border-blue-500 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] 
  rounded-lg px-3 py-1 active:scale-95' onClick={() => navigate("/")}>
            <ArrowLeft size={16} /> Back
        </button>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center mb-16'>
            <h1 className='text-4xl md:text-5xl font-bold mb-5 leading-tight'>Choose the Perfect Plan for Your AI-Powered Website</h1>
            <p className='text-zinc-400 max-w-2xl mx-auto'>Unlock the full potential of Abhira.io with our flexible pricing plans designed to suit your needs. Whether you're just starting out or looking to scale, we have the perfect plan for you.</p>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
                <motion.div
                    key={plan.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    // Hover animation: Thoda scale up aur subtle shadow
                    whileHover={{
                        scale: 1.03,
                        y: -5,
                        transition: { duration: 0.2 }
                    }}
                    transition={{ delay: plan.key === "free" ? 0 : plan.key === "pro" ? 0.1 : 0.2 }}
                    className={`relative group rounded-2xl p-6 border transition-all duration-300 ${plan.popular
                            ? "border-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                            : "border-white/10 bg-zinc-900/50 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                        }`}
                >
                    {/* Popular Tag (Optional addition) */}
                    {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">
                            Most Popular
                        </div>
                    )}

                    <h2 className="text-2xl font-bold mb-2 text-white">{plan.name}</h2>
                    <p className="text-zinc-400 mb-4 text-sm">{plan.description}</p>

                    <div className="mb-4">
                        <span className="text-4xl font-bold text-white">{plan.price}</span>
                        {plan.price !== 0 && (
                            <span className="text-zinc-500 ml-1">/One-Time</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mb-8">
                        <Coins size={16} className="text-yellow-400" />
                        <span className="font-semibold">{plan.creadits} Credits</span>
                    </div>

                    <ul className="mb-8 space-y-3">
                        {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3 text-zinc-300 text-sm">
                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                    <Check size={12} className="text-green-500" />
                                </div>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button
                        className={`w-full py-3 rounded-xl font-bold transition-all duration-300 active:scale-95 ${plan.popular
                                ? "bg-blue-500 text-white shadow-[0_4px_15px_rgba(59,130,246,0.4)] hover:bg-blue-600"
                                : "bg-white text-black hover:bg-zinc-200"
                            }`}
                    >
                        {plan.button}
                    </button>
                </motion.div>
            ))}
        </div>
    </div>);
}

export default Pricing;