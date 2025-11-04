import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import NotFound from "./components/NotFound"
import ErrorBoundary from "./components/ErrorBoundary"
import FreeChapterLanding from "./components/FreeChapterLanding"


// === Lazy pages ===
const Home = lazy(() => import("./pages/Home"))
const BlogPage = lazy(() => import("./pages/BlogPage"))
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"))
const TravelPage = lazy(() => import("./pages/TravelPage"))
const TravelPostPage = lazy(() => import("./pages/TravelPostPage"))
const EbookPage = lazy(() => import("./pages/EbookPage"))
const EbookPreviewPage = lazy(() => import("./pages/EbookPreviewPage"))
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"))
const WellnessPage = lazy(() => import("./pages/WellnessPage"))
const AboutPage = lazy(() => import("./pages/AboutPage"))
const LetsChatPage = lazy(() => import("./pages/LetsChatPage"))

// === Admin ===
const AdminLogin = lazy(() => import("./pages/AdminLogin"))
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"))
const AdminComingSoon = lazy(() => import("./pages/AdminComingSoon"))

function Fallback() {
  return <div className="px-4 py-20 text-center text-muted">Loading…</div>
}

export default function App() {
  console.log("[App] mounted") // doit apparaître dans la console si tout monte
  return (
    <div className="bg-[var(--bg)] text-[var(--ink)] min-h-screen">
      <ScrollToTop />
      <Navbar />

      <ErrorBoundary>
        <Suspense fallback={<Fallback />}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/travel" element={<TravelPage />} />
            <Route path="/travel/:slug" element={<TravelPostPage />} />
            <Route path="/ebook" element={<EbookPage />} />
            <Route path="/ebook/preview" element={<EbookPreviewPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/wellness" element={<WellnessPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/chat" element={<LetsChatPage />} />
            <Route path="/free-chapter" element={<FreeChapterLanding />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/coming-soon" element={<AdminComingSoon />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      <Footer />
    </div>
  )
}
