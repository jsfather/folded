import { DollarSign, TrendingUp, Smartphone } from "lucide-react";
import { translations } from "@/lib/translations";

export function Hero() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <div className="p-4 bg-primary/10 rounded-full">
          <DollarSign className="h-12 w-12 text-primary" />
        </div>
        <span className="border-r rotate-45 h-6" />
        <div className="p-4 bg-green-500/10 rounded-full">
          <TrendingUp className="h-12 w-12 text-green-600" />
        </div>
        <span className="border-r rotate-45 h-6" />
        <div className="p-4 bg-blue-500/10 rounded-full">
          <Smartphone className="h-12 w-12 text-blue-600" />
        </div>
      </div>
      <h1 className="sr-only">
        {translations.appName} - {translations.appDescription}
      </h1>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        {translations.heroTitle}
      </p>
      <p className="text-lg text-muted-foreground text-center max-w-2xl">
        {translations.heroSubtitle}
      </p>
      <div className="w-full p-[1px] bg-gradient-to-l from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
