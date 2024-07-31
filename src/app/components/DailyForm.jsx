"use client";
import { useState } from "react";
import FormInput from "./FormInput";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DailyForm() {
  const [dateValue, setDateValue] = useState();
  const [nonTaxValue, setNonTaxValue] = useState(0);
  const [taxValue, setTaxValue] = useState(0);
  const [lottoValue, setLottoValue] = useState(0);
  const [paidValue, setPaidValue] = useState(0);
  const [cashValue, setCashValue] = useState(0);
  const [cardValue, setCardValue] = useState(0);

  const router = useRouter();

  const { data: session } = useSession();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!nonTaxValue) {
      alert("Non Tax value is missing.");
      return;
    }

    if (!taxValue) {
      alert("Tax value is missing.");
      return;
    }

    if (!lottoValue) {
      alert("Lotto value is missing.");
      return;
    }

    if (!paidValue) {
      alert("Paid value is missing.");
      return;
    }

    if (!cashValue) {
      alert("Cash value is missing.");
      return;
    }

    if (!cardValue) {
      alert("Card value is missing.");
      return;
    }

    if (!dateValue) {
      alert("Date value is missing.");
      return;
    }

    const totalValue =
      parseFloat(cashValue) +
      parseFloat(cardValue) +
      parseFloat(paidValue) -
      parseFloat(lottoValue);
    console.log(cashValue, cardValue, paidValue, lottoValue);
    console.log(`Total: ${totalValue}, ${typeof totalValue}`);

    const userId = session?.user?.id;

    try {
      const res = await fetch("http://localhost:3000/api/dailysales", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          dateValue,
          nonTaxValue,
          taxValue,
          lottoValue,
          paidValue,
          cashValue,
          cardValue,
          totalValue,
          userId,
        }),
      });

      if (res.status === 400) {
        alert("Daily Sale already exists.");
      }

      if (res.ok) {
        console.log("form submitted");

        router.push("/history");
      } else {
        throw new Error("Failed to create a daily sale");
      }
    } catch (e) {
      console.log(e);
      // console.dir(e);
    }

    // console.log(nonTaxValue);
    // setNonTaxValue();
    // router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center p-10 gap-4">
      <form className="w-64 text-gray-300" onSubmit={onFormSubmit}>
        <FormInput
          type="date"
          name="Date"
          value={dateValue}
          setValue={setDateValue}
        />
        <FormInput type="number" name="Non Tax" setValue={setNonTaxValue} />
        <FormInput type="number" name="Tax" setValue={setTaxValue} />
        <FormInput type="number" name="Lotto" setValue={setLottoValue} />
        <FormInput type="number" name="Paid" setValue={setPaidValue} />
        <FormInput type="number" name="Cash" setValue={setCashValue} />
        <FormInput type="number" name="Card" setValue={setCardValue} />
        <input
          type="submit"
          value="Submit"
          className="btn flex justify-center items-center"
        />
      </form>
    </div>
  );
}
