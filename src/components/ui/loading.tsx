import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "branded";
  text?: string;
  className?: string;
}

const Loading = ({ 
  size = "md", 
  variant = "default", 
  text = "Carregando...", 
  className 
}: LoadingProps) => {
  const sizeClasses = {
    sm: {
      container: "p-4",
      spinner: "h-6 w-6",
      logo: "h-8 w-8",
      text: "text-sm",
      dots: "w-2 h-2"
    },
    md: {
      container: "p-8",
      spinner: "h-8 w-8",
      logo: "h-12 w-12",
      text: "text-base",
      dots: "w-3 h-3"
    },
    lg: {
      container: "p-12",
      spinner: "h-12 w-12",
      logo: "h-16 w-16",
      text: "text-lg",
      dots: "w-4 h-4"
    }
  };

  const currentSize = sizeClasses[size];

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center justify-center", currentSize.container, className)}>
        <Loader2 className={cn("animate-spin text-blue-600", currentSize.spinner)} />
      </div>
    );
  }

  if (variant === "branded") {
    return (
      <div className={cn("flex flex-col items-center justify-center text-center", currentSize.container, className)}>
        <div className={cn("bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse mb-6", currentSize.logo)}>
          <Sparkles className={cn("text-white", size === "sm" ? "h-4 w-4" : size === "md" ? "h-6 w-6" : "h-8 w-8")} />
        </div>
        
        <h2 className={cn("font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4", 
          size === "sm" ? "text-lg" : size === "md" ? "text-2xl" : "text-3xl")}>
          Atende+ Digital
        </h2>
        
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className={cn("bg-blue-500 rounded-full animate-bounce", currentSize.dots)}></div>
          <div className={cn("bg-purple-500 rounded-full animate-bounce delay-100", currentSize.dots)}></div>
          <div className={cn("bg-pink-500 rounded-full animate-bounce delay-200", currentSize.dots)}></div>
        </div>
        
        <p className={cn("text-gray-600", currentSize.text)}>{text}</p>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn("flex flex-col items-center justify-center text-center", currentSize.container, className)}>
      <div className="relative mb-6">
        <div className={cn("bg-gradient-to-br from-blue-500 to-purple-500 rounded-full animate-spin", currentSize.spinner)}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full animate-ping opacity-20"></div>
      </div>
      
      <div className="flex items-center justify-center space-x-1 mb-4">
        <div className={cn("bg-blue-500 rounded-full animate-bounce", currentSize.dots)}></div>
        <div className={cn("bg-purple-500 rounded-full animate-bounce delay-75", currentSize.dots)}></div>
        <div className={cn("bg-pink-500 rounded-full animate-bounce delay-150", currentSize.dots)}></div>
      </div>
      
      <p className={cn("text-gray-600 font-medium", currentSize.text)}>{text}</p>
    </div>
  );
};

// Skeleton components for different content types
const LoadingSkeleton = {
  Card: ({ className }: { className?: string }) => (
    <div className={cn("animate-pulse", className)}>
      <div className="bg-gray-200 rounded-2xl h-32 w-full"></div>
    </div>
  ),
  
  Stats: ({ className }: { className?: string }) => (
    <div className={cn("animate-pulse bg-white rounded-2xl p-6 shadow-lg", className)}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="w-14 h-14 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  ),
  
  List: ({ items = 3, className }: { items?: number; className?: string }) => (
    <div className={cn("space-y-4", className)}>
      {[...Array(items)].map((_, i) => (
        <div key={i} className="animate-pulse bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  ),
  
  Table: ({ rows = 5, className }: { rows?: number; className?: string }) => (
    <div className={cn("animate-pulse bg-white rounded-2xl shadow-lg overflow-hidden", className)}>
      <div className="bg-gray-50 p-4 border-b">
        <div className="flex space-x-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="p-4 flex space-x-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  )
};

export { Loading, LoadingSkeleton };
