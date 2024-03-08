import { useEffect } from 'react';

export default function useTheme(theme : string){
  useEffect(()=>{
    const root = window.document.documentElement;
    root.classList.add(theme);
  }, [])
}