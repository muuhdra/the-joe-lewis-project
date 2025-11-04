export default function Footer() {
  return (
    <footer style={{background:"var(--bg)", borderTop:`1px solid var(--border)`}}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <img
            src="/image/footer.png"
            alt="Joe Lewis Signature"
            className="h-28 md:h-28 object-contain opacity-90"
          />
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} The Joe Lewis Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
