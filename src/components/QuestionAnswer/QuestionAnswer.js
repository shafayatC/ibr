import React from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const QuestionAnswer = () => {
  return (
    <div className="container mx-auto">
      <h2 className="text-center text-4xl font-bold mt-10 ">
        Frequently Asked Questions
      </h2>
      <div className="flex justify-center mt-20">
        <Collapse className="w-[500px] " accordion>
          <Panel header="This is panel header 1" key="1">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>{text}</p>
          </Panel>
          <Panel header="This is panel header 3" key="3">
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default QuestionAnswer;
