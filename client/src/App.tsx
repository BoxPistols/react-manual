import type { ReactNode } from "react";
import { Switch, Route } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PlatformProvider } from "./contexts/PlatformContext";
import { LayoutProvider, useLayout } from "./contexts/LayoutContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Setup from "./pages/intro/Setup";
import HelloReact from "./pages/react-basics/HelloReact";
import Jsx from "./pages/react-basics/Jsx";
import Components from "./pages/react-basics/Components";
import Props from "./pages/react-basics/Props";
import TypeScriptBasics from "./pages/react-basics/TypeScriptBasics";
import UseState from "./pages/state-events/UseState";
import Events from "./pages/state-events/Events";
import ConditionalList from "./pages/state-events/ConditionalList";
import Forms from "./pages/state-events/Forms";
import UseEffect from "./pages/hooks-deep/UseEffect";
import UseContext from "./pages/hooks-deep/UseContext";
import UseReducer from "./pages/hooks-deep/UseReducer";
import MemoCallback from "./pages/hooks-deep/MemoCallback";
import CustomHooks from "./pages/hooks-deep/CustomHooks";
import PlainCss from "./pages/css-basics/PlainCss";
import CssInJs from "./pages/css-basics/CssInJs";
import StyledComponents from "./pages/css-basics/StyledComponents";
import EmotionPage from "./pages/css-basics/EmotionPage";
import CssPatterns from "./pages/css-basics/CssPatterns";
import Intro from "./pages/tailwind/Intro";
import ResponsiveDark from "./pages/tailwind/ResponsiveDark";
import Shadcn from "./pages/tailwind/Shadcn";
import MuiIntro from "./pages/mui/MuiIntro";
import MuiComponents from "./pages/mui/MuiComponents";
import MuiCustomization from "./pages/mui/MuiCustomization";
import Api from "./pages/practice-app/Api";
import Routing from "./pages/practice-app/Routing";
import Portfolio from "./pages/practice-app/Portfolio";
import WhatIsNextjs from "./pages/nextjs-basics/WhatIsNextjs";
import ProjectSetup from "./pages/nextjs-basics/ProjectSetup";
import NextRouting from "./pages/nextjs-basics/NextRouting";
import Layout from "./pages/nextjs-basics/Layout";
import Rsc from "./pages/nextjs-server/Rsc";
import ClientComponents from "./pages/nextjs-server/ClientComponents";
import DataFetching from "./pages/nextjs-server/DataFetching";
import LoadingError from "./pages/nextjs-server/LoadingError";
import RouteHandlers from "./pages/nextjs-practice/RouteHandlers";
import ServerActions from "./pages/nextjs-practice/ServerActions";
import Middleware from "./pages/nextjs-practice/Middleware";
import Optimization from "./pages/nextjs-practice/Optimization";
import TailwindMui from "./pages/nextjs-css/TailwindMui";
import CssModulesSc from "./pages/nextjs-css/CssModulesSc";
import Vercel from "./pages/deploy/Vercel";
import Summary from "./pages/deploy/Summary";
import SbIntro from "./pages/storybook/SbIntro";
import SbSetup from "./pages/storybook/SbSetup";
import SbStructure from "./pages/storybook/SbStructure";
import SbCss from "./pages/storybook/SbCss";
import SbFigma from "./pages/storybook/SbFigma";
import SbAdvanced from "./pages/storybook/SbAdvanced";
import ArchOverview from "./pages/architecture/ArchOverview";
import DesignSystem from "./pages/architecture/DesignSystem";
import Maintenance from "./pages/architecture/Maintenance";
import NotFound from "./pages/NotFound";
import KeyboardNav from "./components/KeyboardNav";
import { useAutoHeadingIds } from "./hooks/useAutoHeadingIds";
import { Toaster } from "sonner";

