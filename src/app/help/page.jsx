export default function DailySales() {
  return (
    <main className="main-container">
      <h1 className="heading">Help</h1>
      <h2 className="font-bold text-2xl text-center p-4 text-gray-300">Here is a list of why the new features are useful.</h2>
      <ul className="list-disc list-inside">
        <li className="paragraph">In the Home page, the extra button to show more infomation should be helpful to new users.</li>
        <li className="paragraph">In the New Sales page, having required fields in the daily form should help avoid null values.</li>
      </ul>
      <hr className="my-10 border-gray-300"></hr>
      <p className="paragraph">If you still need help, please contact: <strong>admin@salesapp.com</strong></p>
    </main>
  )
}
