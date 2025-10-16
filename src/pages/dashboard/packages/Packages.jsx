const Packages = () => {
  const fetchPackages = async () => {
    const response = await api.get('/package');
    console.log('⦿•=>', response.data); // to be removed
  };
  fetchPackages()

  return (
    <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

    </div>
  )
}
export default Packages