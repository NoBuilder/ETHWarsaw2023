import { AppName } from '@/config'
import { TestForm } from './components'

export const HomePage = () => (
  <section className="layout-section items-start gap-8">
    <h1 className="font-main text-4xl font-extrabold max-sm:text-3xl">
      <span className="font-secondary text-primary">{AppName}</span> Next.js 13
      Starter
    </h1>
    <TestForm />
  </section>
)
