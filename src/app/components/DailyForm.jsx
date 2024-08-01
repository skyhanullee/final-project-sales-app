"use client";
import { useState } from "react";
import FormInput from "./FormInput";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DailyForm() {
  const [dateValue, setDateValue] = useState();
  const [foodValue, setFoodValue] = useState(0);
  const [electronicsValue, setElectronicsValue] = useState(0);
  const [clothesValue, setClothesValue] = useState(0);
  const [drinksValue, setDrinksValue] = useState(0);

  const router = useRouter();

  const { data: session } = useSession();

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!foodValue) {
      alert("Food value is missing.");
      return;
    }

    if (!electronicsValue) {
      alert("Electronics value is missing.");
      return;
    }

    if (!clothesValue) {
      alert("Clothes value is missing.");
      return;
    }

    if (!drinksValue) {
      alert("Drinks value is missing.");
      return;
    }

    if (!dateValue) {
      alert("Date value is missing.");
      return;
    }

    const totalValue =
      parseFloat(clothesValue) +
      parseFloat(drinksValue) +
      parseFloat(foodValue) +
      parseFloat(electronicsValue);
      console.log(clothesValue, drinksValue, electronicsValue, foodValue);
    console.log(`Total: ${totalValue}, ${typeof totalValue}`);

    const username = session?.user?.name;

    try {
      const res = await fetch("/api/dailysales", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          dateValue,
          foodValue,
          electronicsValue,
          clothesValue,
          drinksValue,
          totalValue,
          username,
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
    }
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
        <FormInput type="number" name="Food" setValue={setFoodValue} />
        <FormInput type="number" name="Electronics" setValue={setElectronicsValue} />
        <FormInput type="number" name="Clothes" setValue={setClothesValue} />
        <FormInput type="number" name="Drinks" setValue={setDrinksValue} />
        <input
          type="submit"
          value="Submit"
          className="btn flex justify-center items-center"
        />
      </form>
    </div>
  );
}
