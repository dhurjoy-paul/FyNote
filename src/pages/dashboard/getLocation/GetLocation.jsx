import LocationAccuracyTester from "./LocationAccuracyTester"

const GetLocation = () => {
  return (
    <div>
      <h1 className="bg-gradient-to-tr from-primary/35 to-card mx-auto mb-4 px-4 py-2 md:py-1 border border-secondary rounded-full w-fit font-bold text-primary text-xs text-center">This feature is in ALPHA testing. It may not work perfectly.</h1>
      <LocationAccuracyTester />
    </div>
  )
}
export default GetLocation