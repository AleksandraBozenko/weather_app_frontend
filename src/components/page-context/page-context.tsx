import { createContext, useContext, useState } from 'react';

type PageContextType = {
  searchState: {
    value: string;
    setValue: (value: string) => void;
  };
  darkModeState: {
    value: boolean;
    setValue: (value: boolean) => void;
  };
};

type Props = {
  children: React.ReactNode;
};

const initialData: PageContextType = {
  searchState: {
    value: '',
    setValue: () => {},
  },
  darkModeState: {
    value: false,
    setValue: () => {},
  },
};

const PageContext = createContext<PageContextType>(initialData);

export const usePageContext = () => {
  return useContext(PageContext);
};

export const PageContextProvider = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const value: PageContextType = {
    searchState: {
      value: searchValue,
      setValue: (value: string) => {
        setSearchValue(value);
      },
    },
    darkModeState: {
      value: darkMode,
      setValue: (value: boolean) => {
        setDarkMode(value);
      },
    },
  };
  return <PageContext.Provider value={value}>{props.children}</PageContext.Provider>;
};
