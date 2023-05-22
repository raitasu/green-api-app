import {Navigate, Route, Routes} from "react-router-dom";
import {PagePaths} from "./router.constants";
import {Suspense} from "react";
import {PageLoader} from "../components/PageLoader";
import {LoadableLogin, LoadableMain, LoadableNotFound} from "./loadablePages";

export const AppRouter = () => (
    <Routes>
        <Route
            path="/"
            element={<Navigate to={PagePaths.Login} />}
        />
        <Route
            path={PagePaths.Login}
            element={
                <Suspense fallback={<PageLoader/>}>
                    <LoadableLogin/>
                </Suspense>
            }
        />
        <Route
            path={PagePaths.Main}
            element={
                <Suspense fallback={<PageLoader/>}>
                    <LoadableMain/>
                </Suspense>
            }
        />
        <Route
            path={PagePaths.NotFound}
            element={
                <Suspense fallback={<PageLoader/>}>
                    <LoadableNotFound/>
                </Suspense>
            }
        />
        <Route
            path="*"
            element={
                <Navigate
                    to={PagePaths.NotFound}
                    replace
                />
            }
        />
    </Routes>
);
