import { BrowserRouter, Route, Switch } from "react-router-dom";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import NewRecord from "./components/Add/NewRecordForm";
import Home from "./Pages/Home";

import IncomeList from "./Pages/Income/IncomeList";
import Navbar from "./components/Navigation/Navbar";
import Profile from "./Pages/Users/Profile/Profile";
import Register from "./Pages/Users/Register/Register";
import Login from "./Pages/Users/Login/Login";
import ExpensesList from "./Pages/Expenses/ExpensesList";
import Dashboard from "./Pages/Dashboard/Dashboard";

import UserExpenses from "./Pages/Users/Profile/UserExpenses";
import EditContent from "./components/EditContent/EditContent";
import UserProfileExpList from "./Pages/Users/Profile/UserProfileExpList";
import UserProfileIncList from "./Pages/Users/Profile/UserProfileIncList";
import UpdateProfile from "./Pages/Users/Profile/UpdateProfile";
import AddIncome from "./Pages/Income/AddIncome";
import AddExpense from "./Pages/Expenses/AddExpense";

const options = {
  timeout: 50000,
  position: positions.BOTTOM_CENTER,
};

const App = () => {
  return (
    <Provider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/user-profile-expenses"
            component={UserProfileExpList}
          />
          <Route
            exact
            path="/user-profile-income"
            component={UserProfileIncList}
          />

          <Route exact path="/update-profile" component={UpdateProfile} />

          <Route exact path="/edit" component={EditContent} />
          <Route exact path="/user-expenses" component={UserExpenses} />
          <Route exact path="/add-expense" component={AddExpense} />
          <Route exact path="/add-income" component={AddIncome} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/incomes" component={IncomeList} />
          <Route exact path="/expenses" component={ExpensesList} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
