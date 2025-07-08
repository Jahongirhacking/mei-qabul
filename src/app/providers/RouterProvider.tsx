import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"

import { Layout } from "@/admin/app/layout/Layout"
import { AuthProvider } from "@/admin/app/providers/AuthProvider"
import SuspenseWrapper from "@/admin/app/router/SuspenseWrapper"
import { privateRoutes, publicRoutes } from "@/admin/app/router/routes"
import RequireAuth from "@/app/router/RequireAuth"
import { useAuthStore } from "@/app/store/authStore"
import { GlobalSpinner } from "@/components/GlobalSpinner"
import ProfileLayout from "@/components/ProfileLayout"
import AdmissionExamPage from "@/pages/AdmissionExamPage"
import AdmissionPage from "@/pages/AdmissionPage"
import HomePage from "@/pages/HomePage"
import NotFound from "@/pages/NotFound"
import QrCodeApplicationInfoPage from "@/pages/QrCodeApplicationInfoPage/QrCodeApplicationInfoPage"
import QrCodeContractInfoPage from "@/pages/QrCodeContractInfoPage/qrCodeContractInfoPage"
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage"
import LoginPage from "@/pages/auth/LoginPage"
import SignUpPage from "@/pages/auth/SignUpPage"
import ApplicationsPage from "@/pages/cabinet/ApplicationsPage"
import CertificatesPage from "@/pages/cabinet/CertificatesPage"
import ContractsPage from "@/pages/cabinet/ContractsPage"
import ProfilePage from "@/pages/cabinet/ProfilePage.tsx"

export const RouterProvider = () => {
  const state = useAuthStore((state) => state.state)

  if (state === "loading") {
    return <GlobalSpinner />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* PRIVATE ROUTES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route
          path="/admission"
          element={
            <RequireAuth>
              <Outlet />
            </RequireAuth>
          }
        >
          <Route index element={<AdmissionPage />} />
          <Route path="exam" element={<AdmissionExamPage />} />
        </Route>

        <Route
          path="/user"
          element={
            <RequireAuth>
              <ProfileLayout />
            </RequireAuth>
          }
        >
          <Route index element={<ProfilePage />} />
          <Route path="applications" element={<ApplicationsPage />} />
          <Route path="contracts" element={<ContractsPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
        </Route>

        <Route
          path="/admin"
        >
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            {privateRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={(
                <AuthProvider>
                  {route.element}
                </AuthProvider>
              )} />
            ))}
          </Route>

          {publicRoutes.map((publicRoute) => (
            <Route
              key={publicRoute.path}
              path={publicRoute.path}
              element={(
                <AuthProvider>
                  <SuspenseWrapper>{publicRoute.element}</SuspenseWrapper>
                </AuthProvider>

              )}
            />
          ))}
        </Route>

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
        <Route path="/contract/qrCode/:id" element={<QrCodeContractInfoPage />} />
        <Route path="/applicant/registration-form/:id" element={<QrCodeApplicationInfoPage />} />
      </Routes>
    </BrowserRouter>
  )
}
