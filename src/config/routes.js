/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute'
import { Route } from 'react-router-dom'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const SignUp = lazy(() => import('../pages/SignUp/SignUp'))
const PasswordReset = lazy(() => import('../pages/PasswordReset/PasswordReset'))
const About = lazy(() => import('../pages/About'))
const Home = lazy(() => import('../pages/Home/Home'))
const DialogDemo = lazy(() => import('../pages/DialogDemo/DialogDemo'))
const ToastDemo = lazy(() => import('../pages/ToastDemo/ToastDemo'))
const FilterDemo = lazy(() => import('../pages/FilterDemo'))
const ListPageDemo = lazy(() => import('../pages/ListPageDemo'))
const TabsDemo = lazy(() => import('../pages/TabsDemo'))
const MyAccount = lazy(() => import('../pages/MyAccount/MyAccount'))

const ServiceBus = lazy(() => import('../pages/ServiceBus/ServiceBus'))
const DealershipirJS = lazy(() => import('../pages/Dealership/DealershipirJS'))
const DealershipRES = lazy(() => import('../pages/Dealership/DealershipRES'))
const MCAPPolicy = lazy(() => import('../pages/MCAP/MCAPPolicy'))

const WebSite = lazy(() => import('../pages/Dealership/WebSite'))
const Dealership = lazy(() => import('../pages/Dealership/Dealership'))
const Finance = lazy(() => import('../pages/Dealership/Finance'))

const GetGasPrices = lazy(() => import('../pages/API/GetGasPrices'))

const GetVehiclePhoto = lazy(() => import('../pages/Dealership/GetVehiclePhoto'))
const SQLQuery = lazy(() => import('../pages/Dealership/SQLQuery'))

const routes = [
  <UnauthorizedRoute path="/signin" redirectTo="/" exact component={SignIn} />,
  <UnauthorizedRoute path="/signup" redirectTo="/" exact component={SignUp} />,
  <UnauthorizedRoute path="/password_reset" redirectTo="/" exact component={PasswordReset} />,
  <Route path="/about" exact component={About} />,
  <AuthorizedRoute path="/my_account" exact component={MyAccount} />,
  <AuthorizedRoute path="/home" exact component={Home} />,
  <AuthorizedRoute path="/dialog_demo" exact component={DialogDemo} />,
  <AuthorizedRoute path="/toast_demo" exact component={ToastDemo} />,
  <AuthorizedRoute path="/filter_demo" exact component={FilterDemo} />,
  <AuthorizedRoute path="/list_page_demo" exact component={ListPageDemo} />,
  <AuthorizedRoute path="/tabs_demo" exact component={TabsDemo} />,

  <AuthorizedRoute path="/ServiceBus" exact component={ServiceBus} />,
  <AuthorizedRoute path="/DealershipirJS" exact component={DealershipirJS} />,
  <AuthorizedRoute path="/DealershipRES" exact component={DealershipRES} />,
  <AuthorizedRoute path="/MCAPPolicy" exact component={MCAPPolicy} />,

  <AuthorizedRoute path="/WebSite" exact component={WebSite} />,
  <AuthorizedRoute path="/Finance" exact component={Finance} />,
  <AuthorizedRoute path="/Dealership" exact component={Dealership} />,
  
  <AuthorizedRoute path="/GetVehiclePhoto" exact component={GetVehiclePhoto} />,
  <AuthorizedRoute path="/GetGasPrices" exact component={GetGasPrices} />,
  <AuthorizedRoute path="/SQLQuery" exact component={SQLQuery} />,





]

export default routes
