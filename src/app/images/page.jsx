const getAllImages = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/images', {
      cache: 'no-store'
    });
    if (!res.ok) {
      throw new Error('Failed to fetch images');
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return [];
  }
};

export default async function Images() {
  const storedImages = await getAllImages();
  if (storedImages.length === 0) {
    return (
      <main className="main-container">
        <h1 className="heading">Images</h1>
        <ul className="max-w-lg mx-auto">
          <li>
            <section className="flex flex-row flex-wrap justify-between p-8 my-8 border-2 rounded-lg text-gray-300 border-gray-300">
              <p className="font-bold text-3xl">No Images found.</p>
            </section>
          </li>
        </ul>
      </main>
    );
  }

  return (
    <div>page</div>
  )
}