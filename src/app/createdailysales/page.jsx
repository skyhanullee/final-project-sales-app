import DailyForm from "../components/DailyForm";

export default function DailySales() {
  return (
    <main className="main-container">
      <h1 className="heading">Daily Sales</h1>
      <p className="paragraph">This is where you will fill in the your day's sales data.</p>
      <p className="paragraph">Even if there are no sales for the category, make sure to still put $0!</p>
      <DailyForm />
    </main>
  )
}
