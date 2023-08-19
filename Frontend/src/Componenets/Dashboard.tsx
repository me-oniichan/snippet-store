import { useState } from "react";
import CodeArea from "./Editor";
import SelectionFile from "./SelectionFile";

export default function Dashboard() {
  const [codeText, setCodeText] = useState('fn main(){\n    println!("Hello World!");\n}');
  return (
    <div className="dashboard-container">
      <SelectionFile />
      <div className="seperator"></div>
      <div className="codeview">
        <CodeArea readOnly={true} language="rust">
            {codeText}
        </CodeArea>
      </div>
    </div>
  );
}