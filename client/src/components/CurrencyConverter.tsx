import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Calculator, RefreshCw, ArrowLeftRight } from "lucide-react";

interface ExchangeRateData {
  rates: {
    PLN: number;
  };
}

export default function CurrencyConverter() {
  const [gbpAmount, setGbpAmount] = useState<string>("100");
  const [plnAmount, setPlnAmount] = useState<string>("");
  const [lastModified, setLastModified] = useState<'gbp' | 'pln'>('gbp');

  const { data: exchangeData, isLoading, error } = useQuery({
    queryKey: ['exchange-rate', 'GBP', 'PLN'],
    queryFn: async () => {
      // Using exchangerate-api.com (free tier)
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/GBP');
      if (!response.ok) {
        throw new Error('Exchange rate data unavailable');
      }
      return response.json() as Promise<ExchangeRateData>;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
    retry: 2
  });

  useEffect(() => {
    if (exchangeData?.rates?.PLN && gbpAmount && lastModified === 'gbp') {
      const pln = (parseFloat(gbpAmount) * exchangeData.rates.PLN).toFixed(2);
      setPlnAmount(pln);
    }
  }, [exchangeData, gbpAmount, lastModified]);

  useEffect(() => {
    if (exchangeData?.rates?.PLN && plnAmount && lastModified === 'pln') {
      const gbp = (parseFloat(plnAmount) / exchangeData.rates.PLN).toFixed(2);
      setGbpAmount(gbp);
    }
  }, [exchangeData, plnAmount, lastModified]);

  const handleGbpChange = (value: string) => {
    setGbpAmount(value);
    setLastModified('gbp');
    if (exchangeData?.rates?.PLN && value) {
      const pln = (parseFloat(value) * exchangeData.rates.PLN).toFixed(2);
      setPlnAmount(pln);
    } else if (!value) {
      setPlnAmount('');
    }
  };

  const handlePlnChange = (value: string) => {
    setPlnAmount(value);
    setLastModified('pln');
    if (exchangeData?.rates?.PLN && value) {
      const gbp = (parseFloat(value) / exchangeData.rates.PLN).toFixed(2);
      setGbpAmount(gbp);
    } else if (!value) {
      setGbpAmount('');
    }
  };

  const rate = exchangeData?.rates?.PLN;

  return (
    <div className="bg-warm-grey border border-gray-200 rounded-lg p-6">
      <h3 className="font-playfair text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
        <Calculator className="w-5 h-5" />
        Currency Converter
      </h3>
      
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      ) : error ? (
        <p className="text-sm text-gray-500">Exchange rates unavailable</p>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span>1 GBP = {rate?.toFixed(2)} PLN</span>
            <RefreshCw className="w-3 h-3" />
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">GBP</label>
              <input
                type="number"
                value={gbpAmount}
                onChange={(e) => handleGbpChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sienna"
                placeholder="0.00"
              />
            </div>
            
            <div className="flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4 text-gray-400" />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">PLN</label>
              <input
                type="number"
                value={plnAmount}
                onChange={(e) => handlePlnChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-sienna"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            Rates updated hourly • Free tier data
          </div>
        </div>
      )}
    </div>
  );
}