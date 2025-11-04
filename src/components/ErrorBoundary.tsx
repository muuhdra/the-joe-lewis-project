import { Component, ReactNode } from "react"

type Props = { children: ReactNode }
type State = { hasError: boolean; error?: any }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }

  componentDidCatch(error: any, info: any) {
    console.error("[ErrorBoundary]", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h1>Something went wrong.</h1>
          <p style={{ color: "#666" }}>
            Ouvre la console du navigateur pour le détail de l’erreur ↑
          </p>
          {import.meta.env.DEV && (
            <pre style={{ whiteSpace: "pre-wrap", marginTop: 16 }}>
              {String(this.state.error)}
            </pre>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
