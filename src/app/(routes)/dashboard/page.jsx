'use client'
import { useUser } from '@clerk/nextjs'
import React ,{useEffect , useState}from 'react'
import CardInfo from './_components/CardInfo'
import axios from 'axios'
import ExpenseListTable from './expenses/_components/ExpenseListTable'
import BarChartDashboard from './_components/BarChartDashboard'
import BudgetItem from './budgets/_components/BudgetItem'
function page() {
  const {user} = useUser()
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList , setExpensesList] = useState([]);
  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
    try {
      const response = await axios.get("/api/budget", {
        params: { userEmail: user?.primaryEmailAddress?.emailAddress },
      });
      if (!response) {
        console.log("error fetching budget");
      }
      //  console.log(response.data);
      
      setBudgetList(response.data);
      getAllExpenses();
    } catch (error) {
      console.log("error fetching budget", error);
    }
  };
  const getAllExpenses = async () => {
    try {
      const response = await axios.get('/api/expenses',{
        params:{email:user?.primaryEmailAddress?.emailAddress}
      })
      if(response){
        // console.log(response.data);
       setExpensesList(response.data)
        
      }
    } catch (error) {
      console.log('error fetching data', error);
      
    }
  }
  return (
    <div className='p-5 '>
      <h2 className="font-bold text-3xl dark:text-zinc-100">Hi, {user?.fullName} 👋</h2>
      <p className="dark:text-gray-400">
        Here's what happenning with your money, Lets Manage your expense
      </p>
      <CardInfo budgetList={budgetList}/>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
           <BarChartDashboard budgetList={budgetList} /> 

          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList?.length > 0
            ? budgetList.map((budget, index) => (
                <BudgetItem budget={budget} key={index} />
              ))
            : [1, 2, 3, 4].map((item, index) => (
                <div key={index}
                  className="h-[180xp] w-full
                 bg-slate-200 rounded-lg animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
    
  )
}

export default page
