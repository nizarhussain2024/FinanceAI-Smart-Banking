import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Landmark, CreditCard, ArrowUpRight, ArrowDownLeft, Brain, 
  Shield, TrendingUp, PieChart, Send, Bot, AlertTriangle, CheckCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "credit" | "debit";
  category: string;
  date: string;
  flagged?: boolean;
}

interface Account {
  name: string;
  number: string;
  balance: number;
  type: string;
}

interface SpendingCategory {
  name: string;
  amount: number;
  percentage: number;
  trend: "up" | "down" | "stable";
}

const accounts: Account[] = [
  { name: "Primary Checking", number: "****4532", balance: 12847.53, type: "Checking" },
  { name: "Savings Account", number: "****7891", balance: 45230.00, type: "Savings" },
  { name: "Investment Portfolio", number: "****2156", balance: 128450.75, type: "Investment" },
];

const transactions: Transaction[] = [
  { id: 1, description: "Amazon Purchase", amount: 156.99, type: "debit", category: "Shopping", date: "Today" },
  { id: 2, description: "Salary Deposit", amount: 5420.00, type: "credit", category: "Income", date: "Dec 15" },
  { id: 3, description: "Unusual ATM Withdrawal - Miami", amount: 800.00, type: "debit", category: "Cash", date: "Dec 14", flagged: true },
  { id: 4, description: "Netflix Subscription", amount: 15.99, type: "debit", category: "Entertainment", date: "Dec 13" },
  { id: 5, description: "Whole Foods", amount: 87.43, type: "debit", category: "Groceries", date: "Dec 12" },
  { id: 6, description: "Transfer from Savings", amount: 1000.00, type: "credit", category: "Transfer", date: "Dec 10" },
  { id: 7, description: "Uber Rides", amount: 45.60, type: "debit", category: "Transport", date: "Dec 9" },
  { id: 8, description: "Foreign Transaction - Unknown", amount: 299.99, type: "debit", category: "Unknown", date: "Dec 8", flagged: true },
];

const spendingCategories: SpendingCategory[] = [
  { name: "Groceries", amount: 542, percentage: 28, trend: "stable" },
  { name: "Transport", amount: 312, percentage: 16, trend: "down" },
  { name: "Entertainment", amount: 189, percentage: 10, trend: "up" },
  { name: "Shopping", amount: 456, percentage: 24, trend: "up" },
  { name: "Utilities", amount: 234, percentage: 12, trend: "stable" },
  { name: "Other", amount: 198, percentage: 10, trend: "down" },
];

