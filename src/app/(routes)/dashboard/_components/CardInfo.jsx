import {
  BadgeIndianRupee,
  PiggyBank,
  ReceiptText,
  Sparkles,
  Wallet,
} from "lucide-react";
import React, {  useState, useMemo } from "react";
import formatNumber from '../../../../lib/index'
function CardInfo({ budgetList, incomeList }) {
  

  // Calculate totals using useMemo to cache the result
  const { totalBudget, totalSpend, totalIncome } = useMemo(() => {
    let totalBudget = 0;
    let totalSpend = 0;
    let totalIncome = 0;

    budgetList?.forEach((element) => {
      totalBudget += Number(element.amount);
      totalSpend += element.totalSpend;
    });

    incomeList?.forEach((element) => {
      totalIncome += element.totalAmount;
    });

    return { totalBudget, totalSpend, totalIncome };
  }, [budgetList, incomeList]);

  

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div >
          {/* Card sections */}
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            <div className="p-7 border rounded-xl flex items-center justify-between dark:bg-zinc-900 ">
              <div>
                <h2 className="text-lg font-semibold  dark:text-zinc-100">Total Budget</h2>
                <h2 className="font-bold text-2xl dark:text-zinc-100">₹{formatNumber(totalBudget)}</h2>
              </div> 
              <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            <div className="p-7 border rounded-xl flex items-center justify-between dark:bg-zinc-900">
              <div>
                <h2 className="text-lg font-semibold dark:text-zinc-100">No. of Budget</h2>
                <h2 className="font-bold text-2xl dark:text-zinc-100">{budgetList?.length}</h2>
              </div>
              <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
            {/* <div className="p-7 border rounded-xl flex items-center justify-between dark:bg-zinc-900">
              <div>
                <h2 className="text-lg font-semibold dark:text-zinc-100">Sum of Income Streams</h2>
                <h2 className="font-bold text-2xl dark:text-zinc-100">₹{formatNumber(totalIncome)}</h2>
              </div>
              <BadgeIndianRupee className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div> */}
            <div className="p-7 border flex rounded-xl items-center justify-between dark:bg-zinc-900 ">
              <div>
                <h2 className="text-lg font-semibold dark:text-zinc-100">Total Spend</h2>
                <h2 className="font-bold text-2xl dark:text-zinc-100">₹{formatNumber(totalSpend)}</h2>
              </div>
              <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((_, index) => (
            <div
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
