import { createContext } from "react";
import { IMainContext } from "./interface";

const AppContext = createContext<IMainContext>({} as IMainContext);

export default AppContext;
