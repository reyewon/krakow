import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftRight, Camera, Copy, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TranslatorApp() {
  const [englishText, setEnglishText] = useState("");
  const [polishText, setPolishText] = useState("");
  const { toast } = useToast();

  // Simple translation dictionary for common phrases
  const simpleTranslations = {
    // English to Polish
    'hello': 'cześć',
    'thank you': 'dziękuję',
    'please': 'proszę',
    'excuse me': 'przepraszam',
    'how much': 'ile kosztuje',
    'where is': 'gdzie jest',
    'yes': 'tak',
    'no': 'nie',
    'water': 'woda',
    'food': 'jedzenie',
    'toilet': 'toaleta',
    'help': 'pomoc',
    'good morning': 'dzień dobry',
    'good evening': 'dobry wieczór',
    'goodbye': 'do widzenia',
    'restaurant': 'restauracja',
    'hotel_en': 'hotel',
    'train': 'pociąg',
    'bus': 'autobus',
    'ticket': 'bilet',
    'coffee': 'kawa',
    'beer': 'piwo',
    'menu_en': 'menu',
    'bill': 'rachunek',
    'lemon': 'cytryna',
    'kite': 'latawiec',
    'apple': 'jabłko',
    'book': 'książka',
    'car': 'samochód',
    'house': 'dom',
    'cat': 'kot',
    'dog': 'pies',
    
    // Polish to English  
    'cześć': 'hello',
    'dziękuję': 'thank you',
    'proszę': 'please',
    'przepraszam': 'excuse me',
    'ile kosztuje': 'how much',
    'gdzie jest': 'where is',
    'tak': 'yes',
    'nie': 'no',
    'woda': 'water',
    'jedzenie': 'food',
    'toaleta': 'toilet',
    'pomoc': 'help',
    'dzień dobry': 'good morning',
    'dobry wieczór': 'good evening',
    'do widzenia': 'goodbye',
    'restauracja': 'restaurant',
    'hotel': 'hotel',
    'pociąg': 'train',
    'autobus': 'bus',
    'bilet': 'ticket',
    'kawa': 'coffee',
    'piwo': 'beer',
    'menu': 'menu',
    'rachunek': 'bill',
    'cytryna': 'lemon',
    'latawiec': 'kite',
    'jabłko': 'apple',
    'książka': 'book',
    'samochód': 'car',
    'dom': 'house',
    'kot': 'cat',
    'pies': 'dog'
  };

  const translateText = useCallback(async (text: string, fromLang: 'en' | 'pl'): Promise<string> => {
    if (!text.trim()) return '';

    // First try simple translations for common words
    const lowerText = text.toLowerCase().trim();
    const simpleTranslation = simpleTranslations[lowerText as keyof typeof simpleTranslations];
    
    if (simpleTranslation) {
      return simpleTranslation;
    }

    // Use Google Translate API for more complex translations
    try {
      const targetLang = fromLang === 'en' ? 'pl' : 'en';
      const apiKey = 'AIzaSyDbslFWVHP3f8D42vJ5Uh1RwBJk13FRaes';
      
      const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: fromLang,
          target: targetLang,
          format: 'text'
        })
      });

      if (!response.ok) {
        throw new Error('Translation API failed');
      }

      const data = await response.json();
      return data.data.translations[0].translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback to original text if API fails
      return text;
    }
  }, []);

  const handleEnglishChange = useCallback((value: string) => {
    setEnglishText(value);
    if (value.trim()) {
      translateText(value, 'en').then(translated => {
        setPolishText(translated);
      });
    } else {
      setPolishText('');
    }
  }, [translateText]);

  const handlePolishChange = useCallback((value: string) => {
    setPolishText(value);
    if (value.trim()) {
      translateText(value, 'pl').then(translated => {
        setEnglishText(translated);
      });
    } else {
      setEnglishText('');
    }
  }, [translateText]);

  const swapLanguages = () => {
    const tempEnglish = englishText;
    const tempPolish = polishText;
    setEnglishText(tempPolish);
    setPolishText(tempEnglish);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-US' : 'pl-PL';
      speechSynthesis.speak(utterance);
    }
  };

  const openGoogleLens = () => {
    // Try multiple methods to open Google Lens on Android
    const androidIntent = 'intent://lens/#Intent;scheme=googleapp;package=com.google.ar.lens;end';
    const lensDeepLink = 'googleapp://lens/';
    
    // Create invisible iframe to attempt app launch
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = androidIntent;
    document.body.appendChild(iframe);
    
    // Fallback attempt after brief delay
    setTimeout(() => {
      window.location.href = lensDeepLink;
      document.body.removeChild(iframe);
    }, 500);
  };

  // Check if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5" />
          Live Translator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language Direction */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="font-medium text-sm">English</span>
          <Button
            variant="outline"
            size="sm"
            onClick={swapLanguages}
            className="h-8 w-8 p-0"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </Button>
          <span className="font-medium text-sm">Polish</span>
        </div>

        {/* English Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">English</label>
            {englishText && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakText(englishText, 'en')}
                  className="h-6 w-6 p-0"
                >
                  <Volume2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(englishText)}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
          <Textarea
            placeholder="Type in English..."
            value={englishText}
            onChange={(e) => handleEnglishChange(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        {/* Polish Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Polish</label>
            {polishText && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakText(polishText, 'pl')}
                  className="h-6 w-6 p-0"
                >
                  <Volume2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(polishText)}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
          <Textarea
            placeholder="Wpisz po polsku..."
            value={polishText}
            onChange={(e) => handlePolishChange(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        {/* Google Lens Button - Mobile Only */}
        {isMobile && (
          <div className="pt-2 border-t">
            <Button
              onClick={openGoogleLens}
              variant="outline"
              className="w-full"
            >
              <Camera className="w-4 h-4 mr-2" />
              Open Google Lens for Visual Translation
            </Button>
            <p className="text-xs text-gray-500 mt-1 text-center">
              Point your camera at text to translate menus, signs, and more
            </p>
          </div>
        )}

        {/* Translation Note */}
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          Works best with common words and phrases. For complex text, use Google Lens or an external translation app.
        </div>
      </CardContent>
    </Card>
  );
}