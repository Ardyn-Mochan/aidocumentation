import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DocsPage from "./pages/DocsPage";
import CreateDocsPage from "./pages/CreateDocsPage";
import GeneratedDocsPage from "./pages/GeneratedDocsPage";
import LibraryPage from "./pages/LibraryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/:section" element={<DocsPage />} />
          <Route path="/docs/:section/:page" element={<DocsPage />} />
          <Route path="/create" element={<CreateDocsPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/generated/:docId" element={<GeneratedDocsPage />} />
          <Route path="/generated/:docId/:sectionSlug" element={<GeneratedDocsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