const Index = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Hello! I'm your AI Financial Advisor. I can help you with budgeting, spending analysis, and financial planning. What would you like to know?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, { role: "user", content: chatInput }]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Based on your spending patterns, I recommend reducing entertainment expenses by 15% this month. Your grocery spending is on track.",
        "I've analyzed your transactions. You're spending 24% more on shopping compared to last month. Would you like me to set up a budget alert?",
        "Your savings rate is currently 18% of income, which is above average. Consider increasing your investment contributions.",
        "I noticed two flagged transactions. One is an unusual ATM withdrawal in Miami, and another is a foreign transaction. Should I lock your card as a precaution?"
      ];
      setChatMessages(prev => [...prev, { 
        role: "assistant", 
        content: responses[Math.floor(Math.random() * responses.length)]
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const flaggedCount = transactions.filter(t => t.flagged).length;

  return (
    <>
      <Helmet>
        <title>FinanceAI - Smart Banking | Nizar Hussain</title>
        <meta name="description" content="AI-powered banking with fraud detection and financial insights" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-background">
        <header className="sticky top-0 z-50 bg-blue-950/95 backdrop-blur border-b border-blue-800/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Landmark className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-foreground">FinanceAI</span>
              </div>
              <div className="flex items-center gap-3">
                {flaggedCount > 0 && (
                  <Badge variant="destructive" className="animate-pulse">
                    <Shield className="w-3 h-3 mr-1" />
                    {flaggedCount} Alerts
                  </Badge>
                )}
                <Button variant="outline" size="sm" className="border-blue-800/50">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Cards
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {accounts.map((account, i) => (
              <Card key={i} className="bg-card border-blue-800/30 hover:border-blue-600/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{account.name}</p>
                      <p className="text-xs text-blue-400 font-mono">{account.number}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{account.type}</Badge>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-8 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-blue-700/50">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
                  <p className="text-4xl font-bold text-foreground">
                    ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5.2% this month
                  </Badge>
                  <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Managed
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card border-blue-800/30">
                <CardHeader className="border-b border-blue-800/30">
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Transactions</span>
                    <Badge className="bg-blue-600/20 text-blue-400">
                      <Shield className="w-3 h-3 mr-1" />
                      AI Fraud Detection Active
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {transactions.map(tx => (
                    <div 
                      key={tx.id} 
                      className={`p-4 border-b border-blue-800/30 last:border-0 ${
                        tx.flagged ? 'bg-red-900/20' : 'hover:bg-blue-900/20'
                      } transition-colors`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${
                          tx.type === "credit" ? "bg-green-900/50" : "bg-blue-900/50"
                        }`}>
                          {tx.type === "credit" 
                            ? <ArrowDownLeft className="w-4 h-4 text-green-400" />
                            : <ArrowUpRight className="w-4 h-4 text-blue-400" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium truncate">{tx.description}</p>
                            {tx.flagged && (
                              <Badge variant="destructive" className="text-[10px]">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Suspicious
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{tx.category} • {tx.date}</p>
                        </div>
                        <p className={`font-semibold ${
                          tx.type === "credit" ? "text-green-400" : "text-foreground"
                        }`}>
                          {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                        </p>
                      </div>
                      {tx.flagged && (
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs border-green-600/50 text-green-400">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            It's Me
                          </Button>
                          <Button size="sm" variant="destructive" className="text-xs">
                            <Shield className="w-3 h-3 mr-1" />
                            Report Fraud
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-card border-blue-800/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-400" />
                    AI Spending Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {spendingCategories.map((cat, i) => (
                      <div key={i} className="p-3 rounded-lg bg-blue-900/20 border border-blue-800/30">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{cat.name}</span>
                          <Badge 
                            variant="outline" 
                            className={`text-[10px] ${
                              cat.trend === "up" ? "text-red-400 border-red-600/30" :
                              cat.trend === "down" ? "text-green-400 border-green-600/30" :
                              "text-muted-foreground"
                            }`}
                          >
                            {cat.trend === "up" ? "↑" : cat.trend === "down" ? "↓" : "→"}
                          </Badge>
                        </div>
                        <div className="flex items-end justify-between">
                          <span className="text-lg font-bold">${cat.amount}</span>
                          <span className="text-xs text-muted-foreground">{cat.percentage}%</span>
                        </div>
                        <div className="mt-2 h-1 bg-blue-900/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-400"
                            style={{ width: `${cat.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-card border-blue-800/30 sticky top-24">
                <CardHeader className="border-b border-blue-800/30">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-400" />
                    AI Financial Advisor
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[400px] flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[85%] p-3 rounded-lg text-sm ${
                            msg.role === "user" 
                              ? "bg-blue-600 text-white" 
                              : "bg-blue-900/50 text-foreground"
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-blue-900/50 p-3 rounded-lg">
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Ask about your finances..."
                        className="bg-blue-900/20 border-blue-800/50"
                      />
                      <Button 
                        size="icon" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleSendMessage}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <footer className="border-t border-blue-800/30 mt-16 py-8 bg-blue-950/50">
          <div className="container mx-auto px-4">
            <p className="text-center text-muted-foreground text-sm mb-4">
              <Badge variant="outline" className="mr-2">Demo Project</Badge>
              Built with AI-powered fraud detection and financial insights
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["React", "Java", "Spring Boot", "Python", "Scikit-learn", "Kafka", "AWS"].map(tech => (
                <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;

