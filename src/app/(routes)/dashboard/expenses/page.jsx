'use client'
import React , {useCallback, useEffect , useState} from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
function Page() {
    const {user} = useUser()
  
  const [expensesList , setExpensesList] = useState([]);
    useEffect(() => {
        if (user) {
          getAllExpenses();
        }
      }, [user , getAllExpenses]);

    const getAllExpenses = useCallback(async () => {
      try {
        const response = await axios.get('/api/expenses',{
          params:{email:user?.primaryEmailAddress?.emailAddress}
        })
        if(response){
          // console.log(response.data);
         setExpensesList(response.data)
          console.log(response.data);
          
        }
      } catch (error) {
        console.log('error fetching data', error);
        
      }
    },[user]) 
  return (
    <div className=' p-5'>
      <ExpenseListTable
            expensesList={expensesList}
            refreshData={()=>getAllExpenses()}
          />
    </div>
  )
}

export default Page
