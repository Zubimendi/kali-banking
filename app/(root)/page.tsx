import React from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
// TODO:
/* 
  1. Create Home section.
  2. Give it a class name of home.
  3. Create a wrapper and give it a class name of home-content. 
  4. Create a header component and make it reusable.
  5. Import header component into Home Page.
  6. Pass props to header box component
  7. Create a custom component to show account balance of the logged in user
  8. Implement Right Sidebar in Home page
*/

const Home = async () => {
  const loggedIn = await getLoggedInUser()
  console.log("USER", loggedIn)
  return (
    <section className="home">
      <div className="home-content">
        <header>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your accounts and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={10000}
          />
        </header>

        RECENT TRANSACTIONS
      </div>

       <RightSidebar
          user={loggedIn}
          transactions={[]}
          banks={[{currentBalance: 1444.54}, {currentBalance: 333.33}]}
       />
    </section>
  );
};

export default Home;
