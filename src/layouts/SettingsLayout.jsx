import { Link, Outlet } from 'react-router'

export default function FAQsTwo() {
  return (
    <section className="py-10 md:py-16">
      <div className="mx-auto px-4 md:px-6 max-w-5xl">
        {/* header */}
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-balance">Settings</h2>
          <p className="mt-4 text-muted-foreground text-balance">Change according to your preferences</p>
        </div>

        <Outlet />

        {/* footer */}
        <p className="mt-6 px-8 text-muted-foreground text-center">
          Can't find what you're looking for? {' '}
          <Link
            href="#"
            className="font-medium text-primary hover:underline">
            Contact us!
          </Link>
        </p>
      </div>
    </section>
  )
}