function MainContent({ children }: { children: ReactNode }) {
  const { layoutMode } = useLayout();
  useAutoHeadingIds();
  return (
    <main className={`flex-1 md:ml-64 w-full ${layoutMode === 'wide' ? 'layout-wide' : ''}`}>
      {children}
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PlatformProvider>
        <LayoutProvider>
          <div className="flex min-h-screen bg-background text-foreground font-sans">
            <Navigation />
            <KeyboardNav />
            <MainContent>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/intro/setup" component={Setup} />
                <Route path="/react-basics/hello-react" component={HelloReact} />
                <Route path="/react-basics/jsx" component={Jsx} />
                <Route path="/react-basics/components" component={Components} />
                <Route path="/react-basics/props" component={Props} />
                <Route path="/react-basics/typescript" component={TypeScriptBasics} />
                <Route path="/state-events/use-state" component={UseState} />
                <Route path="/state-events/events" component={Events} />
                <Route path="/state-events/conditional-list" component={ConditionalList} />
                <Route path="/state-events/forms" component={Forms} />
                <Route path="/hooks-deep/use-effect" component={UseEffect} />
                <Route path="/hooks-deep/use-context" component={UseContext} />
                <Route path="/hooks-deep/use-reducer" component={UseReducer} />
                <Route path="/hooks-deep/memo-callback" component={MemoCallback} />
                <Route path="/hooks-deep/custom-hooks" component={CustomHooks} />
                <Route path="/css-basics/plain-css" component={PlainCss} />
                <Route path="/css-basics/css-in-js" component={CssInJs} />
                <Route path="/css-basics/styled-components" component={StyledComponents} />
                <Route path="/css-basics/emotion" component={EmotionPage} />
                <Route path="/css-basics/css-patterns" component={CssPatterns} />
                <Route path="/tailwind/intro" component={Intro} />
                <Route path="/tailwind/responsive-dark" component={ResponsiveDark} />
                <Route path="/tailwind/shadcn" component={Shadcn} />
                <Route path="/mui/intro" component={MuiIntro} />
                <Route path="/mui/components" component={MuiComponents} />
                <Route path="/mui/customization" component={MuiCustomization} />
                <Route path="/practice-app/api" component={Api} />
                <Route path="/practice-app/routing" component={Routing} />
                <Route path="/practice-app/portfolio" component={Portfolio} />
                <Route path="/nextjs-basics/what-is-nextjs" component={WhatIsNextjs} />
                <Route path="/nextjs-basics/project-setup" component={ProjectSetup} />
                <Route path="/nextjs-basics/routing" component={NextRouting} />
                <Route path="/nextjs-basics/layout" component={Layout} />
                <Route path="/nextjs-server/rsc" component={Rsc} />
                <Route path="/nextjs-server/client" component={ClientComponents} />
                <Route path="/nextjs-server/data-fetching" component={DataFetching} />
                <Route path="/nextjs-server/loading-error" component={LoadingError} />
                <Route path="/nextjs-practice/route-handlers" component={RouteHandlers} />
                <Route path="/nextjs-practice/server-actions" component={ServerActions} />
                <Route path="/nextjs-practice/middleware" component={Middleware} />
                <Route path="/nextjs-practice/optimization" component={Optimization} />
                <Route path="/nextjs-css/tailwind-mui" component={TailwindMui} />
                <Route path="/nextjs-css/css-modules-sc" component={CssModulesSc} />
                <Route path="/deploy/vercel" component={Vercel} />
                <Route path="/deploy/summary" component={Summary} />
                <Route path="/storybook/intro" component={SbIntro} />
                <Route path="/storybook/setup" component={SbSetup} />
                <Route path="/storybook/structure" component={SbStructure} />
                <Route path="/storybook/css" component={SbCss} />
                <Route path="/storybook/figma" component={SbFigma} />
                <Route path="/storybook/advanced" component={SbAdvanced} />
                <Route path="/architecture/overview" component={ArchOverview} />
                <Route path="/architecture/design-system" component={DesignSystem} />
                <Route path="/architecture/maintenance" component={Maintenance} />
                <Route component={NotFound} />
              </Switch>
            </MainContent>
          </div>
          <Toaster position="bottom-right" />
        </LayoutProvider>
      </PlatformProvider>
    </ThemeProvider>
  );
}

export default App;
